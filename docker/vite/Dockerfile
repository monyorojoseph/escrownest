# Build stage
FROM node:20-slim as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Runner stage
FROM node:20-slim as runner

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./

EXPOSE 6969

CMD ["serve", ".", "-p", "6969"]