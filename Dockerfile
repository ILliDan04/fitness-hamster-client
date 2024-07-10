FROM node:20.14.0-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM nginx

COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80