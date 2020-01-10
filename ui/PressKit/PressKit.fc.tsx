import React, { useEffect, useState } from 'react';
import _ from '@curses/lodash';
import request from 'request';
import Loading from '../Loading/Loading.fc';
import PressKitModel, { PressKitType } from './PressKit.model';
import './PressKit.css';

type PressKit = {
	title: string;
	content: string;
	image: string;
};

const PressKit: React.FC = () => {
	const [ PressKit, setPressKit ] = useState([]);
	const [ error, setError ] = useState(false);
	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
		request(
			'https://spreadsheets.google.com/feeds/list/1pstEHIoEiQiNtYlTTEIygRJaOVVRVUhAy6BGVzNGm20/3/public/full?alt=json',
			(error, response, body) => {
				if (error) {
					setError(true);
					return;
				}
				const post: any = new PressKitModel(JSON.parse(body)).toUI();
				setPressKit(post);
				setLoading(false);
			}
		);
	}, []);

	if (error) return <p>Something Borked</p>;
	if (loading) return <Loading />;
	return (
		<div className="PressKit --center">
			<h2>What's Going On?</h2>
			<ul className="__list">
				{_.map(PressKit, (post: PressKitType, index: number) => {
					return (
						<li className="__item" key={index}>
							<h3>{post.title}</h3>
							<p>{post.content}</p>
							<p>
								<img src={post.image} /> more Info
							</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default PressKit;
