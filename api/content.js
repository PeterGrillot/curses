const request = require('request');
const _ = require('lodash');

const getShows = function(req, res) {
	var options = {
		method: 'GET',
		url:
			'https://spreadsheets.google.com/feeds/list/1pstEHIoEiQiNtYlTTEIygRJaOVVRVUhAy6BGVzNGm20/od6/public/values?alt=json',
		headers: {
			'User-Agent': 'psxApp/1.0.0 (Linux) node request'
		}
	};
	request(options, function(error, response, body) {
		if (error) throw new Error(error);
		const json = JSON.parse(body);
		const data = _.get(json, 'feed.entry', []);
		const entries = _.map(data, (entry) => {
			return {
				date: entry.gsx$date.$t,
				url: entry.gsx$url.$t,
				venue: entry.gsx$venue.$t,
				roster: entry.gsx$roster.$t,
				location: entry.gsx$location.$t
			};
		});
		res.send(entries);
	});
};
module.export = Object.assign({ getShows });
