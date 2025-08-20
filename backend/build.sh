#!/usr/bin/env bash
# exit on error
set -o errexit

# STEP 1: Install all project dependencies from requirements.txt
pip install -r requirements.txt

# STEP 2: Now that Django is installed, collect the static files for the admin panel.
python manage.py collectstatic --no-input

# STEP 3: And now, apply any database migrations.
python manage.py migrate