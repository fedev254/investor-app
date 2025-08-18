# Infinity_FinTech_Backend/shops/views.py

# --- Imports for Django & DRF Core ---
from django.contrib.auth import logout
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

# --- Imports for database calculations and date handling ---
from datetime import date
# --- FIX: ADD DecimalField to imports ---
from django.db.models import Sum, Subquery, OuterRef, DecimalField
# ----------------------------------------
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

#==============================================================================
# AUTHENTICATION AND OTHER VIEWS (Unchanged)
#==============================================================================
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

class UserDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        user = request.user
        role = 'unknown'
        if hasattr(user, 'cashier'): role = 'cashier'
        elif hasattr(user, 'investor'): role = 'investor'
        data = { 'username': user.username, 'email': user.email, 'role': role }
        return Response(data)

class ShopListView(generics.ListAPIView):
    serializer_class = ShopSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'investor'):
            return user.investor.shops.all()
        return Shop.objects.none()

class DailySaleCreateView(generics.CreateAPIView):
    serializer_class = DailySaleSerializer
    permission_classes = [permissions.IsAuthenticated]
    def perform_create(self, serializer):
        if hasattr(self.request.user, 'cashier'):
            cashier = self.request.user.cashier
            serializer.save(cashier=cashier, shop=cashier.shop)
        else:
            pass



class InvestorDashboardView(APIView):
    """
    Provides all summary data for the investor's main dashboard.
    Handles multi-investor logic and sorts shops by profit based on user permissions.
    Ensures KPIs are in sync with the displayed shop list.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if not hasattr(request.user, 'investor'):
            return Response({"error": "User is not an investor"}, status=status.HTTP_403_FORBIDDEN)
        
        investor = request.user.investor

        investor_shops = Shop.objects.filter(investors=investor)
        
        todays_sales_subquery = DailySale.objects.filter(
            shop=OuterRef('pk'),
            date=date.today()
        )

        if request.user.has_perm('shops.can_view_full_dashboard'):
            # --- KEITH'S LOGIC ---
            # Get all shops, sorted by highest profit
            shops_query = investor_shops.annotate(
                todays_profit=Coalesce(
                    Subquery(todays_sales_subquery.values('calculated_profit')[:1]),
                    0.00,
                    output_field=DecimalField()
                )
            ).order_by('-todays_profit')

            # KPIs for Keith are based on ALL his shops.
            total_shops_count = investor_shops.count()
            total_profit_all_time = DailySale.objects.filter(
                shop__in=investor_shops
            ).aggregate(total=Sum('calculated_profit'))['total'] or 0.00

        else:
            # --- SUSAN'S LOGIC (REVISED) ---
            # Get only the 3 least-performing shops
            shops_query = investor_shops.annotate(
                todays_profit=Coalesce(
                    Subquery(todays_sales_subquery.values('calculated_profit')[:1]),
                    0.00,
                    output_field=DecimalField()
                )
            ).order_by('todays_profit')[:3]

            # --- THIS IS THE FIX ---
            # KPIs for Susan are now based ONLY on the 3 shops being displayed.
            total_shops_count = shops_query.count()  # Count the items in the final, sliced queryset
            total_profit_all_time = DailySale.objects.filter(
                shop__in=shops_query # Filter sales based on only these 3 shops
            ).aggregate(total=Sum('calculated_profit'))['total'] or 0.00
            # ---------------------
        
        # This part remains the same, sending the correctly calculated data
        dashboard_data = {
            'total_shops': total_shops_count,
            'total_profit_all_time': total_profit_all_time,
            'shops_performance': shops_query
        }
        
        serializer = InvestorDashboardSerializer(dashboard_data, context={'request': request})
        return Response(serializer.data)