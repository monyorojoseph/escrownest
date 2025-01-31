from rest_framework.serializers import ModelSerializer
from core.models import User


class BaseUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'phone_number']