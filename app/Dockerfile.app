# Start from NodeJS image
FROM node:14 as builder

# Workdir definition in container
WORKDIR /app

# Dependancies
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install

# App files
COPY public /app/public
COPY src /app/src
COPY .env /app/.env

# Config files
COPY components.json /app/components.json
COPY env.d.ts /app/env.d.ts
COPY index.html /app/index.html
COPY postcss.config.js /app/postcss.config.js
COPY tailwind.config.js /app/tailwind.config.js
COPY tsconfig.app.json /app/tsconfig.app.json
COPY tsconfig.json /app/tsconfig.json
COPY tsconfig.node.json /app/tsconfig.node.json
COPY tsconfig.vitest.json /app/tsconfig.vitest.json
COPY vite.config.ts /app/vitest.config.ts

# Creation of build
RUN cd /app && npm run build

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