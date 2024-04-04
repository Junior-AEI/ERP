#!/bin/bash

# Back setup
cd server 
npm i 
npm run migrate -- up 
npm run seed -- up 
cp .env.example .env

cd ../serverBot
npm i

cd ../serverMail
npm i

# Front setup
cd ../app 
npm i 
cp .env.example .env