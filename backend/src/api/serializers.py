from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from phonenumber_field.serializerfields import PhoneNumberField
from .models import User, UserProfile, Niche,LinkTree,SocialIcon,SocialMedia
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .helpers import send_email_to_user
from django.db import transaction
from django.conf import settings



class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    password2= serializers.CharField(max_length=68, min_length=6, write_only=True)
    access_token=serializers.CharField(max_length=255, read_only=True)
    refresh_token=serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model=User
        fields = ['email', 'username', 'password', 'password2', 'access_token','refresh_token']
    


    def validate(self, attrs):
        password=attrs.get('password', '')
        password2 =attrs.get('password2', '')
        if password != password2:
            raise serializers.ValidationError("passwords do not match")   
        return attrs
    
    @transaction.atomic()
    def create(self, validated_data):
        request=self.context.get('request')
        newUser=User.objects.create_user(
        username=validated_data.get('username'),
        email=validated_data.get('email'),
        password=validated_data.get('password')
        )  
        username=newUser.username
        raw_password=validated_data.get('password')
        loginUser= authenticate(request, username=username, password=raw_password)
        if not loginUser:
            raise AuthenticationFailed("invalid credential try again")
        tokens=loginUser.tokens()
        return {
            'username':loginUser.username,
            'email':loginUser.email,
            "access_token":str(tokens.get('access')),
            "refresh_token":str(tokens.get('refresh'))
        }
        
        

class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = User
        fields = ['token']
        
class LoginSerializer(serializers.ModelSerializer):
    username=serializers.CharField(max_length=68, min_length=6)
    password=serializers.CharField(max_length=68, write_only=True)
    email = serializers.EmailField(max_length=155, min_length=6, read_only=True)
    access_token=serializers.CharField(max_length=255, read_only=True)
    refresh_token=serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'access_token', 'refresh_token']

    

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        request=self.context.get('request')
        user = authenticate(request, username=username, password=password)
        if not user:
            raise AuthenticationFailed("invalid credential try again")
        if not user.is_verified:
            raise AuthenticationFailed("Email is not verified")
        tokens=user.tokens()
        return {
            'username':user.username,
            'email':user.email,
            "access_token":str(tokens.get('access')),
            "refresh_token":str(tokens.get('refresh'))
        }

class ProfileUpdateSerializer(serializers.ModelSerializer):
    phone = PhoneNumberField(region="NG")
    class Meta:
        model=UserProfile
        fields=['names', 'bio', 'occupation', 'phone', 'gender','niche'] 

#for getting all the niches
class NicheSerializer(serializers.ModelSerializer):
    class Meta:
        model=Niche
        fields=['id', 'name']


#for retrieving the user profile data need to be seen by everybody
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserProfile
        fields=['names','occupation', 'bio', 'phone', 'profile_img']


class UploadImageSerializer(serializers.ModelSerializer):
    profile_img=serializers.ImageField(required=True)
    class Meta:
        model=UserProfile
        fields=['profile_img']

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        fields = ['email']

    def validate(self, attrs):     
        email = attrs.get('email')
        if User.objects.filter(email=email).exists():
            user= User.objects.get(email=email)
            uidb64=urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            request=self.context.get('request')
            # current_site=get_current_site(request).domain
            #  #change later to be the frontend domain not the api
            current_site=settings.FRONT_DOMAIN
            relative_link =reverse('reset-password-confirm', kwargs={'uidb64':uidb64, 'token':token})
            abslink=f"http://{current_site}/{relative_link}"
            email_body=f"Hi {user.username} use the link below to reset your password {abslink}"
            data={
                'email_body':email_body, 
                'email_subject':"Reset your Password", 
                'to_email':user.email
                }
            send_email_to_user(data)

        return super().validate(attrs)
    

class SetNewPasswordSerializer(serializers.Serializer):
    password=serializers.CharField(max_length=100, min_length=6, write_only=True)
    confirm_password=serializers.CharField(max_length=100, min_length=6, write_only=True)
    uidb64=serializers.CharField(min_length=1, write_only=True)
    token=serializers.CharField(min_length=3, write_only=True)

    class Meta:
        fields = ['password', 'confirm_password', 'uidb64', 'token']

    def validate(self, attrs):
        try:
            token=attrs.get('token')
            uidb64=attrs.get('uidb64')
            password=attrs.get('password')
            confirm_password=attrs.get('confirm_password')

            user_id=force_str(urlsafe_base64_decode(uidb64))
            user=User.objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed("reset password link is invalid or has expired", 401)
            if password != confirm_password:
                raise AuthenticationFailed("passwords do not match")
            user.set_password(password)
            user.save()
            return user
        except Exception as e:
            return AuthenticationFailed("link is invalid or has expired")
        
class LinkSerializer(serializers.ModelSerializer):
    link=serializers.URLField(max_length=400, min_length=20)
    class Meta:
        model=LinkTree
        fields=['id', 'link_name', 'link']

class AddSocialIconSerializer(serializers.ModelSerializer):
    class Meta:
        model=SocialIcon
        fields=['social_media', 'social_accounts']


class IconSerializer(serializers.ModelSerializer):
    class Meta:
        model=SocialMedia
        fields=['id', 'icon', 'name']

class SocialIconSerializer(serializers.ModelSerializer):
    social_media=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=SocialIcon
        fields=['id','social_media', 'social_accounts']

    def get_social_media(self, obj):
        return IconSerializer(obj.social_media).data


    

