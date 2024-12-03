from django import forms
from .models import Plante, Photo, Conseil

class PlanteForm(forms.ModelForm):
    class Meta:
        model = Plante
        fields = ['nom', 'description', 'localisation']

class PhotoForm(forms.ModelForm):
    class Meta:
        model = Photo
        fields = ['image']

class ConseilForm(forms.ModelForm):
    class Meta:
        model = Conseil
        fields = ['texte']