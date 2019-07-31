import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import request from 'request';
import './Shows.css';
import Loading from '../Loading/Loading.fc';

type Show = {
	date: string;
	url: string;
	venue: string;
	roster: string;
	location: string;
};

const Shows: React.FC = () => {
	const [ shows, setShows ] = useState([]);
	const [ error, setError ] = useState(false);
	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
		request('http://localhost:5000/shows', (error, response, body) => {
			if (error) {
				setError(true);
				return;
			}
			const shows = JSON.parse(body);
			setShows(shows);
			setLoading(false);
		});
	}, []);

	if (error) return <p>Something Borked</p>;
	if (loading) return <Loading />;

	return (
		<div className="Shows">
			<h2>Shows</h2>
			<ul className="__list">
				{!_.size(shows) ? (
					<p>No Upcoming Shows || Check Facebook, I probably forgot to update!</p>
				) : (
					_.map(shows, (show: Show, index: number) => {
						return (
							<li className="__item" key={index}>
								<span>
									<i className="icon ion-md-calendar" /> {show.date}
								</span>
								<span>
									<i className="icon ion-md-people" /> {show.roster} \\{' '}
								</span>
								<br />
								<span>
									<i className="icon ion-md-compass" /> {show.venue} \\{' '}
								</span>
								<span>{show.location}</span>
								<a href={show.url} target="_blank" rel="noopener noreferrer">
									<span> more info...</span>
								</a>
							</li>
						);
					})
				)}
			</ul>
		</div>
	);
};

export default Shows;
