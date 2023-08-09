import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { AuthContextComp } from "./context/authContext";

ReactDOM.render(
  <AuthContextComp>
    <App />
  </AuthContextComp>,

  document.getElementById("root")
);
