//Libraries
import auth0 from "auth0-js";
// import { Auth0Lock } from 'auth0-lock';
import { Auth0LockPasswordless } from "auth0-lock";
import decode from "jwt-decode";

//History
import history from "history.js";

//Token Variables
const ID_TOKEN_KEY = "id_token";
const ACCESS_TOKEN_KEY = "access_token";

//Config variables
const auth = new auth0.WebAuth({
  clientID: process.env.REACT_APP_AUTH0_CLIENTID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  callbackUrl: process.env.REACT_APP_PROD
});

//Logs user in
export const loginbounce = () => {
  auth.authorize({
    responseType: "token id_token",
    redirectUri: auth.callbackUrl,
    scope: "openid email profile"
  });
};

// login modal with lock
// var lock = new Auth0LockPasswordless(
//   process.env.REACT_APP_AUTH0_CLIENTID,
//   process.env.REACT_APP_AUTH0_DOMAIN
// );

//Logs user in
export const login = () => {
  auth.authorize({
    responseType: "token id_token",
    redirectUri: process.env.REACT_APP_PROD,
    scope: "openid email profile"
  });
};

export const nopass = () => {
  var lock = new Auth0LockPasswordless(
    process.env.REACT_APP_AUTH0_CLIENTID,
    process.env.REACT_APP_AUTH0_DOMAIN,
    {
      passwordlessMethod: "link",
      responseType: "token id_token",
      auth: {
        redirectUrl: process.env.REACT_APP_PROD, // If not specified, defaults to the current page
        params: {
          scope: "openid email profile" // Learn about scopes: https://auth0.com/docs/scopes
        }
      }
    }
  );
  lock.show({
    allowedConnections: ["email"],
    passwordlessMethod: "link"
  });
};

//Logs the user out and clears local storage
export const logout = () => {
  clearIdToken();
  clearAccessToken();
  clearUserProfile();
  history.push("/");
};

//use this function on components that require authentication.
export const requiresAuth = (nextState, replace) => {
  if (!isLoggedIn()) {
    replace({ pathname: "/" });
  }
};

//----ID TOKEN FUNCTIONS----
//Gets id token
export const getIdToken = () => localStorage.getItem(ID_TOKEN_KEY);
//Sets the id token
export const setIdToken = () => {
  let idToken = getParameterByName("id_token");
  localStorage.setItem(ID_TOKEN_KEY, idToken);
};
//Clears id token
export const clearIdToken = () => localStorage.removeItem(ID_TOKEN_KEY);

//----ACCESS TOKEN FUNCTIONS----
//Gets access token
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
//Get and store access token into local storage
export const setAccessToken = () => {
  let accessToken = getParameterByName("access_token");
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};
//Clears access token
export const clearAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);

export const isLoggedIn = () => {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
};

//gets the users profile
export const getUserProfile = cb => {
  auth.client.userInfo(getAccessToken(), (err, profile) => {
    if (profile) {
      let setProfileToString = JSON.stringify(profile);
      localStorage.setItem("Profile", setProfileToString);
    }
    cb(err, profile);
  });
};

const clearUserProfile = () => localStorage.removeItem("Profile");

//----HELPER FUNCTIONS----

//Help function that extracts the id token and access token
function getParameterByName(name) {
  let match = RegExp("[#&]" + name + "=([^&]*)").exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
