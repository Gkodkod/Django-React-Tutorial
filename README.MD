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
