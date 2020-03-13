import React from 'react';
import { PressKitType } from '../PressKit.model';

export const TextPost = (props: PressKitType) => {
	const htmlObject = () => {
		return { __html: props.content };
	};
	return (
		<section className="__section">
			{props.content && <h3>{props.type}</h3>}
			{props.type && <p dangerouslySetInnerHTML={htmlObject()} />}
			{props.url && <img src={props.url} alt={props.type} />}
		</section>
	);
};
