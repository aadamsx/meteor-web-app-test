# Metoer Web API Example Application using [fine-rest](https://github.com/aadamsx/fine-rest)

### Original issues:

- [ ]Could not get middleware to run on exceptions.
- [ ] Could not add a code to sendResult() without the requestor (web-api-user project) hanging.

### New work (might create forks):

- [ ] Engineer the auto retrieval of the Bearer token from the Web API.
- [ ] Engineer the storage of Bearer token in order for client to use the Web API.
- [ ] Singleton and Concurrency concepts:
  - [ ] Singleton: One connection to a database = one module = one class within that module, must all be unique per HTTP request.
  - [ ] Concurrency: Web App must be able to handle concurrent HTTP requests reading from and writing to a database.
