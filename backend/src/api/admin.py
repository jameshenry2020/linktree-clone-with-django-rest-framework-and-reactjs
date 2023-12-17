from django.contrib import admin
from . import models
# Register your models here.
admin.site.register([models.User, models.UserProfile, models.LinkTree, models.Niche, models.SocialIcon, models.SocialMedia])
