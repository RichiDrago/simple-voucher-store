FROM node:trixie-slim AS build

WORKDIR /usr/src/app
COPY . /usr/src/app

ENV VITE_BACKEND_PORT=80

RUN npm install
RUN npm run build

FROM nginx:alpine

COPY ./config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# RUN apk add nano

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]