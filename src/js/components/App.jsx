
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/theSparkStore';

import TheSpark from './TheSpark.jsx';

const store = window.store = configureStore();


class App extends Component {

	render() {
		return (
			<Provider store={store}>
				<TheSpark />
			</Provider>
		);
	}
}

export default App;
