# Requirements

```
node >= 14.0.0
docker
docker-compose
```

# Launch infrastructure

## Automaticaly

A docker environment allows us to launch the whole infrastructure automatically. To do this, make sure ```docker``` and ```docker-compose``` are installed on your machine.

- Then, create your ```.env``` at the root of the project, from the ```.env.example``` file. Make sure the variables ```NODE_PORT```, ```DB_PORT``` and ```VITE_APP_PORT``` are available ports on your machine, because if it is not the installation will fail. Pay attention of ```VITE_API_URL```, it has to be coherent with the specified port for API.

- The docker daemon will copy your .env at the root to create child .env in ```server/``` and ```app/```. No need to touch these files !

- The ```NODE_ENV``` variable is important : It's determine your environment, test or production. In test mode, the database will be stored in a single file. In production mode, a container with MySQL Server and Client will be mounted and the data will be stored in a independant volume.

- Finally, go to the root of the project and simply launch the following command :

```
sudo docker-compose up -d --build
```

This command will create the infrastructure and force your machine to re-build dependancies in case of changes. IF THE COMMAND DOES NOT WORK, TRY TO LAUNCH IT WITHOUT ROOT USER PRIVILEGES.

For now, even if the infra is launched in production mode, a single user is created :
```
Username: John.Doe
Password : mdp
```

You can now go to the application (localhost with specified port).

## Manually

TO BE WRITTEN