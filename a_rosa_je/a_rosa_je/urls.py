# a_rosa_je/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from plantes.api.views import PlanteViewSet, PhotoViewSet, ConseilViewSet

router = routers.DefaultRouter()
router.register(r'plantes', PlanteViewSet, basename='plantes')
router.register(r'photos', PhotoViewSet, basename='photos')
router.register(r'conseils', ConseilViewSet, basename='conseils')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', include('plantes.urls')),
]