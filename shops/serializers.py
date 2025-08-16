from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Shop, DailySale, Cashier, Investor
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['first_name'] = user.first_name
        role, avatar_url = 'unknown', None

        if hasattr(user, 'cashier'):
            role = 'cashier'
            if user.cashier.avatar:
                avatar_url = user.cashier.avatar.url
        elif hasattr(user, 'investor'):
            role = 'investor'
            if user.investor.avatar:
                avatar_url = user.investor.avatar.url
        
        token['role'] = role
        token['avatar_url'] = avatar_url
        return token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']


class CashierSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Cashier
        fields = ['id', 'user', 'shop', 'avatar']


# THIS IS THE FINAL, CORRECTED ShopSerializer

class ShopSerializer(serializers.ModelSerializer):
    # This field correctly finds the related investor and displays their name.
    investor = serializers.StringRelatedField(read_only=True)
    
    # This custom field correctly finds the related cashier.
    cashier = serializers.SerializerMethodField()

    class Meta:
        model = Shop
        # All fields are now correctly defined above or are direct fields on the model.
        fields = ['id', 'name', 'location', 'investor', 'cashier']

    # This method correctly finds the cashier for the SerializerMethodField.
    def get_cashier(self, obj):
        try:
            cashier_instance = Cashier.objects.get(shop=obj)
            return CashierSerializer(cashier_instance).data
        except Cashier.DoesNotExist:
            return None


class DailySaleSerializer(serializers.ModelSerializer):
    cashier = serializers.StringRelatedField(read_only=True)
    shop = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = DailySale
        fields = [
            'id', 'date', 'cashier', 'shop', 'total_sales',
            'expenditure', 'calculated_profit', 'receipt_image', 'profit_sent'
        ]
        read_only_fields = [
            'id', 'date', 'cashier', 'shop', 'calculated_profit', 'profit_sent'
        ]


class InvestorShopPerformanceSerializer(serializers.ModelSerializer):
    cashier_name = serializers.CharField(source='cashier.user.username', default='N/A', read_only=True)
    latest_sale_date = serializers.SerializerMethodField()
    todays_profit = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    todays_receipt_url = serializers.SerializerMethodField()

    class Meta:
        model = Shop
        fields = ['id', 'name', 'location', 'cashier_name', 'latest_sale_date', 'todays_profit', 'todays_receipt_url']

    def get_latest_sale_date(self, obj):
        latest_sale = obj.dailysale_set.order_by('-date').first()
        return latest_sale.date if latest_sale else None

    def get_todays_receipt_url(self, obj):
        from datetime import date
        todays_sale = obj.dailysale_set.filter(date=date.today()).first()
        
        request = self.context.get('request')
        
        if request and todays_sale and todays_sale.receipt_image:
            return request.build_absolute_uri(todays_sale.receipt_image.url)
        
        return None


class InvestorDashboardSerializer(serializers.Serializer):
    total_shops = serializers.IntegerField()
    total_profit_all_time = serializers.DecimalField(max_digits=12, decimal_places=2)
    shops_performance = InvestorShopPerformanceSerializer(many=True, read_only=True)
