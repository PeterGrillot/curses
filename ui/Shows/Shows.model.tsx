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
		this.data = APIJson;
	}
	toUI() {
		const entries: Array<ShowType> = _.map(this.data, (entry) => {
			return {
				date: entry.date,
				url: entry.url,
				venue: entry.venue,
				roster: entry.roster,
				location: entry.location
			};
		});
		return entries;
	}
}

export default ShowsModel;
