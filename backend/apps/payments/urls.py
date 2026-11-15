from django.urls import path
from .views import CreatePaymentOrderView, VerifyPaymentWebhookView

urlpatterns = [
    path('create-order/', CreatePaymentOrderView.as_view(), name='create-payment-order'),
    path('verify/', VerifyPaymentWebhookView.as_view(), name='verify-payment-webhook'),
]
