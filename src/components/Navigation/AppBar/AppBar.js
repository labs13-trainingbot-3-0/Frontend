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

import introJs from "intro.js";
import "intro.js/introjs.css";

import "./appBar.css";

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
              <Link onClick="window.location.reload();">
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
                  <button
                    variant="contained"
                    className={
                      window.location.pathname === "/home"
                        ? "hiddenButton"
                        : "tutorialButton"
                    }
                    onClick={e => {
                      e.preventDefault();
                      startIntro();
                    }}
                  >
                    Show Tutorial
                  </button>
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

function startIntro() {
  var intro = introJs();
  intro.setOptions({
    steps: [
      {
        intro:
          "Welcome to your Training Bot Dashboard!  This tutorial will walk you through the basics of where and how your training materials are stored."
      },
      {
        element: "#data-step-1",
        intro: `"View Training Topics" organizes your training materials by the Training Series that they are a part of.`,
        position: "left"
      },
      {
        element: "#data-step-2",
        intro:
          "Clicking a Training Topic will pull up a modal with a list of the trainings you've received for that specific series."
      },
      {
        element: "#data-step-3",
        intro: `"View Training Messages" lists ALL training messages you've received ordered chronologically.   
        Try Clicking It Now`,
        position: "right"
      },
      {
        element: "#data-step-4",
        intro:
          "Clicking a Training Message will show the replies you have sent to the messages you've received, as well as any responses your Team Leader has given.",
        tooltipPosition: "bottom-middle-aligned,"

        },
      {
        intro: 
              "We're thrilled to have you as a part of Training Bot. Take a poke around, and please don't hesitate to contact us if you have any questions or concerns!"
            
        
      }
      // {
      //   element: '#step5',
      //   intro: 'Get it, use it.'
      // }
    ]
  });
  intro.start();
}

export default withRouter(AppBar);
