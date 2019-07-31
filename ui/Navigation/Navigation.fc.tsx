import React from 'react';
import './Navigation.css';

const Navigation: React.FC = () => {
	return (
		<nav className="Navigation">
			<ul className="__list">
				<li className="__item">
					<a rel="noopener noreferrer" target="_blank" href="//instagram.com/curse_words">
						<i className="icon ion-logo-instagram" /> Instagram
					</a>
				</li>
				<li className="__item">
					<a rel="noopener noreferrer" target="_blank" href="//twitter.com/CurseWordsBand">
						<i className="icon ion-md-trash" /> Twitter
					</a>
				</li>
				<li className="__item">
					<a rel="noopener noreferrer" target="_blank" href="//www.facebook.com/DontSayCurseWords/">
						<i className="icon ion-logo-facebook" /> Facebook
					</a>
				</li>
				<li className="__item">
					<a rel="noopener noreferrer" target="_blank" href="//dontsaycursewords.bandcamp.com/">
						<i className="icon ion-md-radio" /> Bandcamp
					</a>
				</li>
				<li className="__item">
					<a
						rel="noopener noreferrer"
						target="_blank"
						href="javascript:window.location.href = 'mailto:' + ['dontsaycursewords','gmail.com'].join('@')"
					>
						<i className="icon ion-md-mail" /> Email
					</a>
				</li>
			</ul>
		</nav>
	);
};
export default Navigation;
