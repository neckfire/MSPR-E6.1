# plantes/api/serializers.py
from rest_framework import serializers
from ..models import Plante, Photo, Conseil

class PlanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plante
        fields = ('id', 'nom', 'description', 'localisation', 'proprietaire')

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ('id', 'image', 'plante', 'created_at')

class ConseilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conseil
        fields = ('id', 'texte', 'plante', 'botaniste', 'created_at')