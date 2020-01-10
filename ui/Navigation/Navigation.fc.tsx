import React from 'react';
import _ from '@curses/lodash';
import './Navigation.css';

import { NAVIGATION, NavigationType } from './Navigation.constants';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
	let location = useLocation();
	return (
		<nav className="Navigation">
			<ul className="__list">
				{location.pathname !== '/' ? (
					<li className="__item">
						<Link to="/">
							<i className="far fa-arrow-alt-circle-left" /> Back
						</Link>
					</li>
				) : (
					<li className="__item">
						<Link to="/epk">
							<i className="far fa-newspaper" /> epk
						</Link>
					</li>
				)}
				<li>|</li>
				{_.map(NAVIGATION, (item: NavigationType, index: number) => (
					<li className="__item" key={index}>
						<a rel="noopener noreferrer" target="_blank" href={item.href}>
							<i className={item.icon} /> {item.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};
export default Navigation;
