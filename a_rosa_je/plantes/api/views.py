from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..models import Plante, Photo, Conseil
from .serializers import PlanteSerializer, PhotoSerializer, ConseilSerializer

class PlanteViewSet(viewsets.ModelViewSet):
    serializer_class = PlanteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Plante.objects.filter(proprietaire=self.request.user)

class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

class ConseilViewSet(viewsets.ModelViewSet):
    queryset = Conseil.objects.all()
    serializer_class = ConseilSerializer