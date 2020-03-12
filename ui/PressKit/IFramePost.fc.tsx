import React from 'react';
import { PressKitType } from './PressKit.model';

export const IFramePost = (props: PressKitType) => {
	return (
		<section className="__section">
			<h3>{props.content}</h3>
			<div className="iframe__container">
				<iframe title={props.content} height="315" width="560" frameBorder="0" src={props.url} />
			</div>
		</section>
	);
};
