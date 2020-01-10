import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Prompt from 'Prompt/Prompt.fc';
import Navigation from './Navigation/Navigation.fc';
import PressKit from './PressKit/PressKit.fc';

export default function App() {
	return (
		<Router>
			<Navigation />
			<Switch>
				<Route path="/epk">
					<PressKit />
				</Route>
				<Route path="/">
					<Prompt />
				</Route>
			</Switch>
		</Router>
	);
}
