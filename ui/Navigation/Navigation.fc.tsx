import React, { useState } from "react";
import _ from "@curses/lodash";
import "./Navigation.css";

import { NAVIGATION, NavigationType } from "./Navigation.constants";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [navToggle, setNavToggle] = useState(false);
  let location = useLocation();
  return (
    <nav className="Navigation" data-active={navToggle}>
      <ul className="__list">
        <li className="__item">
          <button className="__button" onClick={() => setNavToggle(!navToggle)}>
            <i
              className={`far fa-caret-square-${navToggle ? "right" : "left"}`}
            />{" "}
            Close Menu
          </button>
        </li>
        {location.pathname !== "/" ? (
          <li className="__item">
            <Link to="/">
              <i className="far fa-arrow-alt-circle-left" /> Back
            </Link>
          </li>
        ) : (
            <>
              <li className="__item --highlight">
                <Link to="/game">
                  <i className="far fa-clock" /> Game
              </Link>
              </li>
              <li className="__item">
                <Link to="/epk">
                  <i className="far fa-newspaper" /> Press Kit
              </Link>
              </li>
            </>
          )}
        <li title="&larr; Stay | Go &rarr;" className="__divider">
          |
        </li>
        {_.map(NAVIGATION, (item: NavigationType, index: number) => (
          <li className="__item" key={index}>
            <a rel="noopener noreferrer" target="_blank" href={item.href}>
              <i className={item.icon} /> {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Navigation;
