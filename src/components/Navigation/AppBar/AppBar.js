import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import HelpOutline from "@material-ui/icons/HelpOutline";

//Styling
import {
  NavigationContainer,
  NavItemsContainer,
  NavLinkItems,
  NavigationLogo,
  RightItemsContainer,
  LogoutStyling
} from "./styles.js";
import Avatar from "@material-ui/core/Avatar";

//Logo
import Logo from "img/training-bot.png";

//AUTH
import { lock, logout } from "../../../Auth/AuthPasswordless";

class AppBar extends Component {
  render() {
    return (
      <NavigationContainer>
        <NavItemsContainer>
          {this.props.history.location.pathname === "/" ? (
            <>
              <NavigationLogo alt="A cute, personable robot" src={Logo}>
                Link
              </NavigationLogo>
              <NavLinkItems>
                <Link to="/home">Dashboard</Link>
                <Link to="/pricing">Pricing</Link>
              </NavLinkItems>
              <p onClick={() => lock.show()}>Login</p>
            </>
          ) : (
            <>
              <Link to="/home">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <NavigationLogo alt="A cute, personable robot" src={Logo} />
                  <HelpOutline
                    onClick={e => {
                      e.preventDefault();
                      this.props.history.push("/home/help");
                    }}
                    style={{
                      color: "black",
                      marginLeft: "4px",
                      marginTop: "3px",
                      width: "20px",
                      height: "20px"
                    }}
                  />
                </div>
              </Link>
              <RightItemsContainer>
                <Link to="/home/profile">
                  <Avatar
                    data-tour="6"
                    src={JSON.parse(localStorage.getItem("Profile")).picture}
                    alt={JSON.parse(localStorage.getItem("Profile")).name}
                  />
                </Link>
                <LogoutStyling onClick={() => logout()}>Logout</LogoutStyling>
              </RightItemsContainer>
            </>
          )}
        </NavItemsContainer>
      </NavigationContainer>
    );
  }
}

export default withRouter(AppBar);
