// HOC for client-side authorization, protecting routes that require authentication
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "img/training-bot.svg";
import "components/UI/Progress/loading.css";

//Styling
import {
  LoginContainer,
  LoginContent,
  NavbarContainer,
  NavbarItemsContainer,
  NavbarItem,
  LogoImage,
  StyledButton,
  StyledLink,
  ButtonContainer
} from "./styles.js";
import Logo from "img/training-bot.png";

//Authentication
import { lock } from "Auth/AuthPasswordless";

//axios defaults and interceptors.
axios.defaults.baseURL = `${process.env.REACT_APP_API}`;
axios.interceptors.request.use(
  function(options) {
    options.headers.authorization = localStorage.getItem("id_token");
    return options;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default function(Component) {
  return class Authenticate extends React.Component {
    render() {
      const token = localStorage.getItem("id_token");

      const notLoggedIn = (
        <>
          {/* NAVIGATION */}
          <NavbarContainer>
            <Link to="/">
              <img src={Logo} alt="A cute, personable robot" />
            </Link>
            <NavbarItemsContainer>
              <NavbarItem>Team</NavbarItem>
              <NavbarItem to="/pricing">Pricing</NavbarItem>
              <NavbarItem>Blog</NavbarItem>
              <h2 onClick={() => lock.show()}>Sign In</h2>
            </NavbarItemsContainer>
          </NavbarContainer>

          <LoginContainer>
            <LoginContent>
              <LogoImage src={logo} alt="loading" className="ld ld-bounce" />
              <p>Please login to view this page or return Home.</p>
              <ButtonContainer>
                <StyledButton variant="contained" onClick={() => lock.show()}>
                  Login
                </StyledButton>
                <StyledLink to="/">
                  <StyledButton variant="outlined">Home</StyledButton>
                </StyledLink>
              </ButtonContainer>
            </LoginContent>
          </LoginContainer>
        </>
      );
      return <>{token ? <Component {...this.props} /> : notLoggedIn}</>;
    }
  };
}
