import React from 'react';
import './Navigation.css';

const Navigation: React.FC = () => {
	return (
		<nav className="Navigation">
			<ul className="__list">
				<li className="__item">
					<a rel="noopener noreferrer" target="_blank" href="//instagram.com/curse_words">
						<i className="fab fa-instagram" /> Instagram
					</a>
				</li>
				<li className="__item">
					<a rel="noopener noreferrer" target="_blank" href="//twitter.com/CurseWordsBand">
						<i className="far fa-trash-alt" /> Twitter
					</a>
				</li>
				<li className="__item">
					<a rel="noopener noreferrer" target="_blank" href="//www.facebook.com/DontSayCurseWords/">
						<i className="fab fa-facebook" /> Facebook
					</a>
				</li>
				<li className="__item">
					<a rel="noopener noreferrer" target="_blank" href="//dontsaycursewords.bandcamp.com/">
						<i className="fab fa-bandcamp" /> Bandcamp
					</a>
				</li>
				<li className="__item">
					<a
						rel="noopener noreferrer"
						target="_blank"
						href="//open.spotify.com/artist/5Yd3VFwLLJaSAPQRKwYXSN"
					>
						<i className="fab fa-spotify" /> Spotify
					</a>
				</li>
				<li className="__item">
					<a
						rel="noopener noreferrer"
						target="_blank"
						href="javascript:window.location.href = 'mailto:' + ['dontsaycursewords','gmail.com'].join('@')"
					>
						<i className="far fa-envelope" /> Email
					</a>
				</li>
			</ul>
		</nav>
	);
};
export default Navigation;
