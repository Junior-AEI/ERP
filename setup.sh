#!/bin/bash

cd server 
npm i 
npm run migrate -- up 
npm run seed -- up 

cd ../client 
npm i 