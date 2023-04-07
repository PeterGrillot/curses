import React from "react";
import "./Prompt.css";
import Shows from "../Shows/Shows.fc";
import Console from "../Console/Console.fc";
import { IntroScreen } from "Game/partials/Intro";

const Prompt = () => {
  return (
    <div className="Prompt">
      <Console />
      <header className="__header __capsule">
        <IntroScreen />
        <h1 hidden>Curse Words Web Portal</h1>
        <h2>
          New Album May 5th! Pre save on{" "}
          <a href="https://RecordU.lnk.to/It_Was_the_Cursed_of_Times">
            Spotify!
          </a>
        </h2>
        <p>
          Check out one of our shows below and feel free to help yourself to our
          music on{" "}
          <a href="https://dontsaycursewords.bandcamp.com/">bandcamp!</a>
        </p>
      </header>
      <Shows />
    </div>
  );
};

export default Prompt;
