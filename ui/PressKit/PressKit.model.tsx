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
		this.data = _.get(APIJson, 'feed.entry');
	}
	toUI() {
		const entries: Array<PressKitType> = _.map(this.data, (entry) => {
			if (entry.gsx$type.$t === 'link') {
				return {
					type: 'link',
					content: entry.gsx$content.$t,
					url: entry.gsx$url.$t
				};
			}
			if (entry.gsx$type.$t === 'video') {
				return {
					type: 'video',
					content: entry.gsx$content.$t,
					url: entry.gsx$url.$t
				};
			}
			return {
				type: entry.gsx$type.$t,
				content: entry.gsx$content.$t,
				url: entry.gsx$url.$t
			};
		});
		return entries;
	}
}

export default PressKitModel;
