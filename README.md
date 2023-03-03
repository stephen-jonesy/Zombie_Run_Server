# ZombieRun API

## Available at - https://zombie-run.onrender.com/api

## Summary
A RESTful API written in Javascript providing user data. The project uses the ExpressJS framework, Mongoose and MongoDB for the database. The api is hosted on Render.

## Minimum Version

This API was built using Node.js version 19.1.0

## Set-up

### Clone

Please clone the API project inside of your chosen directory using the command below.
```
$ git clone https://github.com/numberwang55/Zombie_Run_Server.git
```
### Dependencies

In order to install the required dependencies please run:
```
$ npm i
```
Below are the dependencies for this project.

##### Development Dependencies 

|        `Package`       | `Version` |     
| -----------------------|-----------|     
| cross-env              |  7.0.3    |    
| jest                   |  29.4.3   |    
| jmongodb-memory-server |  8.11.5   |    
| nodemon                |  2.0.20   |
| supertest              |  6.3.3    |

##### Production Dependencies

|     `Package`   | `Version` |
| ----------------|---------- |
|  bcrypt         |  5.1.0    |
|  body-parser    |  1.19.0   |
|  dotenv         |  16.0.3   |
|  express        |  4.17.1   |
|  jsonwebtoken   |  8.5.1    |
|  mongoose       |  6.9.2    |
|  passport       |  0.6.0    |
|  passport-jwt   |  4.0.0    |
|  passport-local |  1.0.0    |

### Testing

To run the integration tests please use this command:
```
$ npm t index.test.js
```
