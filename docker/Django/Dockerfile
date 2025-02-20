FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN pip install --upgrade pip
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

WORKDIR /app

# RUN python manage.py collectstatic --no-input

# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "setup.wsgi"]