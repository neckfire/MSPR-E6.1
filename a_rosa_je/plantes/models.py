from django.db import models
from django.contrib.auth.models import User

class Plante(models.Model):
    nom = models.CharField(max_length=100)
    description = models.TextField()
    localisation = models.CharField(max_length=200)
    proprietaire = models.ForeignKey(User, on_delete=models.CASCADE, related_name='plantes')


class Photo(models.Model):
    image = models.ImageField(upload_to='plantes')
    plante = models.ForeignKey(Plante, on_delete=models.CASCADE, related_name='photos')
    created_at = models.DateTimeField(auto_now_add=True)

class Conseil(models.Model):
    texte = models.TextField()
    plante = models.ForeignKey(Plante, on_delete=models.CASCADE, related_name='conseils')
    botaniste = models.ForeignKey(User, on_delete=models.CASCADE, related_name='conseils')
    created_at = models.DateTimeField(auto_now_add=True)