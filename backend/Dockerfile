FROM python:3.14-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y libpq-dev gcc
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Expose Django port
EXPOSE 8000

# Run migrations and start server (sleep 5s to let DB initialize and DNS propagate)
CMD ["sh", "-c", "sleep 5 && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
