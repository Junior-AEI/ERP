# Start from NodeJS image
FROM node:18 as builder

# Workdir definition in container
WORKDIR /usr/app

# Environment declaration variables
ARG VITE_API_URL='http://localhost:5000/api'
ARG VITE_APP_NAME='ERP - Junior AEI'

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

# Setting up environment
RUN echo "VITE_API_URL=${VITE_API_URL}" > .env \
    && echo "VITE_APP_NAME=${VITE_APP_NAME}" >> .env

RUN ls -lia
RUN ls -lia src

# Dependancies
COPY package*.json ./
RUN npm i

# Creation of build
RUN npm run build

# Continue with apache installation optimized for PHP (sites-enabled and sites-available config)
FROM php:apache

# Apache config
RUN a2enmod rewrite
COPY apache.conf /etc/apache2/sites-available/
RUN a2ensite apache
RUN rm -rf /etc/apache2/sites-enabled/000-default.conf

# Copy build in apache directory
COPY --from=builder /app/build/ /var/www/html/

# Expose port
EXPOSE 80

# Launch container
CMD ["apache2-foreground"]