from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.tokens import RefreshToken
from phonenumber_field.modelfields import PhoneNumberField
# Create your models here.

#User model
from .managers import UserManager
# Create your models here.


class User(AbstractBaseUser, PermissionsMixin):
    id = models.BigAutoField(primary_key=True, editable=False) 
    email = models.EmailField(
        max_length=255, verbose_name=_("Email Address"), unique=True
    )
    username = models.CharField(max_length=80, verbose_name=_("Username"), unique=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_verified=models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "username"

    REQUIRED_FIELDS = ["email"]

    objects = UserManager()

    def tokens(self):    
        refresh = RefreshToken.for_user(self)
        return {
            "refresh":str(refresh),
            "access":str(refresh.access_token)
        }


    def __str__(self):
        return self.username

    
class Niche(models.Model):
    name=models.CharField(max_length=40)

    def __str__(self):
        return self.name
    
#user profile
class UserProfile(models.Model):
    class Gender(models.TextChoices):
        MALE = "Male", _("Male")
        FEMALE = "Female", _("Female")

    user=models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    names=models.CharField(max_length=255, blank=True, null=True)
    occupation=models.CharField(max_length=255, blank=True, null=True)
    bio=models.TextField( blank=True, null=True)
    phone=PhoneNumberField(max_length=30, blank=True, null=True, default="+234-45673456")
    gender=models.CharField(max_length=8, choices=Gender.choices, default=Gender.MALE)
    niche=models.ForeignKey(Niche, on_delete=models.DO_NOTHING, blank=True, null=True)
    profile_img=models.ImageField(upload_to="profile", default="/avater.png", null=True, blank=True)

    def __str__(self):
        return self.user.username
    
#user links
class LinkTree(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    link_name=models.CharField(max_length=200)
    link=models.URLField(max_length=400)

    def __str__(self):
        return f"{self.user.username} links"


class SocialMedia(models.Model):
    icon=models.ImageField(upload_to="icons")
    name=models.CharField(max_length=200)

    def __str__(self):
        return self.name

#user social icon
class SocialIcon(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    social_media=models.ForeignKey(SocialMedia, on_delete=models.DO_NOTHING, null=True)
    social_accounts=models.URLField(max_length=200, blank=True)

    def __str__(self):
        return f"{self.user.username} social accounts"
