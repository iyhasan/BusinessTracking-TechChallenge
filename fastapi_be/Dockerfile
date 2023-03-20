# Use the official Python 3.8 Alpine-based image as the base image
FROM python:3.8-alpine

# Set the working directory to /app
WORKDIR /app

# Install build dependencies required for psycopg2 and pipenv
# gcc, musl-dev, and postgresql-dev are required to build psycopg2 from source
# py3-pip is required to install pipenv
RUN apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev py3-pip

# Install runtime dependencies
# postgresql-libs is required for psycopg2 shared libraries
RUN apk add --no-cache postgresql-libs

# Install pipenv
RUN pip install pipenv

# Copy the Pipfile and Pipfile.lock files into the container
COPY ./Pipfile /app/Pipfile
COPY ./Pipfile.lock /app/Pipfile.lock

# Install the dependencies listed in Pipfile.lock
# The --system flag installs packages globally and --deploy ensures only locked dependencies are installed
RUN pipenv install --system --deploy

# Remove the build dependencies installed earlier
# This helps to reduce the size of the Docker image
RUN apk del .build-deps

# Copy the remaining application files into the container
COPY . /app

# Start the FastAPI application using uvicorn
# Bind the application to listen on all interfaces (0.0.0.0) and port 8000
CMD ["hupper", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
