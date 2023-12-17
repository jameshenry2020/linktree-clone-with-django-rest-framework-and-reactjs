import jwt
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import GenericAPIView, ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework import exceptions
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.views import APIView
from .models import User, UserProfile, Niche, LinkTree, SocialIcon, SocialMedia
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.http import Http404
from django.conf import settings
from .helpers import send_email_to_user
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from api import serializers
# Create your views here.


class UserRegisterEndPoint(GenericAPIView):
    serializer_class=serializers.UserSerializer

    def post(self, request):
        serializer=self.serializer_class(data=request.data,  context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user_data=serializer.data
            user = User.objects.get(email=user_data['email'])
            token = RefreshToken.for_user(user).access_token
            current_site = settings.UI_CLIENT_DOMAIN
            # relativeLink = reverse('email-verification')
            url_link = f"{current_site}?token={str(token)}"
            email_body = f"Hi {user.username} welcome to linkHouse please Use the link below to verify your email \n {url_link}"
            data = {'email_body': email_body, 'to_email': user.email,
                'email_subject': 'Verify your email'}
            #run this asyncronously or using python threading
            send_email_to_user(data)
            return Response({
                 'data':user_data,
                'message':'thanks for signing up please verify your email with the link sent to your email'
            }, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class EmailVerificationEndPoint(APIView):
    serializer_class = serializers.EmailVerificationSerializer

    token_param_config = openapi.Parameter(
        'token', in_=openapi.IN_QUERY, description='User Email verification token', type=openapi.TYPE_STRING)

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def post(self, request):
        token = request.data.get('token')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user = User.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified = True
                user.save()
            return Response({'message': 'Email Successfully activated'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return Response({'error': 'Activation Link Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


class UserLoginEndPoint(GenericAPIView): 
        serializer_class=serializers.LoginSerializer
        def post(self, request):
            serializer= self.serializer_class(data=request.data, context={'request': request})
            if serializer.is_valid(raise_exception=True):
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


class UpdateUserProfileEndPoint(GenericAPIView):
    permission_classes=[permissions.IsAuthenticated]
    serializer_class=serializers.ProfileUpdateSerializer

    def put(self, request):
        user_profile=UserProfile.objects.get(user=request.user) #a user must alway have a profile as far they are authenticate,
        data=request.data
        serializer =self.serializer_class(instance=user_profile, data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class GetUserProfileEndPoint(GenericAPIView):
    serializer_class=serializers.ProfileSerializer  
    permission_classes=[permissions.AllowAny]
    def get(self, request, username):
        try:
            profile_obj=UserProfile.objects.get(user__username=username)
        except UserProfile.DoesNotExist:
            raise exceptions.NotFound
        serializer=self.serializer_class(profile_obj)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PasswordResetRequestView(GenericAPIView):
    serializer_class=serializers.PasswordResetRequestSerializer
    def post(self, request):
        print("incoming data:", request.data)
        serializer=self.serializer_class(data=request.data, context={'request':request})
        serializer.is_valid(raise_exception=True)
        return Response({'message':'we have sent you a link to reset your password'}, status=status.HTTP_200_OK)
    

class PasswordResetConfirm(GenericAPIView):
    def get(self, request, uidb64, token):
        try:
            user_id=smart_str(urlsafe_base64_decode(uidb64))
            user=User.objects.get(id=user_id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'message':'token is invalid or has expired'}, status=status.HTTP_401_UNAUTHORIZED)
            return Response({'success':True, 'message':'credentials is valid', 'uidb64':uidb64, 'token':token}, status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError as identifier:
            return Response({'message':'token is invalid or has expired'}, status=status.HTTP_401_UNAUTHORIZED)


        
class SetNewPasswordView(GenericAPIView):
    serializer_class=serializers.SetNewPasswordSerializer

    def patch(self, request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success':True, 'message':"password reset is succesfully"}, status=status.HTTP_200_OK)


#get all niche endpoint
class NicheListEndpoint(ListAPIView):
    serializer_class=serializers.NicheSerializer
    permission_classes=[permissions.IsAuthenticated]
    queryset=Niche.objects.all()

#upload profile image
class UploadProfileImage(GenericAPIView):
    serializer_class=serializers.UploadImageSerializer
    permission_classes=[permissions.IsAuthenticated]
    parser_classes=[MultiPartParser, FormParser]
    
    def patch(self, request):
        try:
            profile=UserProfile.objects.get(user=request.user)
        except UserProfile.DoesNotExist:
            raise exceptions.NotFound
        serializer=self.serializer_class(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                 'data':serializer.data,
                'message':'image uploaded successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

  

#add links 
class AddLinkEndPoint(CreateAPIView):
    queryset=LinkTree.objects.all()
    permission_classes=[permissions.IsAuthenticated]
    serializer_class=serializers.LinkSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

#get single link
class GetLinkEndPoint(RetrieveAPIView):
    queryset=LinkTree.objects.all()
    permission_classes=[permissions.IsAuthenticated]
    serializer_class=serializers.LinkSerializer
    lookup_field='pk'
    

#delete link and edit link
class EditDeleteEndpoint(GenericAPIView):
    serializer_class=serializers.LinkSerializer
    permission_classes=[permissions.IsAuthenticated]

    def get_object(self, pk):
        try:
            return LinkTree.objects.get(pk=pk, user=self.request.user)
        except LinkTree.DoesNotExist:
            raise Http404

    def patch(self, request, pk):
        link=self.get_object(pk)
        serializer=self.serializer_class(link, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        link=self.get_object(pk)
        if link.user != request.user:
            raise exceptions.PermissionDenied
        link.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

   
        
#retrieve link list
class LinkListEndpoint(GenericAPIView):
    serializer_class=serializers.LinkSerializer
    permission_classes=[permissions.AllowAny]
    
    def get(self, request, username):
        links=LinkTree.objects.filter(user__username=username)
        if  not links.exists():
            return Response({'message':f'there is not links for {username}'}, status=status.HTTP_400_BAD_REQUEST)
        serializer=self.serializer_class(links, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

        
class AddSocialIconEndpoint(CreateAPIView):
    serializer_class=serializers.AddSocialIconSerializer
    permission_classes=[permissions.IsAuthenticated]
    queryset=SocialIcon.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



#delete social icon and edit icon
class EditDeleteSocialEndpoint(GenericAPIView):
    serializer_class=serializers.SocialIconSerializer
    permission_classes=[permissions.IsAuthenticated]

    def get_object(self, pk):
        try:
            return SocialIcon.objects.get(pk=pk, user=self.request.user)
        except SocialIcon.DoesNotExist:
            raise Http404

    def patch(self, request, pk):
        socialicon=self.get_object(pk)
        serializer=self.serializer_class(socialicon, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        social=self.get_object(pk)
        if social.user != request.user:
            raise exceptions.PermissionDenied
        social.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class SocialIconList(GenericAPIView):
    serializer_class=serializers.SocialIconSerializer
    permission_classes=[permissions.AllowAny]

    def get(self, request, username):
        socials=SocialIcon.objects.filter(user__username=username)
        if  not socials.exists():
            return Response({'message':f'there is not social icons for {username}'}, status=status.HTTP_400_BAD_REQUEST)
        serializer=self.serializer_class(socials, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


  
class GetSocialIcon(ListAPIView):
    serializer_class=serializers.IconSerializer
    permission_classes=[permissions.AllowAny]
    queryset=SocialMedia.objects.all()
    
