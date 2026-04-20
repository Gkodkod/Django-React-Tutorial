# Convert Backend to PostgreSQL & Dockerize App

This plan details the steps to convert the Django backend to use PostgreSQL and to provide all necessary files to run the entire application (Backend, Frontend, and Database) via `docker-compose` for local development.

## Proposed Changes

### 1. Backend Configuration (`settings.py`)

We will update `DATABASES` in `backend/backend/settings.py` to read PostgreSQL credentials from environment variables. This maintains your ability to run it locally without Docker (you just need to provide these variables) while seamlessly integrating with Docker Compose.

### 2. Backend Dockerfile

We will create a Dockerfile for the Django application.

### 3. Frontend Dockerfile

We will populate your empty `frontend/Dockerfile` to install dependencies via `pnpm` and start the Vite development server.

### 4. Docker Compose Environment

We will create a `docker-compose.yml` to orchestrate all three services.

### 5. Local `.env.template` (Optional, for running without Docker)

For your non-Docker local runs, you'll need the matching env vars injected. We will create a template.
