from django.urls import path
from . import views
from rest_framework_simplejwt.views import (TokenRefreshView,)

urlpatterns=[
    path('register/', views.UserRegisterEndPoint.as_view(), name='signup'),
    path('login/', views.UserLoginEndPoint.as_view(), name='login'),
    path('niches/', views.NicheListEndpoint.as_view(), name='niches'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/update_profile/', views.UpdateUserProfileEndPoint.as_view(), name='user_profile_update'),
    path('get_profile/<str:username>/', views.GetUserProfileEndPoint.as_view(), name='profile'),
    path('email-verify/', views.EmailVerificationEndPoint.as_view(), name='email-verification'),
    path('password-reset/', views.PasswordResetRequestView.as_view(), name='password-reset'),
    path('password-reset-confirm/<uidb64>/<token>/', views.PasswordResetConfirm.as_view(), name='reset-password-confirm'),
    path('set-new-password/', views.SetNewPasswordView.as_view(), name='set-new-password'),
    path('upload_profile_image/', views.UploadProfileImage.as_view(), name='upload-image'),
    path('add_link/', views.AddLinkEndPoint.as_view(), name='add_link'),
    path('link/<int:pk>/', views.GetLinkEndPoint.as_view(), name='link'),
    path('edit_link/<int:pk>/', views.EditDeleteEndpoint.as_view(), name='edit'),
    path('links/<str:username>/', views.LinkListEndpoint.as_view(), name='links'),
    path('add_social_icon/', views.AddSocialIconEndpoint.as_view(), name='socials'),
    path('edit_icons/<int:pk>/', views.EditDeleteSocialEndpoint.as_view(), name='edit-icons'),
    path('icons/', views.GetSocialIcon.as_view(), name='icons'),
    path('icons-list/<str:username>/', views.SocialIconList.as_view(), name='icon-list')

]