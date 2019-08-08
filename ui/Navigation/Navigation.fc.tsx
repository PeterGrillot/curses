import React from 'react';
import _ from '@curses/lodash';
import './Navigation.css';

import { NAVIGATION, NavigationType } from './Navigation.constants';

const Navigation: React.FC = () => {
	return (
		<nav className="Navigation">
			<ul className="__list">
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
