from core.views import UserViewSetAPI, AuthViewSetAPI
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSetAPI, basename='users')
router.register(r'auth', AuthViewSetAPI, basename='auth')

