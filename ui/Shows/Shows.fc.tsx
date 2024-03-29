import React, { useEffect, useState } from "react";
import _ from "@curses/lodash";
import request from "request";
import ShowsModel, { ShowType } from "./Shows.model";
import "./Shows.css";
import { Loading } from "../Loading/Loading.fc";
import Error from "../Error/Error.fc";

const Shows = () => {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    request(
      "https://sheetdb.io/api/v1/6fnxojhlys43x",
      (error, response, body) => {
        if (error) {
          setError(error);
          return;
        }
        const shows: any = new ShowsModel(JSON.parse(body)).toUI();
        setShows(shows);
        setLoading(false);
      }
    );
  }, []);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;

  return (
    <div className="Shows __capsule">
      <h2>Upcoming Shows</h2>
      <ul className="__list">
        {shows.length
          ? shows.map((show: ShowType, index: number) => {
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
                {!!show.url ? (
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
          : null}
        <li>Check back soon, we always have something in the works!</li>
      </ul>
    </div>
  );
};

export default Shows;
