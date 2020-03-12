import React, { useEffect, useState } from 'react';
import _ from '@curses/lodash';
import request from 'request';

import { Loading } from '../Loading/Loading.fc';
import { IFramePost } from './IFramePost.fc';
import { LinkPost } from './LinkPost.fc';
import { TextPost } from './TextPost.fc';

import PressKitModel, { PressKitType } from './PressKit.model';

import './PressKit.css';

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
			<h2>Electronic Press Kit</h2>
			<article className="__section">
				{_.map(PressKit, (post: PressKitType, index: number) => {
					if (post.type === 'link') {
						return <LinkPost key={index} {...post} />;
					}
					if (post.type === 'iframe') {
						return <IFramePost key={index} {...post} />;
					}
					return <TextPost key={index} {...post} />;
				})}
			</article>
		</div>
	);
};

export default PressKit;
