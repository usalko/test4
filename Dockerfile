FROM node:18-alpine AS build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# source code
COPY package.json ./
COPY package-lock.json ./
# COPY yarn.lock ./
RUN npm i

COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY tsconfig.json ./

COPY src ./src
COPY public ./public
ARG APPLICATION_URL_CONTEXT=/
ARG PUBLIC_FRONT_URL=

# RUN sed -i "s#BrowserRouter basename='/'#BrowserRouter basename='${APPLICATION_URL_CONTEXT}'#g" /app/src/index.js

RUN npm run build

# Packing
FROM nginx:alpine
COPY --from=build /app/build /var/www/html
CMD ["nginx", "-g", "daemon off;"]