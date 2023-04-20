import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Prompt from "Prompt/Prompt.fc";
import Navigation from "./Navigation/Navigation.fc";
import PressKit from "./PressKit/PressKit.fc";
import ReactGA from "react-ga";
import Game from "./Game/Game.fc";
import { GameProvider } from "Game/Game.reducer";
import { useLocation } from "react-router-dom";
const App = () => {
  const location = useLocation();
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });
  console.log(location);
  return (
    <div className={location.pathname}>
      <Navigation />
      <div className="Container">
        <Switch>
          <Route path="/epk">
            <PressKit />
          </Route>
          <Route path="/game">
            <GameProvider>
              <div id="Game" className="Prompt">
                <Game />
              </div>
            </GameProvider>
          </Route>
          <Route path="/">
            <Prompt />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
