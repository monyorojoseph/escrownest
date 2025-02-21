# Run this image on a container

PORT=any
docker run -d -p PORT:6969 escrownest-web

# Build this image
docker build -t escrownest-web -f docker/vite/Dockerfile ./web 