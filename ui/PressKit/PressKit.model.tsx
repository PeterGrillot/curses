import { Component } from 'react';
import _ from '@curses/lodash';

export interface PressKitType {
	type: string;
	content: any;
	url: string;
}

class PressKitModel extends Component {
	readonly data: Array<any>;
	constructor(APIJson: any) {
		super(APIJson);
		this.data = APIJson;
	}
	toUI() {
		const entries: Array<PressKitType> = _.map(this.data, (entry) => {
			if (entry.type === 'link') {
				return {
					type: 'link',
					content: entry.content,
					url: entry.url
				};
			}
			if (entry.type === 'video') {
				return {
					type: 'video',
					content: entry.content,
					url: entry.url
				};
			}
			return {
				type: entry.type,
				content: entry.content,
				url: entry.url
			};
		});
		return entries;
	}
}

export default PressKitModel;
