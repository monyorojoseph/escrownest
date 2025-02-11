import logging
from django.db.models import Q
from django.utils import timezone
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import action

from core.serializers import BaseUserSerializer, PaymentAgreementSerializer
from core.models import User, PaymentAgreement, UserVerificationToken
from core.utils import get_tokens_for_user
from core.google_auth import verify_id_token


logger = logging.getLogger(__name__)

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
            logger.error(e)
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
            logger.error(e) 
            return Response({"message": "Invalid refresh token."}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=["POST"], url_path="verify-email") #TODO fix has security flaw
    def request_email_verification(self, request):
        try:
            user = User.objects.get(email=request.data.get("email"))
            user.send_email_verification()
            return Response(status=status.HTTP_200_OK)
        except User.DoesNotExist:
            logger.error("User doesn't exist")
            return Response({"message": "User with this email does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(e)
            return Response({"message": "Failed to send verification email"}, status=status.HTTP_400_BAD_REQUEST)


    @action(detail=False, methods=["get"], url_path="email-verification/(?P<uid>[^/.]+)/(?P<token>[^/.]+)")
    def email_verification(self, request, uid, token):
        try:
            user = User.objects.get(id=uid)
            uvt = UserVerificationToken.objects.get(token=token)

            if uvt.is_active:  # Check token against user
                user.set_password(user.password)
                user.email_verified = True
                user.save()
                uvt.active = False
                uvt.save()
                data = {
                    "tokens": get_tokens_for_user(user),
                }
                return Response(data, status=status.HTTP_200_OK)

            return Response({"message": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)
        except ( User.DoesNotExist, UserVerificationToken.DoesNotExist):
            return Response({"message": "Invalid user or token"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(e)
            return Response({"message": "Wrong verification link"}, status=status.HTTP_400_BAD_REQUEST)
    

    # google auth login/registration
    @action(methods=['POST'], detail=False, url_path="google")
    def google_auth(self, request):
        try:
            id_token = request.data.get("token", None)
            context = request.data.get("context", None)
            if context == None or id_token == None:
                raise ValueError("context or token is not known")
            
            id_token_info = verify_id_token(id_token)

            if context == "signin":
                user = User.objects.get(email=id_token_info['email'])
            elif context == "signup":
                if User.objects.filter(email=id_token_info["email"]).exists():
                    user = User.objects.get(email=id_token_info["email"])
                else:
                    user = User.objects.create(
                        email=id_token_info['email'], name=id_token_info['name'], 
                        email_verified=id_token_info['email_verified'])
                
                if not user.email_verified:
                    user.send_email_verification()
                
            
            tokens = get_tokens_for_user(user)
            data = {
                "user": BaseUserSerializer(user).data,
                "tokens": tokens,
            }

            return Response(data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"message": "User doesn't exist, create an account."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserViewSetAPI(ViewSet):
    permission_classes = [ IsAuthenticated ]
    authentication_classes = [ JWTAuthentication ]

    @action(detail=False, methods=["GET"])
    def get(self, request):
        user = request.user
        serialized_user = BaseUserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)
    
    
    def delete(self, request):
        try:
            request.user.delete()
            return Response({"message": "User deleted successfully."}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            logger.error("User not found.")
            return Response({"message": "User not found."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(e)
            return Response({"message": "Unable to delete user account"}, status=status.HTTP_400_BAD_REQUEST)

class PaymentAgreementViewSetAPI(ViewSet):
    permission_classes = [ IsAuthenticated ]
    authentication_classes = [ JWTAuthentication ]

    @action(detail=False, methods=["POST"], url_path="create")
    def create_agreement(self, request):
        data = request.data
        if data['buyer_email'] and data['name'] and data['amount']  \
            and data['transaction_type'] and data['description']  \
            and data['days_to_deliver'] and data['days_to_dispute']:
            agreement = PaymentAgreement.objects.create(**data, seller=request.user)

            user = User.objects.filter(email=data['buyer_email'])
            if user.exists():
                agreement.buyer = user.first()
            
            agreement.save()
            agreement.refresh_from_db()
            serializer_data = PaymentAgreementSerializer(agreement)
            return Response(serializer_data.data, status=status.HTTP_201_CREATED)
        return Response({"message": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(detail=True, methods=["GET"])
    def get(self, request, pk):
        agreement = PaymentAgreement.objects.get(pk=pk)
        serializer = PaymentAgreementSerializer(agreement)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=["GET"], url_path="list")
    def list_agreements(self, request):
        user = request.user
        agreements = PaymentAgreement.objects.filter(Q(seller=user) | Q(buyer_email=user.email) | Q(buyer=user))
        serializer = PaymentAgreementSerializer(agreements, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=["PUT"], url_path="update")
    def change_agreement(self, request, pk):
        agreement = PaymentAgreement.objects.get(pk=pk)
        if agreement.status == PaymentAgreement.PENDING and agreement.seller == request.user:
            data = request.data
            for key, value in data.items():
                setattr(agreement, key, value)
            agreement.save()
            agreement.refresh_from_db()
            serializer = PaymentAgreementSerializer(agreement)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            logger.error("You can't update active, complete or disputed agreement, or you not the seller")
            return Response({"message": "Failed to update."}, status=status.HTTP_400_BAD_REQUEST)
        
        
    @action(detail=True, methods=["PUT"], url_path="dispute")
    def dispute_agreement(self, request, pk):
        agreement = PaymentAgreement.objects.get(pk=pk)
        if agreement.status != PaymentAgreement.ACTIVE and agreement.buyer == request.user  \
            and (timezone.now() - agreement.created_at).days <= agreement.days_to_dispute:
            agreement.status = PaymentAgreement.DISPUTED
            agreement.save()
            agreement.refresh_from_db()
            serializer = PaymentAgreementSerializer(agreement)
            # create dispute and start processing refund ( notify seller and buyer )
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            logger.error("You can only dispute active agreement, or you not the buyer")
            return Response({"message": "Failed to dispute."}, status=status.HTTP_400_BAD_REQUEST)
        
    
    @action(detail=True, methods=["PUT"], url_path="delete")
    def delete(self, request, pk):
        agreement = PaymentAgreement.objects.get(pk=pk)
        if agreement.seller == request.user:
            agreement.delete()
            return Response({"message": "Agreement deleted successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "You not allowed to delete"}, status=status.HTTP_400_BAD_REQUEST)