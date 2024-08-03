FROM node:20.14.0-alpine

ARG VITE_BACKEND_URL
ARG VITE_TELEGRAM_APP
ARG URL
ARG TERMS_OF_USE_URL
ARG PRIVACY_POLICY_URL

ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_TELEGRAM_APP=$VITE_TELEGRAM_APP

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build
RUN echo '{"url": "'"$URL"'","name": "Fitton","iconUrl": "'"$URL"'/icon.png","termsOfUseUrl": "'"$TERMS_OF_USE_URL"'","privacyPolicyUrl": "'"$PRIVACY_POLICY_URL"'"}' > dist/tonconnect-manifest.json

FROM nginx

COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80