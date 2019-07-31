import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import request from 'request';
import Loading from '../Loading/Loading.fc';
import './Posts.css';

type Post = {
	title: string;
	content: string;
	link: string;
};

const Posts: React.FC = () => {
	const [ posts, setPosts ] = useState([]);
	const [ error, setError ] = useState(false);
	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
		request('http://localhost:5000/posts', (error, response, body) => {
			if (error) {
				setError(true);
				return;
			}
			const posts = JSON.parse(body);
			setPosts(posts);
			setLoading(false);
		});
	}, []);
	if (error) return <p>Something Borked</p>;
	if (loading) return <Loading />;
	return (
		<div className="Posts">
			<h2>Posts</h2>
			<ul className="__list">
				{_.map(posts, (post: Post, index: number) => {
					return (
						<li className="__item" key={index}>
							<span>{post.title} \\ </span>
							<span>{post.content} \\ </span>
							<span>{post.link}</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Posts;
