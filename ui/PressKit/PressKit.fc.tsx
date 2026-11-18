import React, { useEffect, useState } from 'react';
import _ from '@curses/lodash';

import { Loading } from '../Loading/Loading.fc';

import { IFramePost } from './sections/IFrame.section';
import { LinkPost } from './sections/Link.section';
import { TextPost } from './sections/Text.section';

import PressKitModel, { PressKitType } from './PressKit.model';

import './PressKit.css';

const PressKit = () => {
	const [ PressKit, setPressKit ] = useState([]);
	const [ error, setError ] = useState(false);
	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
		fetch('https://sheetdb.io/api/v1/2d4v3odadqm1a')
			.then((response) => {
				if (!response.ok) throw new Error(`Request failed: ${response.status}`);
				return response.json();
			})
			.then((data) => {
				const post = new PressKitModel(data).toUI();
				setPressKit(post);
				setLoading(false);
			})
			.catch(() => setError(true));
	}, []);

	if (error) return <p>Something Borked</p>;
	if (loading) return <Loading />;
	return (
		<div className="PressKit __capsule">
			<h2>Electronic Press Kit</h2>
			<article className="__article">
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
