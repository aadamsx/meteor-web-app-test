import moment from 'moment';
import { Random } from 'meteor/random';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';

const getBearerTokenWithLoginToken = loginToken => {
  console.log(`getBearerTokenWithLoginToken called`);
  console.log(`loginToken: ${loginToken}, databaseId: ${Meteor.settings.databaseId}`)
  let result = null;
  try {
    result = HTTP.call('POST', 'http://localhost:4500/users/token-login',
      {
        data: { dbId: Meteor.settings.databaseId, loginToken: loginToken }, // NOTE: This will search over the entire users collection to find the token, no need to pass in the userId
        headers: { 'content-type': 'application/json', 'cache-control': 'no-cache' }
      }
    );
    console.log(`server side method call, statusCode on response: ${result.statusCode}`);
    // console.log(`server side method call, result on response: ${JSON.stringify(result.data)}`);
    debugger;
    return result;
  }
  catch (error) {
    // console.log(`server side method call exception thrown statusCode on response: ${error.response.statusCode}`);
    // console.log(`server side method call exception thrown result on response response: ${error.response.data.result}`);
    // console.log(`server side method call exception thrown full result: ${JSON.stringify(error.response)}`);
    debugger;
    console.log(error);
  }
  finally {
    // do something, finally
  }
}

const ServerState = new Mongo.Collection('ServerState');

Accounts.onLogin(user => {
  const userId = user && user.user && user.user._id || '';
	console.log(`Accounts.onLogin on server is called, userId: ${userId}`);
  const tokenRecord = ServerState.findOne({ type: 'WEB_API_TOKEN', userId: userId }); // NOTE: Each user has his own Bearer token
  const token = tokenRecord && tokenRecord.token || null; // Bearer token
  const tokenExpires = tokenRecord && tokenRecord.tokenExpires || null; // Bearer token expire date
  let getNewBearerToken = false;

  // => check to see if this user already has a [Bearer] token stored...
  if (token) { // => if the object exists in MongoDB storage, check the timestamp to see if we are still within valid range...
    debugger;
    const result = moment(new Date()).diff(tokenExpires, 'minutes');
    console.log(`check if we are within the timestamp window, proceed with using the existing [Bearer] token from MongoDB storage and do NOTHING more here.`);
    // => if we are outside of the timestamp window, get a new [login] token from the Web API.
    if (result > 0) {
      console.log(`out of window, get new token.`);
      getNewBearerToken = true;
    }
    // else {} // => proceed with using the existing [Bearer] token found in the MongoDB ServerState collection and do NOTHING more here.
  }
  else getNewBearerToken = true; // => if not send a new temporary, one-time [login] token to the Web API.


  if (getNewBearerToken) {
    const loginToken = Random.secret();
    console.log(`Set [login] token on logged in account with userId: ${userId}`);
    Meteor.users.update({ _id: userId }, { $set: { 'services.login.token': loginToken } });
    console.log(`POST to the Web API endpoint with your new [login] token`);
    debugger;
    const response = getBearerTokenWithLoginToken(loginToken);
    debugger;
    console.log(`results should contain a [Bearer] token AND a timestamp, save these two values to MongoDB storage somewhere.`);
    ServerState.update({ type: 'WEB_API_TOKEN' }, { type: 'WEB_API_TOKEN', userId: userId, token: response.data.token, tokenExpires: response.data.tokenExpires }, { upsert: true, multi: false }); // => tokenExpires: ISO encoded date string
    // => console.log(`all subsequent calls to the Web API should use the [Bearer] token stored in localStorage.`);
  }
});
