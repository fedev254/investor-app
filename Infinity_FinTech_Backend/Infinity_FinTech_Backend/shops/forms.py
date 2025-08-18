from django import forms
from .models import DailySale

# in shops/forms.py

class DailySaleForm(forms.ModelForm):
    class Meta:
        model = DailySale
        # Add 'expenditure' to the list of fields!
        fields = ['total_sales', 'expenditure', 'receipt_image']

        # Optional: Add widgets for better styling later
        widgets = {
            'total_sales': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Enter total sales for the day'}),
            'receipt_image': forms.FileInput(attrs={'class': 'form-control-file'}),
        }