import React, { Component } from 'react';
import _ from '@curses/lodash';

export type PressKitType = {
	title: string;
	content: string;
	image: string;
};
class PressKitModel extends Component {
	readonly data: Array<any>;
	constructor(APIJson: any) {
		super(APIJson);
		this.data = _.get(APIJson, 'feed.entry');
	}
	toUI() {
		const entries: Array<PressKitType> = _.map(this.data, (entry) => {
			return {
				title: entry.gsx$subtitle.$t,
				content: entry.gsx$content.$t,
				image: entry.gsx$image.$t
			};
		});
		return entries;
	}
}

export default PressKitModel;
