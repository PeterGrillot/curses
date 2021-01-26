import React, { useEffect, useState } from 'react';
import _ from '@curses/lodash';
import request from 'request';
import { Loading } from '../Loading/Loading.fc';
import PostsModel, { PostType } from './Posts.model';
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
		request(
			'https://spreadsheets.google.com/feeds/list/1pstEHIoEiQiNtYlTTEIygRJaOVVRVUhAy6BGVzNGm20/2/public/full?alt=json',
			(error, response, body) => {
				if (error) {
					setError(true);
					return;
				}
				const post: any = new PostsModel(JSON.parse(body)).toUI();
				setPosts(post);
				setLoading(false);
			}
		);
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
									<a href={post.link}> more Info =>></a>
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
