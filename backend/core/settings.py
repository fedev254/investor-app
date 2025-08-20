# backend/core/settings.py

import os
from pathlib import Path
import dj_database_url

# We NO LONGER need the cloudinary imports
# import cloudinary
# import cloudinary.api
# import cloudinary.uploader

BASE_DIR = Path(__file__).resolve().parent.parent

# --- SECURITY SETTINGS ---
SECRET_KEY = os.environ.get('SECRET_KEY', 'default-insecure-key-for-local-development')
DEBUG = 'RENDER' not in os.environ
ALLOWED_HOSTS = []
RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

# --- APPLICATION DEFINITION ---
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'whitenoise.runserver_nostatic',
    'shops',
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    # We REMOVED cloudinary and cloudinary_storage from here
]

# --- MIDDLEWARE ---
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'APP_DIRS': True, 
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
WSGI_APPLICATION = 'core.wsgi.application'

# --- DATABASE ---
if 'DATABASE_URL' in os.environ:
    DATABASES = {'default': dj_database_url.config(conn_max_age=600)}
else:
    # Please add your local database configuration here if needed
    DATABASES = { 
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'investor_db',
            'USER': 'investor_user',
            'PASSWORD': 'your_password', # <-- your local password
            'HOST': '127.0.0.1',
            'PORT': '5432',
        }
    }

# --- PASSWORD VALIDATION ---
AUTH_PASSWORD_VALIDATORS = [
    # ... keep your existing validators ...
]
# --- INTERNATIONALIZATION ---
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# --- STATIC FILES (for Django Admin) ---
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# --- API & CORS ---
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ('rest_framework_simplejwt.authentication.JWTAuthentication',)
}
CORS_ORIGIN_ALLOW_ALL = True # Simplest robust setting

# --- THIS IS THE UPDATED MEDIA FILE CONFIGURATION FOR RENDER DISKS ---
MEDIA_URL = '/media/'
if 'RENDER' in os.environ:
    # In production, MEDIA_ROOT is the mount path of the persistent disk.
    MEDIA_ROOT = '/var/data/media'
else:
    # In local development, MEDIA_ROOT is a 'media' folder in your project.
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')