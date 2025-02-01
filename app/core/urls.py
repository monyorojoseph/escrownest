from core.views import UserViewSetAPI, AuthViewSetAPI, PaymentAgreementViewSetAPI
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'user', UserViewSetAPI, basename='user')
router.register(r'auth', AuthViewSetAPI, basename='auth')
router.register(r'payment-agreement', PaymentAgreementViewSetAPI, basename='payment-agreement')

