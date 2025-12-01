# ---------- STAGE 1: BUILD ----------
FROM node:21-alpine3.18 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./
COPY src ./src

ENV JWT_SECRET=secret

RUN npm run build

# ---------- STAGE 2: RUNTIME ----------
FROM node:21-alpine3.18 AS runtime

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=build /usr/src/app/dist ./dist

RUN mkdir -p storage/uploads

EXPOSE 3000

CMD ["npm", "run", "start"]
