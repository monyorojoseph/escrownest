# run postgres container
docker run --name dummy_postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=escrownest -v pg_volume:/var/lib/postgresql/data -d -p 5432:5432 postgres
# create volume
docker volume create