# Django & React Web App Tutorial - Authentication, Databases, Deployment & More

## Project Overview

This repository contains a full-stack web application built with **Django** (Backend) and **React** (Frontend). It serves as a comprehensive tutorial on building, configuring, and connecting a modern frontend to a robust RESTful API.

### Key Features
- **Frontend**: React application built with Vite, utilizing **Shadcn UI** and **Tailwind CSS** for styling. Includes routing with `react-router-dom`.
- **Backend**: Django & Django REST Framework for the API.
- **Authentication**: JWT-based authentication using `djangorestframework-simplejwt` and `jwt-decode`.
- **Database**: Works with SQLite natively, easily configurable for PostgreSQL.
- **API Documentation**: Automated Swagger and ReDoc generation using `drf-spectacular`.

### Repository Structure
- `backend/`: The Django application containing the settings, API endpoints, management scripts, and db models.
- `frontend/`: The React application containing all UI components, pages, and API connection logic.

---
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

### Docker Environment

We have fully containerized the application for seamless local development. The Docker Compose configuration spins up three integrated services automatically:

1. **Database (`db`)**: A **PostgreSQL 18** container explicitly bound to port `5433` internally (via `-p 5433`). It uses a static container name (`unique-postgres-db`) to elegantly bypass known Debian local networking DNS bugs.
2. **Django API (`backend`)**: Running purely on the edge **Python 3.14** image. Upon booting, the backend natively pauses for 5 seconds to ensure Postgres is fully alive, automatically runs `python manage.py migrate`, and spins up the Django `runserver`.
3. **React Client (`frontend`)**: Powered by Vite and PNPM. The compose maps your local directory directly into the container using `CI=true` to automatically reinstall modules without messy terminal prompts, ensuring zero host-vs-container binary conflicts.

**How to start the full stack:**
```bash
# Wipe out lingering networks/data if you have corrupted states
docker-compose down -v

# Build and start the entire frontend, backend, and database ecosystem natively
docker-compose up --build

docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate
```

*(Note: You no longer need to jump into the container to manually run `migrate` or `runserver`! The `Dockerfile CMD` automates the entire startup sequence for you!)*

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

login to admin panel: http://localgalghost:8000/admin/

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

To access the API documentation:
Start the backend development server and navigate your browser to `http://127.0.0.1:8000/api/docs/` for the interactive Swagger UI. The raw OpenAPI schema is available at `http://127.0.0.1:8000/api/schema/`.

### Available API Routes

When the backend server is running locally (typically `localhost:8000`), the following API endpoints are active:

**Authentication:**
- `POST /api/user/register/`: Register a new user.
- `POST /api/token/`: Obtain JWT access and refresh tokens (Login).
- `POST /api/token/refresh/`: Refresh an expired JWT access token.
- `GET /api-auth/`: Browsable API login (Django REST Framework default).

**Notes (Requires Authentication):**
- `GET /api/notes/`: Retrieve a list of all notes for the authenticated user.
- `POST /api/notes/`: Create a new note.
- `DELETE /api/notes/<id>/`: Delete a specific note.

**Documentation:**
- `GET /api/schema/`: Raw OpenAPI schema.
- `GET /api/docs/`: Swagger UI interactive documentation.

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