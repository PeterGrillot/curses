import React, { useEffect, useState } from "react";
import _ from "@curses/lodash";
import "./Navigation.css";

import { NAVIGATION, NavigationType } from "./Navigation.constants";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [navToggle, setNavToggle] = useState(false);
  let location = useLocation();

  useEffect(
    function toggleNav() {
      setNavToggle(false);
    },
    [location]
  );
  return (
    <nav className="Navigation" data-active={navToggle}>
      <ul className="__list">
        <li className="__item">
          <button className="__button" onClick={() => setNavToggle(!navToggle)}>
            <i className={`fa ${navToggle ? "fa-times" : "fa-bars"}`} /> Close
            Menu
          </button>
        </li>

        <li className="__item">
          <Link to="/">
            <i className="fa fa-home" /> Home
          </Link>
        </li>
        <li className="__item">
          <Link to="/epk">
            <i className="fa fa-newspaper-o" /> Press Kit
          </Link>
        </li>
        <li className="__item">
          <Link to="/game">
            <i className="fa fa-terminal" /> Game
          </Link>
        </li>
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
