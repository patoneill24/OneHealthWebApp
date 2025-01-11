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
