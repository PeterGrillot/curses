import React, { useEffect, useState } from 'react';
import _ from '@curses/lodash';
import { Loading } from '../Loading/Loading.fc';
import PostsModel, { PostType } from './Posts.model';
import './Posts.css';

type Post = {
	title: string;
	content: string;
	link: string;
};

const Posts = () => {
	const [ posts, setPosts ] = useState([]);
	const [ error, setError ] = useState(false);
	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
		fetch('https://spreadsheets.google.com/feeds/list/1pstEHIoEiQiNtYlTTEIygRJaOVVRVUhAy6BGVzNGm20/2/public/full?alt=json')
			.then((response) => {
				if (!response.ok) throw new Error(`Request failed: ${response.status}`);
				return response.json();
			})
			.then((data) => {
				const post = new PostsModel(data).toUI();
				setPosts(post);
				setLoading(false);
			})
			.catch(() => setError(true));
	}, []);

	if (error) return <p>Something Borked</p>;
	if (loading) return <Loading />;
	return (
		<div className="Posts __capsule">
			<h2>What's Going On?</h2>
			<ul className="__list">
				{_.map(posts, (post: PostType, index: number) => {
					return (
						<li className="__item" key={index}>
							<h3>{post.title}</h3>
							<p>{post.content}</p>
							{post.link && (
								<p>
									<a href={post.link}> more Info 	&rarr;</a>
								</p>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Posts;
