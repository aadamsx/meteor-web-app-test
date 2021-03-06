import { HTTP } from 'meteor/http';

// const globals = new Mongo.Collection('Globals');

Meteor.methods({
  async testAsync() {
    console.log('server side method call to Web API')
    let result = null;
    const token = '123';
    const userId = '123';
    const url = 'http://localhost:3100/test-route';
    try {
      result = await HTTP.call('POST', url,
        {
          data: { userId: userId },
          headers: { 'content-type': 'application/json', 'authorization': `Bearer ${token}`, 'cache-control': 'no-cache' }
        }
      );
      console.log(`server side method call, statusCode on response: ${result.statusCode}`);
      console.log(`server side method call, result on response: ${JSON.stringify(result.data)}`);

      return result;
    }
    catch (error) {
      console.log(`server side method call exception thrown statusCode on response: ${error.response.statusCode}`);
      console.log(`server side method call exception thrown result on response response: ${error.response.data.result}`);
      console.log(`server side method call exception thrown full result: ${JSON.stringify(error.response)}`);

      throw new Meteor.Error(error.response.statusCode, error.response.data.result);
    }
    finally {
      // do something, finally
    }
  },

  testSync() {
    console.log('server side method call to Web API')
    const tokenRecord = globals.findOne({ type: 'WEB_API_TOKEN' });
    let result = null;
    const token = tokenRecord && tokenRecord.token || null;
    const userId = 'H7JEBF5uHaqYK35pG';
    const url = 'http://localhost:4500/api/test-route2';
    try {
      result = HTTP.call('POST', url,
        {
          data: { userId: userId },
          headers: { 'content-type': 'application/json', 'authorization': `Bearer ${token}`, 'cache-control': 'no-cache' }
        }
      );
      console.log(`server side method call, statusCode on response: ${result.statusCode}`);
      console.log(`server side method call, result on response: ${JSON.stringify(result.data)}`);

      return result;
    }
    catch (error) {
      console.log(`server side method call exception thrown statusCode on response: ${error.response.statusCode}`);
      console.log(`server side method call exception thrown result on response response: ${error.response.data.result}`);
      console.log(`server side method call exception thrown full result: ${JSON.stringify(error.response)}`);

      throw new Meteor.Error(error.response.statusCode, error.response.data.result);
    }
    finally {
      // do something, finally
    }
  }
});
