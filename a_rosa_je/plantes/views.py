from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login
from .models import Plante, Photo, Conseil
from .forms import PlanteForm, PhotoForm, ConseilForm

@login_required
def liste_plantes(request):
    plantes = Plante.objects.filter(proprietaire=request.user)
    return render(request, 'plantes/liste_plantes.html', {'plantes': plantes})

@login_required
def detail_plante(request, pk):
    plante = get_object_or_404(Plante, pk=pk)
    photos = Photo.objects.filter(plante=plante)
    conseils = Conseil.objects.filter(plante=plante)
    return render(request, 'plantes/detail_plante.html', {'plante': plante, 'photos': photos, 'conseils': conseils})

@login_required
def ajouter_plante(request):
    if request.method == 'POST':
        form = PlanteForm(request.POST)
        if form.is_valid():
            plante = form.save(commit=False)
            plante.proprietaire = request.user
            plante.save()
            return redirect('liste_plantes')
    else:
        form = PlanteForm()
    return render(request, 'plantes/ajouter_plante.html', {'form': form})

@login_required
def ajouter_photo(request, pk):
    plante = get_object_or_404(Plante, pk=pk)
    if request.method == 'POST':
        form = PhotoForm(request.POST, request.FILES)
        if form.is_valid():
            photo = form.save(commit=False)
            photo.plante = plante
            photo.save()
            return redirect('detail_plante', pk=plante.pk)
    else:
        form = PhotoForm()
    return render(request, 'plantes/ajouter_photo.html', {'form': form, 'plante': plante})

@login_required
def ajouter_conseil(request, pk):
    plante = get_object_or_404(Plante, pk=pk)
    if request.user.is_staff:
        if request.method == 'POST':
            form = ConseilForm(request.POST)
            if form.is_valid():
                conseil = form.save(commit=False)
                conseil.plante = plante
                conseil.botaniste = request.user
                conseil.save()
                return redirect('detail_plante', pk=plante.pk)
        else:
            form = ConseilForm()
        return render(request, 'plantes/ajouter_conseil.html', {'form': form, 'plante': plante})
    else:
        return redirect('detail_plante', pk=plante.pk)
    
def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('liste_plantes')
    else:
        form = UserCreationForm()
    return render(request, 'register.html', {'form': form})