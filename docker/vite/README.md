# Run this image on a container

PORT=any
docker run -d -p PORT:6969 escrow-web

# Build this image
docker build -t escrow-web -f docker/vite/Dockerfile ./web 