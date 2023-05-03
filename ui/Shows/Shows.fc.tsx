import React, { useEffect, useState } from "react";
import _ from "@curses/lodash";
import { ShowType } from "./Shows.model";
import "./Shows.css";
import { Loading } from "../Loading/Loading.fc";
import Error from "../Error/Error.fc";
const Shows = () => {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("schedule.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((result) => {
        if (!result.ok) {
          setError(`Error: ${result.statusText}`);
          console.log(result);
          return [];
        }
        return result.json();
      })
      .then((response) => {
        setShows(response);
        setLoading(false);
      });
  }, []);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;

  return (
    <div className="Shows __capsule">
      <h2>Upcoming Shows</h2>
      <ul className="__list">
        {!_.size(shows) ? (
          <p>
            No Upcoming Shows || Check Facebook, I probably forgot to update!
          </p>
        ) : (
            _.map(shows, (show: ShowType, index: number) => {
              return (
                <li className="__item" key={index}>
                  <p>
                    <i className="fa fa-calendar" /> {show.date}
                  </p>
                  <p>
                    <i className="fa fa-user-circle" />
                    <strong> {show.roster}</strong>
                  </p>
                  <p>
                    <i className="fa fa-compass" /> {show.venue} \\{" "}
                    {show.location}
                  </p>
                  {show.url !== "#" ? (
                    <p>
                      <a
                        href={show.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-list-alt" /> more info &rarr;
                    </a>
                    </p>
                  ) : null}
                  <br />
                </li>
              );
            })
          )}
      </ul>
    </div>
  );
};

export default Shows;
