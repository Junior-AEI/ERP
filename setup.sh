#!/bin/bash

# Back setup
cd server 
npm i 
cp .env.example .env

cd ../serverBot
npm i

cd ../serverMail
npm i

# Front setup
cd ../app 
npm i 
cp .env.example .env