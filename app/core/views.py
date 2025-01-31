from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import action

from core.serializers import BaseUserSerializer
from core.models import User
from core.utils import get_tokens_for_user




class AuthViewSetAPI(ViewSet):
    permission_classes = []
    authentication_classes = []
    
    @action(detail=False, methods=["POST"], url_path="login")
    def login(self, request):
        try:
            email = request.data.get("email")
            password = request.data.get("password")
            if not email or not password:
                return Response({"message": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)
            user = authenticate(request, email=email, password=password)
            tokens = get_tokens_for_user(user)
            data = {
                "user": BaseUserSerializer(user).data,
                "tokens": tokens,
            }
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": "Wrong user credentials."}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=["POST"], url_path="register")
    def register(self, request):
        name = request.data.get("name")
        email = request.data.get("email")
        password = request.data.get("password")
        
        if name and email and password:
            user = User.objects.create_user(email=email, password=password)
            user.name = name
            user.save()
            user.send_email_verification()
            return Response({"message": "User created successfully, verification email has been sent"}, status=status.HTTP_201_CREATED)
        return Response({"message": "Email, name, and password are required."}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=["POST"], url_path="logout")
    def logout(self, request):
        try:
            refresh_token = request.data.get("refresh_token")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out successfully."}, status=status.HTTP_200_OK)
        except Exception as e:  
            return Response({"message": "Invalid refresh token."}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=["POST"], url_path="login")
    def email_verification(self, request):
        email = request.data.get("email")
        if email:
            user = User.objects.get(email=email)
            user.email_verified = True
            user.save()
            data = {
                "tokens": get_tokens_for_user(user),
            }
            return Response(data, status=status.HTTP_200_OK)
        return Response({"message": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    # def refresh_token(self, request):
    #     return Response({"message": "Hello, World!"})

class UserViewSetAPI(ViewSet):
    permission_classes = [ IsAuthenticated ]
    authentication_classes = [ JWTAuthentication ]

    def get(self, request):
        user = request.user
        serialized_user = BaseUserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)
    
    def update(self, request):
        return Response({"message": "Hello, World!"})
    
    def delete(self, request):
        try:
            request.user.delete()
            return Response({"message": "User deleted successfully."}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"message": "User not found."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message": "Unable to delete user account"}, status=status.HTTP_400_BAD_REQUEST)