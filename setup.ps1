# Back setup
Set-Location .\server
npm install
Copy-Item .env.example .env

Set-Location ..\serverBot
npm install

Set-Location ..\serverMail
npm install

# Front setup
Set-Location ..\app
npm install
Copy-Item .env.example .env