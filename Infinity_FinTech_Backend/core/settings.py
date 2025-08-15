import os
from pathlib import Path
from decouple import config  # <-- For reading .env file
import dj_database_url    # <-- For parsing the database URL

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# --- SECURITY SETTINGS (READ FROM ENVIRONMENT) ---
# Your SECRET_KEY is read from the .env file (or Render's secret file)
SECRET_KEY = config('SECRET_KEY')

# DEBUG is False in production for security, but can be True locally if you set it in .env
DEBUG = config('DEBUG', default=False, cast=bool)

# ALLOWED_HOSTS is now configured for both local development and Render
ALLOWED_HOSTS = []

# This automatically adds your Render URL to the allowed hosts when deployed
RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)
else:
    # Allows for local development
    ALLOWED_HOSTS.extend(['localhost', '127.0.0.1'])


# --- Application definition ---
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # My Apps
    'shops.apps.ShopsConfig',

    # 3rd Party Apps
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
]

MIDDLEWARE = [
    # CORS Middleware must be placed high up
    'corsheaders.middleware.CorsMiddleware',

    'django.middleware.security.SecurityMiddleware',
    # WhiteNoise Middleware should be placed right after the security middleware
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
    # ... (Your template settings are unchanged) ...
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# --- DATABASE (CONFIGURED FOR RENDER AND LOCAL) ---
# This setup uses the DATABASE_URL from Render's environment, but falls back
# to your local db.sqlite3 if it's not found (perfect for development).
DATABASES = {
    'default': dj_database_url.config(
        default=f'sqlite:///{BASE_DIR / "db.sqlite3"}',
        conn_max_age=600,
        conn_health_checks=True,
    )
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    # ... default validators are unchanged ...
]

# --- Internationalization ---
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# --- STATIC FILES (CONFIGURED FOR WHITENOISE) ---
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
# This enables WhiteNoise to find and serve your static files efficiently.
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# --- MEDIA FILES Configuration (User Uploads) ---
# This part is unchanged. On Render, you will need a separate service like AWS S3
# or Cloudinary to handle these files persistently.
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# --- API AND AUTHENTICATION SETTINGS ---
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

# --- DYNAMIC CORS CONFIGURATION ---
# This list will be used for local development
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# When deployed, we read the frontend URL from an environment variable
FRONTEND_ORIGIN_URL = config('FRONTEND_ORIGIN_URL', default=None)
if FRONTEND_ORIGIN_URL:
    CORS_ALLOWED_ORIGINS.append(FRONTEND_ORIGIN_URL)