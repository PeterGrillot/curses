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
          New album "Hyperdrive Overkill" is OUT NOW!!!{" "}
          <a
            href="https://unitedmasters.com/m/hyperdrive-overkill-1"
            target="_blank"
          >
            on these music apps
          </a>
        </h2>
        <p>
          Hyperdrive Overkill is an 11-track sci-fi murder mystery concept album
          from Washington, D.C. space-punk band Curse Words.
        </p>
        <p>
          Set against the collapse of the “City of Dreams,” the album follows an
          interstellar voyage through the perspectives of characters occupying
          different levels of a failing society. A Scholar feels trapped in a
          doomed timeline, a Privateer confronts privilege and corruption, and a
          fugitive Vagabond discovers that the evil they are fleeing may have
          followed them aboard.
        </p>
        <p>
          Musically, Hyperdrive Overkill combines driving guitars, urgent dual
          vocals, massive punk hooks, and synth-driven atmosphere with elements
          of pop punk, grunge, and alternative rock. The result is equal parts
          melodic punk record, space opera, and social allegory.
        </p>
      </header>
      <Shows />
    </div>
  );
};

export default Prompt;
