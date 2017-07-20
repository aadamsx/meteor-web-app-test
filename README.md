# Meteor Web API Examples using [fine-rest](https://github.com/aadamsx/fine-rest)

.

## TOC:

- [Original issues](#original-issues)
- [New work](#new-work-might-create-forks)
- [Change Log](#change-log)

.

## Original issues:

- [ ] Could not get middleware to run on exceptions.
- [ ] Could not add a code to sendResult() without the requestor (web-api-user project) hanging.

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
