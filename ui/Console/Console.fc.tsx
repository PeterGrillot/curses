import React from 'react';

import Laser from '../Laser/Laser.fc';
import './Console.css';

const Console: React.FC = () => {
	return (
		<div className="Console">
			<div className="__crt" />
			<div className="__glare" />
			<div className="__line" />
			<Laser />
			<Laser />
		</div>
	);
};

export default Console;
