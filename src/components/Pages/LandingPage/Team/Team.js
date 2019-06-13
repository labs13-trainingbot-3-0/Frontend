import React from "react";
import { ArrowUpward } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithubSquare } from "@fortawesome/free-brands-svg-icons";

import Logo from "img/training-bot.png";
// import AJ from "img/AJ.png";
// import Gannon from "img/Gannon.png";
// import Nick from "img/Nick.png";
// import Adam from "img/Adam.png";
// import Tom from "img/Tom.png";
import ben from "img/ben.png";
import divya from "img/divya.jpeg";
import joe from "img/joe.jpeg";
import tom from "img/tom.jpeg";

import { animateScroll as scroll } from "react-scroll";

//Auth
import { lock } from "Auth/AuthPasswordless";

import {
  styles,
  LandingPageContainer,
  NavbarContainer,
  NavbarItemsContainer,
  NavbarItem,
  TeamContainer,
  TeamInfoContainer,
  TeamMember,
  TeamMemberLinks,
  ContactContainer,
  FooterContainer,
  FooterItemsContainer,
  PortfolioLink
} from "./styles.js";

class Team extends React.Component {
  scrollToTop() {
    scroll.scrollToTop();
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <LandingPageContainer>
          {/* NAVIGATION */}
          <NavbarContainer>
            <Link to="/">
              <img src={Logo} alt="A cute, personable robot" />
            </Link>
            <NavbarItemsContainer>
              <NavbarItem href="/team">Team</NavbarItem>
              <NavbarItem href="/pricing">Pricing</NavbarItem>
              <h2 onClick={() => lock.show()}>Sign In</h2>
            </NavbarItemsContainer>
          </NavbarContainer>
          <TeamContainer>
            <Typography variant="h3">The Team</Typography>
            <TeamInfoContainer>
              <TeamMember>
                <img src={ben} alt="Ben Chandler" />
                <Typography variant="title">Ben Chandler</Typography>
                <p>Full-Stack Developer</p>
                <PortfolioLink
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/chandlerben"
                >
                  Portfolio Site
                </PortfolioLink>

                <TeamMemberLinks>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/chandlerben"
                  >
                    <FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/chandlerben/"
                  >
                    <FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
                  </a>
                </TeamMemberLinks>
              </TeamMember>
              <TeamMember>
                <img src={divya} alt="Divya Nair" />
                <Typography variant="title">Divya Nair</Typography>
                <p>Full-Stack Developer</p>
                <PortfolioLink
                  target="_blank"
                  rel="noopener noreferrer"
                  href="_blank"
                >
                  Portfolio Site
                </PortfolioLink>

                <TeamMemberLinks>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/dsnair"
                  >
                    <FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="_blank"
                  >
                    <FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
                  </a>
                </TeamMemberLinks>
              </TeamMember>
              <TeamMember>
                <img src={joe} alt="Joe Bugajski" />
                <Typography variant="title">Joe Bugajski</Typography>
                <p>Full-Stack Developer</p>
                <PortfolioLink
                  target="_blank"
                  rel="noopener noreferrer"
                  href="_blank"
                >
                  Portfolio Site
                </PortfolioLink>

                <TeamMemberLinks>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/JoeBugajski"
                  >
                    <FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="_blank"
                  >
                    <FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
                  </a>
                </TeamMemberLinks>
              </TeamMember>
              <TeamMember>
                <img src={tom} alt="Thomas Folbrecht" />
                <Typography variant="title">Thomas Folbrecht</Typography>
                <p>Full-Stack Developer</p>
                <PortfolioLink
                  target="_blank"
                  rel="noopener noreferrer"
                  href="_blank"
                >
                  Portfolio Site
                </PortfolioLink>

                <TeamMemberLinks>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/tfolbrecht"
                  >
                    <FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/tfolbrecht/"
                  >
                    <FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
                  </a>
                </TeamMemberLinks>
              </TeamMember>
            </TeamInfoContainer>
          </TeamContainer>
          <ContactContainer>
            <Typography variant="h3">Contact Us</Typography>
            <form
              action="/success"
              className={classes.form}
              name="contact"
              method="POST"
            >
              <input type="hidden" name="form-name" value="contact" />
              <TextField
                label="Name"
                className={classes.textField}
                margin="normal"
                name="contact-name"
                required
              />
              <TextField
                label="Email"
                className={classes.textField}
                margin="normal"
                name="contact-email"
                required
              />
              <TextField
                label="Message"
                className={classes.textField}
                margin="normal"
                name="contact-message"
                multiline
                rows="8"
                placeholder="Type your message here"
                variant="outlined"
                required
              />
              <Button
                className={classes.button}
                type="submit"
                variant="outlined"
              >
                Send
              </Button>
            </form>
          </ContactContainer>
          <FooterContainer>
            <FooterItemsContainer>
              <a href="/team">Team</a>
              <a href="/pricing">Pricing</a>
            </FooterItemsContainer>
            <ArrowUpward onClick={() => this.scrollToTop()} />
          </FooterContainer>
        </LandingPageContainer>
      </>
    );
  }
}

export default withStyles(styles)(Team);
