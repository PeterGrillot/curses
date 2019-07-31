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
			<header className="Prompt-header --center">
				<h1>Curse Words</h1>
			</header>
			{/* <Posts />
			<Shows /> */}
			<div className="--center">
				<h2>**Album Release Show at PieShop DC August 9th**</h2>
				<h3>
					<a href="https://pieshopdc.com/events/curse-words-album-release-accidents-split-seconds-braceface/">
						More info here...
					</a>
				</h3>
				<h2>New Album Coming Soon / August 9th!</h2>
				<p>Free on Bandcamp</p>
			</div>
		</div>
	);
};

export default Prompt;
