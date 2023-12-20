import React from "react";
import "./Prompt.css";
import Shows from "../Shows/Shows.fc";
import Console from "../Console/Console.fc";
import { IntroScreen } from "Game/partials/Intro";
import { Link } from "react-router-dom";

const Prompt = () => {
  return (
    <div className="Prompt">
      <Console />
      <header className="__header __capsule">
        <IntroScreen />
        <h1 hidden>Curse Words Web Portal</h1>
        <h2>
          New album out now! Listen on{" "}
          <a
            href="https://RecordU.lnk.to/It_Was_the_Cursed_of_Times"
            target="_blank"
          >
            these music apps
          </a>{" "}
          or{" "}
          <a href="https://dontsaycursewords.bandcamp.com/" target="_blank">
            bandcamp.
          </a>
        </h2>
        <p>
          Check out one of our shows below or hit us up on all our social medias
          listed in the nav. Also check out our <Link to="/epk">EPK</Link> to
          learn more about the band.
        </p>
      </header>
      <Shows />
    </div>
  );
};

export default Prompt;
