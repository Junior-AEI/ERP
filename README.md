# Requirements

```
node >= 14.0.0
```

# Installation

```bash
./setup.sh
```

# Dev run

## For the server
```bash
cd server
npm run dev
```

## For the client
```bash
cd client
npm run dev
```

# Launch server tests

To launch server tests, you just have to go to launch the following command :

```bash
cd server
npm run test
```
# Deploy

Check your environment variables in these two files :
```
server/.env
app/.env
```
> Note : You must put your ENV variable to PROD if you want to deploy the app

If everything is correct, just launch the following command on the host machine :
```
sudo docker-compose up -d
```