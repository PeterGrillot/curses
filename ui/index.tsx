import React from 'react';
import ReactDOM from 'react-dom';
import './styles/fontawesome.css';
import './styles/brands.css';
import './styles/regular.css';
import './styles/reset.css';
import './styles/typography.css';
import './styles/vars.css';
import './styles/main.css';
import Prompt from './Prompt/Prompt';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Prompt />, document.getElementById('root'));
serviceWorker.unregister();
