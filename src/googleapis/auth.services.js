import { google } from "googleapis";
const googleConfig = {
  clientId:
    "821757378934-tnne7b30u5l21v40s2fp3gnjargirkt8.apps.googleusercontent.com", // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
  clientSecret: "JoRmGreOLbcSTbrvFC5OY8m2", // e.g. _ASDFA%DFASDFASDFASD#FAD-
  redirect: "	https://localhost:3000/console/cart"
};

function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

const defaultScope = [
  "https://www.googleapis.com/auth/plus.me",
  "https://www.googleapis.com/auth/userinfo.email"
];
function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent", // access type and approval prompt will force a new refresh token to be made each time signs in
    scope: defaultScope
  });
}

/**
 * Create the google url to be sent to the client.
 */
export function urlGoogle() {
  const auth = createConnection(); // this is from previous step
  const url = getConnectionUrl(auth);
  return url;
}
function getGooglePlusApi(auth) {
  return google.plus({ version: "v1", auth });
}

/**
 * Extract the email and id of the google account from the "code" parameter.
 */
export async function getGoogleAccountFromCode(code) {
  // get the auth "tokens" from the request
  const data = await auth.getToken(code);
  const tokens = data.tokens;

  // add the tokens to the google api so we have access to the account
  const auth = createConnection();
  auth.setCredentials(tokens);

  // connect to google plus - need this to get the user's email
  const plus = getGooglePlusApi(auth);
  const me = await plus.people.get({ userId: "me" });

  // get the google id and email
  const userGoogleId = me.data.id;
  const userGoogleEmail =
    me.data.emails && me.data.emails.length && me.data.emails[0].value;

  // return so we can login or sign up the user
  return {
    id: userGoogleId,
    email: userGoogleEmail,
    tokens: tokens // you can save these to the user if you ever want to get their details without making them log in again
  };
}
