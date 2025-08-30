# Infinity_FinTech_Backend/shops/views.py - Final Version with Permission Fix

# --- Imports for Django & DRF Core ---
from django.contrib.auth import logout
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

# --- Imports for database calculations and date handling ---
from datetime import date
from django.db.models import Sum, Subquery, OuterRef, DecimalField
from django.db.models.functions import Coalesce

# --- Imports for Simple JWT ---
from rest_framework_simplejwt.views import TokenObtainPairView

# --- Imports from Your Local App ('shops') ---
from .models import Shop, DailySale, Investor, Cashier
from .serializers import (
    ShopSerializer,
    DailySaleSerializer,
    MyTokenObtainPairSerializer,
    InvestorDashboardSerializer
)
# We import our new permission class
from .permissions import IsCashier

#==============================================================================
# AUTHENTICATION AND OTHER VIEWS (Unchanged)
#==============================================================================
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class LogoutView(APIView):
    # This remains unchanged
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

class UserDetailView(APIView):
    # This remains unchanged
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        user = request.user
        role = 'unknown'
        if hasattr(user, 'cashier'): role = 'cashier'
        elif hasattr(user, 'investor'): role = 'investor'
        data = { 'username': user.username, 'email': user.email, 'role': role }
        return Response(data)

class ShopListView(generics.ListAPIView):
    # This remains unchanged
    serializer_class = ShopSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'investor'):
            return user.investor.shops.all()
        return Shop.objects.none()


#==============================================================================
# --- THIS IS THE ONLY SECTION WITH A CHANGE ---
#==============================================================================
class DailySaleCreateView(generics.CreateAPIView):
    queryset = DailySale.objects.all() # Added queryset for best practice
    serializer_class = DailySaleSerializer
    
    # --- THIS IS THE FIX ---
    # We now require the user to be authenticated AND to have a cashier profile.
    permission_classes = [permissions.IsAuthenticated, IsCashier]

    def perform_create(self, serializer):
        # This code no longer needs the "if hasattr" check, because the
        # permission class has already guaranteed that the user is a cashier.
        cashier = self.request.user.cashier
        serializer.save(cashier=cashier, shop=cashier.shop)


#==============================================================================
# INVESTOR DASHBOARD VIEW (Unchanged)
#==============================================================================
class InvestorDashboardView(APIView):
    """
    Provides all summary data for the investor's main dashboard.
    Handles multi-investor logic and sorts shops by profit based on user permissions.
    Ensures KPIs are in sync with the displayed shop list.
    """
    permission_classes = [permissions.IsAuthenticated]

    # This entire complex view and all its logic remain perfectly intact.
    def get(self, request):
        if not hasattr(request.user, 'investor'):
            return Response({"error": "User is not an investor"}, status=status.HTTP_403_FORBIDDEN)
        
        investor = request.user.investor
        investor_shops = Shop.objects.filter(investors=investor)
        todays_sales_subquery = DailySale.objects.filter(shop=OuterRef('pk'), date=date.today())

        if request.user.has_perm('shops.can_view_full_dashboard'):
            shops_query = investor_shops.annotate(
                todays_profit=Coalesce(
                    Subquery(todays_sales_subquery.values('calculated_profit')[:1]),
                    0.00,
                    output_field=DecimalField()
                )
            ).order_by('-todays_profit')
            total_shops_count = investor_shops.count()
            total_profit_all_time = DailySale.objects.filter(
                shop__in=investor_shops
            ).aggregate(total=Sum('calculated_profit'))['total'] or 0.00
        else:
            shops_query = investor_shops.annotate(
                todays_profit=Coalesce(
                    Subquery(todays_sales_subquery.values('calculated_profit')[:1]),
                    0.00,
                    output_field=DecimalField()
                )
            ).order_by('todays_profit')[:3]
            total_shops_count = shops_query.count()
            total_profit_all_time = DailySale.objects.filter(
                shop__in=shops_query
            ).aggregate(total=Sum('calculated_profit'))['total'] or 0.00
        
        dashboard_data = {
            'total_shops': total_shops_count,
            'total_profit_all_time': total_profit_all_time,
            'shops_performance': shops_query
        }
        
        serializer = InvestorDashboardSerializer(dashboard_data, context={'request': request})
        return Response(serializer.data)

