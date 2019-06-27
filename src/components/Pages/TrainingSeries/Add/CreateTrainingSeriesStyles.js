import styled from "styled-components";

export const styles = theme => ({
  paper: {
    width: "89%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
    margin: "5px auto",
    boxSizing: "border-box",

    "@media (max-width: 768px)": {
      textAlign: "center"
    }
  },
  container: {
    display: "flex",
    "flex-direction": "column",
    "align-items": "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  createButton: {
    "margin-left": theme.spacing.unit,
    background: "#451476",
    color: "white",
    "&:hover": {
      background: "#591a99",
      color: "white"
    }
  },
  divider: {
    margin: "15px 0"
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
});

export const MainContainer = styled.div`
  margin: 0 auto;
  max-width: 768px;
  width: 700px;
  @media (max-width: 768px) {
    width: 95%;
    margin: 0 auto;
  }
`;
