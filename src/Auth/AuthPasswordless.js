import { Auth0LockPasswordless } from 'auth0-lock';
import { AUTH_CONFIG } from "./auth0-variables";
import history from "history.js";

export const lock = new Auth0LockPasswordless(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
  passwordlessMethod: "link", // Sets Lock to use magic link
  auth: {
    redirectUrl: `http://localhost:3000/team-member`,
    responseType: 'token id_token'
  }
});

export const logout = () => {
  localStorage.clear()
  history.push("/");
};