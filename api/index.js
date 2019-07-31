Object.defineProperty(exports, '__esModule', { value: true });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash');
const request = require('request');
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const url = 'https://spreadsheets.google.com/feeds/list/1pstEHIoEiQiNtYlTTEIygRJaOVVRVUhAy6BGVzNGm20/';
function getPosts(req, res) {
	var options = {
		method: 'GET',
		url: `${url}2/public/full?alt=json`,
		headers: {
			'User-Agent': 'cursewords/1.0.0 (Linux) node request'
		}
	};
	request(options, function(error, response, body) {
		if (error) throw new Error(error);
		const json = JSON.parse(body);
		const data = _.get(json, 'feed.entry', []);
		const entries = _.map(data, (entry) => {
			return {
				title: entry.gsx$title.$t,
				content: entry.gsx$content.$t,
				link: entry.gsx$link.$t
			};
		});
		res.send(entries);
	});
}
app.get('/posts/', getPosts);

// Shows
function getShows(req, res) {
	var options = {
		method: 'GET',
		url: `${url}1/public/full?alt=json`,
		headers: {
			'User-Agent': 'cursewords/1.0.0 (Linux) node request'
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
}
app.get('/shows/', getShows);

app.listen(5000, function() {
	console.log('http://localhost:5000');
});
