# Start from NodeJS image
FROM node:latest as builder

# Workdir definition in container
WORKDIR /app

# Environment declaration variables
ARG NODE_ENV="dev"
ARG VITE_API_URL="http://localhost:5000/api"
ARG VITE_APP_NAME="AEI"


# Setting up environment
RUN echo "NODE_ENV=${NODE_ENV}" > .env \
    && echo "VITE_API_URL=${VITE_API_URL}" >> .env \
    && echo "VITE_APP_NAME=${VITE_APP_NAME}" >> .env

RUN cat .env

# App files
COPY public ./public
COPY src ./src

# Config files
COPY components.json ./
COPY env.d.ts ./
COPY index.html ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY tsconfig.app.json ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY tsconfig.vitest.json ./
COPY vite.config.ts ./


RUN ls -lia
RUN ls -lia src

# Dependancies
COPY package*.json ./
RUN npm install

# Creation of build
RUN npm run build

# Serve static website build on previous stage with Nginx
FROM nginx:alpine

# Copying build from previous stage
COPY --from=builder /app/dist /erp
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80