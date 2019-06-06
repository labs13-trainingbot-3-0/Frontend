import React, { useEffect } from "react";

//Loading SVG that gets displayed
import Progress from "components/UI/Progress/ProgressCircle";
import { style } from "./styles.js";

//Auth
import { setAccessToken, setIdToken, getUserProfile } from "Auth/Auth";

function Callback({ history }) {
  useEffect(() => {
    setAccessToken();
    setIdToken();
    getUserProfile(() => {
      history.push("/home");
    });
  }, [history]);

  return (
    <div style={style}>
      <Progress />
    </div>
  );
}

export default Callback;
