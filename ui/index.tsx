import React from "react";
import ReactDOM from "react-dom";

import ReactGA from "react-ga";

import "./_styles/reset.css";
import "./_styles/typography.css";
import "./_styles/vars.css";
import "./_styles/main.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";

ReactGA.initialize("UA-56742354-1 ");

const RoutedApp = () => (
  <Router>
    <App />
  </Router>
);

ReactDOM.render(<RoutedApp />, document.getElementById("root"));
serviceWorker.unregister();
