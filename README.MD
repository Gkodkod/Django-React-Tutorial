# Django & React Web App Tutorial - Authentication, Databases, Deployment & More

## BACKEND

```bash
python -m venv env

# mac
source env/bin/activate

# windows
.\env\Scripts\activate

django-admin startproject backend
cd backend
python manage.py startapp api

python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

## FRONTEND

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm run dev

npm i axios react-router-dom jwt-decode
```

### Create Django Admin User

```bash
python manage.py createsuperuser
```

### Django users and groups

login to admin panel: http://localhost:8000/admin/

```bash
python manage.py adduser <username> <password>
python manage.py addgroup <groupname>
python manage.py adduser_to_group <username> <groupname>
```
### You can create a superuser non-interactively:

```bash
python manage.py createsuperuser --username admin --email admin@example.com
```

### Add API Docs

```bash
pip install djangorestframework drf-spectacular
```

```python
# backend/settings.py
REST_FRAMEWORK = {
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

INSTALLED_APPS = [
    # ...
    "drf_spectacular",
]
```

```python
# backend/urls.py
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    # ...
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
]
```

### See ALL routes (like a route dump)

```bash
pip install django-extensions
```

```python
# backend/settings.py
INSTALLED_APPS = [
    # ...
    "django_extensions",
]
```

```bash
python manage.py show_urls
```

### Add shadcn UI Components

```bash
npm install tailwindcss @tailwindcss/vite
npx shadcn@latest init
```

```bash
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add button
```