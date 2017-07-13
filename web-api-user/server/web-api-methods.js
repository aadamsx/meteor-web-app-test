import { HTTP } from 'meteor/http';

Meteor.methods({
  async test() {
    console.log('server side method call to Web API')
    let result = null;
    const token = '123';
    const userId = '123';
    const url = 'http://localhost:3100/test-route';
    try {
      result = await HTTP.call('POST', url,
        {
          data: { userId: userId },
          headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': `Bearer ${token}`, 'cache-control': 'no-cache' }
        }
      );
      console.log(`server side method call, result: ${JSON.stringify(result)}`);
      return result;
    }
    catch (error) {
      throw new Meteor.Error(error);
    }
    finally {
      // do something, finally
    }
  }
});
