import React from 'react';
import ReactDOM from 'react-dom';
import './styles/reset.css';
import './styles/typography.css';
import './styles/vars.css';
import Prompt from './Prompt/Prompt';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Prompt />, document.getElementById('root'));
serviceWorker.unregister();
