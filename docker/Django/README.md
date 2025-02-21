# Run this image on a container

PORT=any
docker run -d -p PORT:8000 escrownest-app

# Build this image
docker build -t escrownest-app -f docker/Django/Dockerfile ./app