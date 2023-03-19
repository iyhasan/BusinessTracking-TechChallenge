# Pull base image
FROM python:3.9

# Set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /home/app

# Install dependencies
RUN pip install pipenv
COPY Pipfile Pipfile.lock /home/app/
RUN pipenv install --system --dev

COPY . /home/app
COPY .env /home/app/

EXPOSE 8000
