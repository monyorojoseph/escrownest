from core.views import UserViewSetAPI, AuthViewSetAPI
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'user', UserViewSetAPI, basename='user')
router.register(r'auth', AuthViewSetAPI, basename='auth')

