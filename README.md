# Meteor Web API Examples using [fine-rest](https://github.com/aadamsx/fine-rest)

## TOC:

### [Getting started](#getting-started-1)

### [Create Bearer Token](#create-bearer-token-1)
### [Debugging Web API](#debugging-web-api-1)

### [Issues](#issues-1)
### [Outstanding](#outstanding-1)
### [Ideas Sandbox](#ideas-sandbox-1)
### [Change Log](#change-log-1)

.

## Getting started:

#### 1) Open a shell session and get the test app:

```
$ git clone https://github.com/aadamsx/meteor-web-app-test.git
```

Two different projects, one Web API and one the Client to the Web API.


#### 2) Now cd into the web-api-user directory and run npm install:

```
$ cd /web-api-uer
$ meteor npm install --save
```

#### 3) Now cd into the web-api & web-api/fine-rest directories and run npm install:

```
$ cd /web-api
$ meteor npm install --save
$ cd /web-api/fine-rest  
$ meteor npm install --save
```

#### 4) Open two shell sessions and run the npm command below to start:


#### For the Web API:

```
$ cd /web-api
$ npm run web-app-test
```

By default the Web API will run on ```--port 3100```

#### For the Web API Client:

```
$ cd /web-api-user
$ npm run web-app-test
```

By default the Web API client will run on ```--port 3101```

#### 5) To test the Web API is running:

```
curl -X POST \
  http://localhost:3100/test-route \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json'
```

Security checks are NOT implemented for the above route, so you will not have to call out to the API ```/users/login``` first.  For routes under ```/api``` you must first get a valid token. An example is provided under [Create Bearer Token](#create-bearer-token-1).  Options for database are ```database_1``` or ```database_2``` defined in the ```settings.json``` file.


## Create Bearer Token:


In order to check the fine-rest lib will return a Bearer token you must do the following:

#### 1) Stand up a MongoDB local service @ localhost:27017/web-api-2

Note: The default database is simpley ```web-api```, yet when calling a route under ```/api/```, specifically ```/api/test-route2``` you must specify either ```database_1``` corresponding to web-api-1 or ```database_2``` corresponding to web-api-2.

#### 2) Create users in this database with the Meteor [accounts-password](https://docs.meteor.com/api/passwords.html) package.
#### 3) Pass in the username and password from one of these users into the Web API like so:

```
curl -X POST \
  http://localhost:3100/users/login \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d 'email=test@test.com&password=12345'
```

You should get a response:

```
{
    "id": "DGQcL5GdzNv7kC6s8",
    "token": "3WGgilxEz-oRH9U5_ArWhO9tcSr782Yli4IO5xkMR-j",
    "tokenExpires": "2017-10-19T04:10:18.644Z"
}
```

This token is your Bearer token that you have to use for all subsequent Web API calls.
.

## Debugging Web API:

#### 1) Make sure before running this command you have attached debugger; comments where you want to "hook" into your code, for example:

```javascript
JsonRoutes.add('POST', '/test-route/', function(req, res, next) {
  debugger; // => the server will pause for debugging if the 'test-route' is called!
  JsonRoutes.sendResult(res, {
    code: 200,
    data: {
      result: "OK"
    }
  });
});
```

#### 2) To debug the server side Web API you must specify the debug port and start Meteor like so:

```
MONGO_URL=mongodb://localhost:27017/meteor meteor --debug-port 3200 --port 3100 --settings settings.json
```

Note: by default running ```npm web-app-test``` will run with debug turned on.

#### 3) After running this command you must go to the following URL in order to attach to the server process:

```
http://localhost:5422/?port=3200
```

#### 4) Now call the route again with curl and start debugging the server side Web API:

```
curl -X POST \
  http://localhost:3100/api/test-route2 \
  -H 'authorization: Bearer IGLm1hZ_8y87dDnJQXifuS1aQ2aWIXV1lflRXEPOVpI' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d 'userId=H7JEBF5uHaqYK35pG&dbId=database_2'
```

Note: For this route, security is on, this means the ```Bearer token``` must be valid (in the user's collection record), the ```userId``` must be valid (again in the user's collection record) for the ```databaseId``` passed in, either ```database_1``` or ```database_2```.

.

## Issues:

- [x] Could not get middleware to run on exceptions.
- [x] Could not add a code to sendResult() without the requestor (web-api-user project) hanging.
- [ ] Could get not get CORS to work.

.

## Outstanding:

- [ ] Add "Web Hooks" on the client to get response status from long-running service.
- [ ] Engineer the auto retrieval of the Bearer token from the Web API.
- [ ] Engineer the storage of Bearer token in order for client to use the Web API.
  - [ ] localStorage.getItem(...) to store token.
- [ ] Singleton and Concurrency concepts:
  - [ ] Singleton: One connection to a database = one module = one class within that module, must all be unique per HTTP request (cannot have one request, stepping on another, by overwriting the next).
  - [ ] Concurrency: Web App must be able to handle concurrent HTTP requests reading from and writing to a database.
- [x] Middleware that only runs for a particular route.
- [x] Ability to retrieve data from multiple databases.

.

## Ideas Sandbox:

#### Using localStorage to store and for retrieval of token:

```javascript
Tracker.autorun(function() {
  if (Meteor.user()) {
    if (localStorage.getItem('token') {
      // ...
    }
  }
```

.

## Change log:

#### 0.1.1

-  The Meteor Web API now talks to (3) MongoDBs. The first DB named ```web-api``` is the default for the Web API.  The second and third DBs options are stored in the ```settings.json``` file.
-  Added requirement to pass in databaseId.  There are two databases to choose from, web-api-1 and web-api-2.
-  Added imports directory where the People class and Mono collections are defined.
-  Added new ```/api/test-route2```.
-  All security checks are not under the new ```/api``` route.

#### 0.1.0

- Temporarily added [fine-rest](https://github.com/aadamsx/fine-rest) package locally to the web-api project for debugging purposes.

#### 0.0.1 - 0.0.8

- Worked on [Original issues](#original-issues)
