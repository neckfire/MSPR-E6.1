# urls.py (plantes app)
from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', views.liste_plantes, name='liste_plantes'),
    path('plante/<int:pk>/', views.detail_plante, name='detail_plante'),
    path('ajouter-plante/', views.ajouter_plante, name='ajouter_plante'),
    path('plante/<int:pk>/ajouter-photo/', views.ajouter_photo, name='ajouter_photo'),
    path('plante/<int:pk>/ajouter-conseil/', views.ajouter_conseil, name='ajouter_conseil'),
    path('plante/ajouter-conseil/<int:pk>/', views.ajouter_conseil, name='ajouter_conseil'),
    path('accounts/login/', LoginView.as_view(template_name='plantes/login.html'), name='login'),
    path('accounts/register/', LoginView.as_view(template_name='plantes/register.html'), name='register'),
    path('accounts/logout/', LogoutView.as_view(template_name='plantes/logout.html'), name='logout'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)