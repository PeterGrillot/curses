import React, { useEffect, useState } from 'react';
import _ from '@curses/lodash';
import request from 'request';
import ShowsModel, { ShowType } from './Shows.model';
import './Shows.css';
import { Loading } from '../Loading/Loading.fc';
import Error from '../Error/Error.fc';

const Shows = () => {
	const [ shows, setShows ] = useState([]);
	const [ error, setError ] = useState(null);
	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
		request(
			'https://sheetdb.io/api/v1/6fnxojhlys43x',
			(error, response, body) => {
				if (error) {
					console.log(error);
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
				{!_.size(shows) ? (
					<p>No Upcoming Shows || Check Facebook, I probably forgot to update!</p>
				) : (
					_.map(shows, (show: ShowType, index: number) => {
						return (
							<li className="__item" key={index}>
								<p>
									<i className="far fa-calendar" /> {show.date}
								</p>
								<p>
									<i className="far fa-user-circle" />
									<strong> {show.roster}</strong>
								</p>
								<p>
									<i className="far fa-compass" /> {show.venue} \\ {show.location}
								</p>
								{show.url !== "#" ? (
									<p>
										<a href={show.url} target="_blank" rel="noopener noreferrer">
										<i className="far fa-list-alt" /> more info &rarr;
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
