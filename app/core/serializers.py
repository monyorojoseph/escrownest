from rest_framework.serializers import ModelSerializer
from core.models import User, PaymentAgreement


class BaseUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'phone_number']

class PaymentAgreementSerializer(ModelSerializer):
    class Meta:
        model = PaymentAgreement
        fields = '__all__'
        # extra_fields = ['buyer', 'seller', 'document', 'currency', 'amount_breakdown', 'status', 'extra_data']
