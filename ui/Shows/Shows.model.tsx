import { Component } from 'react';
import _ from '@curses/lodash';

export type ShowType = {
	date: string;
	url: string;
	venue: string;
	roster: string;
	location: string;
};

class ShowsModel extends Component {
	readonly data: Array<any>;
	constructor(APIJson: any) {
		super(APIJson);
		this.data = _.get(APIJson, 'feed.entry');
	}
	toUI() {
		const entries: Array<ShowType> = _.map(this.data, (entry) => {
			return {
				date: entry.gsx$date.$t,
				url: entry.gsx$url.$t,
				venue: entry.gsx$venue.$t,
				roster: entry.gsx$roster.$t,
				location: entry.gsx$location.$t
			};
		});
		return entries;
	}
}

export default ShowsModel;
