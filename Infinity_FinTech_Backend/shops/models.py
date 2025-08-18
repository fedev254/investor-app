from django.db import models
from django.contrib.auth.models import User

class Investor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)

    can_view_all_shops = models.BooleanField(
        default=False,
        help_text="Designates whether this investor can view all shops in their portfolio."
    )
    def __str__(self):
        return self.user.username
    class Meta:
        permissions = [
            ("can_view_full_dashboard", "Can view all shops and full details on the dashboard"),
        ]

class Shop(models.Model):
    # --- CHANGE THIS LINE ---
    investors = models.ManyToManyField(Investor, related_name="shops")
    # ----------------------
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    def __str__(self):
        return self.name

class Cashier(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    shop = models.OneToOneField(Shop, on_delete=models.SET_NULL, null=True, blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    def __str__(self):
        return self.user.username

class DailySale(models.Model):
    cashier = models.ForeignKey(Cashier, on_delete=models.PROTECT)
    shop = models.ForeignKey(Shop, on_delete=models.PROTECT)
    date = models.DateField(auto_now_add=True)
    total_sales = models.DecimalField(max_digits=10, decimal_places=2)
    expenditure = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    calculated_profit = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
    profit_sent = models.BooleanField(default=False)
    receipt_image = models.ImageField(upload_to='receipts/', blank=True, null=True)

    def save(self, *args, **kwargs):
        self.calculated_profit = self.total_sales - self.expenditure
        super(DailySale, self).save(*args, **kwargs)

    def __str__(self):
        return f"Report from {self.shop.name} on {self.date}"