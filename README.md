# Meteor Web API Examples using [fine-rest](https://github.com/aadamsx/fine-rest)

.

## TOC:

- [Getting started](#getting-started)
- [Original issues](#original-issues)
- [New work](#new-work-might-create-forks)
- [Change Log](#change-log)

.

## Getting started:

#### 1) Open a shell session and type: $ git clone https://github.com/aadamsx/meteor-web-app-test.git

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

#### 4) Finally open two shell sessions and run the npm command below to start:


#### For the Web API:

```
$ cd /web-api
$ npm run web-app-test
```

By default the Web API will run on --port 3100

#### For the Web API Client:

```
$ cd /web-api-user
$ npm run web-app-test
```

By default the Web API client will run on --port 3101

.

## Original issues:

- [x] Could not get middleware to run on exceptions.
- [x] Could not add a code to sendResult() without the requestor (web-api-user project) hanging.

.

## New work (might create forks):

- [ ] Engineer the auto retrieval of the Bearer token from the Web API.
- [ ] Engineer the storage of Bearer token in order for client to use the Web API.
- [ ] Singleton and Concurrency concepts:
  - [ ] Singleton: One connection to a database = one module = one class within that module, must all be unique per HTTP request (cannot have one request, stepping on another, by overwriting the next).
  - [ ] Concurrency: Web App must be able to handle concurrent HTTP requests reading from and writing to a database.


.

## Change log:

#### 0.1.0

- Temporarily added [fine-rest](https://github.com/aadamsx/fine-rest) package locally to the web-api project for debugging purposes.

#### 0.0.1 - 0.0.8

- Worked on [Original issues](#original-issues)
