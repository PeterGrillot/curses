import React from 'react';
import './Prompt.css';
import Shows from '../Shows/Shows.fc';
import Console from '../Console/Console.fc';
import Posts from '../Posts/Posts.fc';

const Prompt: React.FC = () => {
	return (
		<div className="Prompt">
			<Console />
			<header className="__header --center">
				<h1>Curse Words Web Portal</h1>
			</header>
			<Posts />
			<Shows />
		</div>
	);
};

export default Prompt;
