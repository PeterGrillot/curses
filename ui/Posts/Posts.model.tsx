import { Component } from 'react';
import _ from '@curses/lodash';

export type PostType = {
	title: string;
	content: string;
	link: string;
};
class PostsModel extends Component {
	readonly data: Array<any>;
	constructor(APIJson: any) {
		super(APIJson);
		this.data = _.get(APIJson, 'feed.entry');
	}
	toUI() {
		const entries: Array<PostType> = _.map(this.data, (entry) => {
			return {
				title: entry.gsx$title.$t,
				content: entry.gsx$content.$t,
				link: entry.gsx$link.$t
			};
		});
		return entries;
	}
}

export default PostsModel;
