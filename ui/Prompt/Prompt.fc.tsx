import React from 'react';
import './Prompt.css';
import Shows from '../Shows/Shows.fc';
import Console from '../Console/Console.fc';

const Prompt: React.FC = () => {
	return (
		<div className="Prompt">
			<Console />
			<header className="__header __capsule">
				<h1>Curse Words Web Portal</h1>
				<p>Welcome! Please check out one of our shows below and feel free to help yourself to our music on <a href="https://dontsaycursewords.bandcamp.com/">bandcamp!</a></p>
			</header>
			<Shows />
		</div>
	);
};

export default Prompt;
