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

```bash
$ git clone https://github.com/aadamsx/meteor-web-app-test.git
```

Two different projects, one Web API and one the Client to the Web API.


#### 2) Now cd into the web-api-user directory and run npm install:

```bash
$ cd /web-api-uer
$ meteor npm install --save
```

#### 3) Now cd into the web-api & web-api/fine-rest directories and run npm install:

```bash
$ cd /web-api
$ meteor npm install --save
$ cd /web-api/fine-rest  
$ meteor npm install --save
```

#### 4) Open two shell sessions and run the npm command below to start:


#### For the Web API:

```bash
$ cd /web-api
$ npm run web-app-test
```

By default the Web API will run on ```--port 4500```

#### For the Web API Client:

```bash
$ cd /web-api-user
$ npm run web-app-test
```

By default the Web API client will run on ```--port 3101```

#### 5) To test the Web API is running:

```bash
curl -X POST \
  http://localhost:4500/test-route \
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

```bash
curl -X POST \
  http://localhost:4500/users/login \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d 'email=test@test.com&password=12345'
```

A NEW option is to log in with a temp token:

```bash
curl -X POST \
  http://localhost:4500/users/token-login \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d 'dbId=database_1&loginToken=123'

```
For this option only the temporary login token is required, the databaseId is optional and requires a database URL in the settings.json file (please see the code for more details).


You should get a response:

```bash
{
    "id": "456",
    "token": "123",
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

```bash
curl -X POST \
  http://localhost:3100/api/test-route2 \
  -H 'authorization: Bearer 123' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d 'userId=456&dbId=database_2'
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
- [x] Engineer the storage of Bearer token in order for client to use the Web API.
  - [x] MongoDB storage of Bearer token.
- [ ] Singleton and Concurrency concepts:
  - [ ] Singleton: One connection to a database = one module = one class within that module, must all be unique per HTTP request (cannot have one request, stepping on another, by overwriting the next).
  - [ ] Concurrency: Web App must be able to handle concurrent HTTP requests reading from and writing to a database.
- [x] Middleware that only runs for a particular route.
- [x] Ability to retrieve data from multiple databases.
- [x] Added login token ability (instead of user name and password)
- [ ] Add rate limiter to avoid request overload.
- [ ] React Native client to Web API?
- [ ] Logging in middleware for all requests.

.

## Ideas Sandbox:

#### Using localStorage to store and for retrieval of token:

```javascript
localStorage.getItem('token');
```



#### Looking at Web Hooks:

- We could send an immediate response to the user with the URL to the file and set a flag inside the "shared" database with the status of the operation.
- But the issue is we'd still have to periodically check the status.  I think Web Hooks on the Web API allow you to get alerted when the status changes?

- I think as it stands, the code is synchronous and thus does not require me to use webhooks?


.

## Change log:

#### 0.2.0

- fine-rest in this example has been updated with the option to log in with a token.  The new route is named ```/users/token-login``` and has the option to pass in a database ID for multi-database use.  I will update the NPM version of fine-rest to reflect this changes at some point soon.
- The example ```web-api-user``` client application now checks for a Bearer token server side inside a MongoDB collection named ```Globals``` -- if its there it uses it for Web API calls, if not it goes and gets a new one from the Web API.


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
