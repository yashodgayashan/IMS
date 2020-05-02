## Setup Guide

### Frontend

The frontend is developed using angular and you can find more resources from [here](https://angular.io/).
To install all the required dependenices and modules run,

```
npm install
```

### Backend

The backend of this application is developed using node and you can find more resources from [here](https://nodejs.org/en/docs/).

- Initilise the node project

```sh
npm init

// To avoid question flags such as name:ims
npm init -yes
```

- Install required dependencies

```sh
// Express framework.
npm install express –save

// MySQL module
npm install mysql –save

// Nodemon to auto update the server and restart
npm install --save-dev nodemon

// Other dependencies
npm install body-parser
```

- Run the backend

```sh
node index.js
```

### Database configurations

You have to add following credentials to the config file and create databases if not exists.

```sh
    HOST: "localhost",
    USER: "root",
    PASSWORD: "test@123",
    DB: "testDB"
```
