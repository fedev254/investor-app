# Infinity_FinTech_Backend/shops/urls.py
from django.urls import path
from .views import (
    UserDetailView,
    ShopListView,
    DailySaleCreateView,
    InvestorDashboardView # --- THIS IMPORT IS ESSENTIAL ---
)

urlpatterns = [
    # User-related endpoint
    path('user/me/', UserDetailView.as_view(), name='user-detail'),

    # --- THIS IS THE FIX ---
    # The URL your frontend is calling must be defined here.
    path('investor/dashboard/', InvestorDashboardView.as_view(), name='investor-dashboard'),
    
    # Other specific endpoints
    path('investor/shops/', ShopListView.as_view(), name='investor-shops-list'),
    path('cashier/submit-sale/', DailySaleCreateView.as_view(), name='cashier-submit-sale'),
]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       