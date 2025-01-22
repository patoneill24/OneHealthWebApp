# OneHealthWebApp
One Heatlh Web Application

# Project set up
navigate to the client dircetory and run the following command to install the dependencies
```
npm install
```
to the same with the server directory

# Running the project

To run the project, navigate to the client directory and run the following command
```
npm run dev
```

To run the server with nodemon, navigate to the server directory and run the following command
```
npm run dev
```

To run the server with node, navigate to the server directory and run the following command
```
npm start
```

## Docker set up 

Run the following command to build the docker images and run the containers. There's a 
container for the client, server and postgres database. 
```
docker compose up --build
```

I couldn't get volumes to work for the server and client containers. So, you'll need to rebuild the images if you make changes to the server or client code.

To stop the containers, run the following command
```
docker compose down
```
You'll need to create .env file in the root directory and in the server directory to specify the following environment variables to interact with the database. 
```
POSTGRES_USER = ${USERNAME}
POSTGRES_PASSWORD = ${PASSWORD}

```

In the server directory, along with variables meantioned above, you need to define the following environment variables: 

```
DEV_PORT = 4004
```

If you want to use a different port, you'll have to change which port you're exposing in your docker file along with the port mapping argument in the docker-compose.yaml file. 
