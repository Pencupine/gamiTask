import React, { Component } from 'react';
import { Provider } from 'react-redux';

import AppComp from './AppComp';
import store from './store/store';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<AppComp />
			</Provider>
		);
	}
}

export default App;
