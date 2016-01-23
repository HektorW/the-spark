
require('./polyfill');

import React from 'react';
import ReactDOM from 'react-dom';

import TheSpark from './components/TheSpark.jsx';

ReactDOM.render(
	React.createElement(TheSpark),
	document.getElementById('app')
);
