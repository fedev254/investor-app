from rest_framework import permissions
from .models import Cashier # We need to import the Cashier model

class IsCashier(permissions.BasePermission):
    """
    Custom permission to only allow users with a 'cashier' profile to access an endpoint.
    """

    def has_permission(self, request, view):
        # First, check if the user is authenticated at all.
        if not request.user or not request.user.is_authenticated:
            return False
        
        # Now, check if a 'Cashier' object is linked to this authenticated user.
        # The 'hasattr' check is a safe and efficient way to do this.
        return hasattr(request.user, 'cashier')