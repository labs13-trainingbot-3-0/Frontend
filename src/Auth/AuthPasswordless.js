import { Auth0LockPasswordless } from 'auth0-lock';
import { AUTH_CONFIG } from "./auth0-variables";
import history from "history.js";
import logo from "../img/training-bot.png";

var options = {
  passwordlessMethod: "link", // Sets Lock to use magic link
  auth: {
    redirectUrl: process.env.REACT_APP_HOST + "team-member",
    responseType: 'token id_token'
  },
  theme: {
    logo: logo,
    primaryColor: '#451476',
  },
  languageDictionary: {
    title: "Training Bot"
  },
};

export const lock = new Auth0LockPasswordless(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, options);

export const logout = () => {
  localStorage.clear()
  history.push("/");
};