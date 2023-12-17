from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
   openapi.Info(
      title="LinkTree Clone  RestAPI",
      default_version='v1',
      description="this is a web api for ProfileTree Web App ",
      terms_of_service="https//www.henrycodingstack.com/contact",
      contact=openapi.Contact(email="aengrhenry@gmail.com"),
      license=openapi.License(name="Test License"),
   ),
   # url="https://profiletree/api/",
   public=True,
   permission_classes=[permissions.AllowAny],
)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include("api.urls")),
    path('api/api.json/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# if settings.DEBUG:
#     urlpatterns= urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
#     urlpatterns= urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

