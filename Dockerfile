FROM node:16.10.0-alpine as nodejs

WORKDIR /app

COPY . .

RUN npm ci && \
    npm run build && \
    npm run generate

# Без этой строки любые проблемы с сертификатом будут блокировать весь сайт
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

ENTRYPOINT npm start
