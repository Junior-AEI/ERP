# Start from NodeJS image
FROM node:latest

# PM2 Demonizer installation
RUN npm install -g pm2

# Workdir definition
WORKDIR /var/www

# Various files (TODO : Determine if these files has to be build)
COPY .sequelizerc /var/www/.sequelizerc
COPY nodemon.json /var/www/nodemon.json
COPY tsconfig.json /var/www/tsconfig.json

# Dependancies
COPY package.json /var/www/package.json
COPY package-lock.json /var/www/package-lock.js
RUN npm install

# Copy the rest of files
# TODO database folder ?
COPY src /var/www/src

# Build app
RUN tsc

# Permission
RUN chown -R node:node /var/www
RUN chmod -R u=rwx,g=,o= /var/www

# Open port
EXPOSE 3000

# Start app
CMD ["pm2", "start", "dist/index.js", "--no-daemon"]