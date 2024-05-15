# Status
[![Build infrastructure with .env.test](https://github.com/Junior-AEI/ERP/actions/workflows/docker.yaml/badge.svg)](https://github.com/Junior-AEI/ERP/actions/workflows/docker.yaml)
[![Execute API tests with .env.test](https://github.com/Junior-AEI/ERP/actions/workflows/tests.yaml/badge.svg)](https://github.com/Junior-AEI/ERP/actions/workflows/tests.yaml)

# Requirements

```
node >= 14.0.0
docker
docker-compose
```

# Launch infrastructure

## Automaticaly

A docker environment allows us to launch the whole infrastructure automatically. To do this, make sure ```docker``` and ```docker-compose``` are installed on your machine.

- Then, create your ```.env``` at the root of the project, from the ```.env.example``` file. Make sure the variables ```NODE_PORT```, ```DB_PORT```, ```MAIL_PORT```, ```BOT_PORT``` and ```VITE_APP_PORT``` are available ports on your machine, because if it is not the installation will fail. Pay attention of ```VITE_API_URL```, it is the URL of API that will be called by the front, so has to be coherent with the specified running port for API.

- The docker daemon will copy your .env at the root to create child .env in ```server/```, ```serverMail/```, ```serverBot``` and ```app/```. No need to touch these files !

- The ```NODE_ENV``` variable is important : It's determine your environment, test or production. In test mode, the database will be stored in a single file. In production mode, a container with MySQL Server and Client will be mounted and the data will be stored in a independant volume.

- Finally, go to the root of the project and simply launch the following command :

```
sudo ./deploy.sh
```

This command will create the infrastructure and force your machine to re-build dependancies in case of changes. IF THE COMMAND DOES NOT WORK, TRY TO LAUNCH IT WITHOUT ROOT USER PRIVILEGES.

For now, even if the infra is launched in production mode, a single user is created :
```
Username: john.doe
Password : mdp
```

You can now go to the application (localhost with specified port).

## Manually

You can manually launch the different services by installing the dependancies and launch the servers. This option is not the best if you want to launch the services for production.