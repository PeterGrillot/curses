import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Prompt from "Prompt/Prompt.fc";
import Navigation from "./Navigation/Navigation.fc";
import PressKit from "./PressKit/PressKit.fc";
import ReactGA from "react-ga";
import Game from "./Game/Game.fc";

const App = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });
  return (
    <Router>
      <Navigation />
      <div className="Container">
        <Switch>
          <Route path="/epk">
            <PressKit />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/">
            <Prompt />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
