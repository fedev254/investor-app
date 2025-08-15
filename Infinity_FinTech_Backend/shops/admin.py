# Infinity_FinTech_Backend/shops/admin.py

from django.contrib import admin
from .models import Shop, DailySale, Cashier, Investor

# Register your models here.

@admin.register(Shop)
class ShopAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Shop model.
    """
    # This list defines the columns shown on the shop list page.
    list_display = ('name', 'display_investors', 'location')
    
    # We add a search field for convenience.
    search_fields = ('name', 'location', 'investors__user__username')
    
    # This filter is very useful for ManyToManyFields.
    filter_horizontal = ('investors',)

    def display_investors(self, obj):
        """
        Creates a string of comma-separated investor names.
        This method will be used to display the investors in the list_display.
        """
        # We access the investors through the new 'investors' ManyToManyField,
        # get the first name of each associated user, and join them with a comma.
        investor_names = [investor.user.first_name for investor in obj.investors.all()]
        return ", ".join(investor_names) if investor_names else "N/A"

    # Sets the column header text in the admin panel.
    display_investors.short_description = 'Investor(s)'


# --- (You can leave your other admin registrations as they are) ---

admin.site.register(DailySale)
admin.site.register(Cashier)
admin.site.register(Investor)