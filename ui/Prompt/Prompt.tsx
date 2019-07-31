import React from 'react';
import './Prompt.css';
import Shows from '../Shows/Shows.fc';
import Console from '../Console/Console.fc';
import Navigation from '../Navigation/Navigation.fc';
import Posts from '../Posts/Posts.fc';

const Prompt: React.FC = () => {
	return (
		<div className="Prompt">
			<Console />
			<Navigation />
			<header className="Prompt-header">
				<h1>Curse Words</h1>
			</header>
			<Posts />
			<Shows />
		</div>
	);
};

export default Prompt;
