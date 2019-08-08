import React from 'react';
import ReactDOM from 'react-dom';
import './_styles/fontawesome.css';
import './_styles/brands.css';
import './_styles/regular.css';
import './_styles/reset.css';
import './_styles/typography.css';
import './_styles/vars.css';
import './_styles/main.css';
import Prompt from './Prompt/Prompt';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Prompt />, document.getElementById('root'));
serviceWorker.unregister();
