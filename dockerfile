# Utiliser une image de base avec Python préinstallé
FROM python:3.10-slim

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de configuration (par exemple requirements.txt)
COPY Requirements.txt /app/

# Installer les dépendances Python
RUN pip install --no-cache-dir -r Requirements.txt

# Copier tout le code source de l'application dans le conteneur
COPY . /app/

# Exposer le port sur lequel Django sera servi (par défaut 8000)
EXPOSE 8000


# Définir la commande à exécuter pour démarrer l'application
CMD ["python", "a_rosa_je/manage.py", "runserver", "0.0.0.0:8000"]
