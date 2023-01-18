# Requirements
```
node >= 14.0.0
```

# Installation
```bash
cd client
npm install
cd ../server
npm install
```
## Set up mysql for dev env
```bash
sudo mysql
CREATE USER erp_dev IDENTIFIED BY 'password';
CREATE DATABASE erp_dev;
GRANT ALL PRIVILEGES ON erp_dev.* TO 'erp_dev'@'localhost' IDENTIFIED BY 'password';
exit
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```
# Running
```bash
cd client
npm run dev
```

```bash
cd server
npm run dev
```