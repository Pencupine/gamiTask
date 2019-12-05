import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import cacheStorage from '../services/storage/cache.service';

import rootReducer from './reducers';

const initialState = {};

// To save state to local storage-------------
function saveToLocalStorage(state) {
	console.log(state);
	const storeDataAction = cacheStorage.saveData('state', {
		state: state
	});
	storeDataAction.then(data => {
		console.log(data);
		if (data) {
			console.log('storing to local storage :', state);
		} else {
			console.log('error occured in saving to storage');
		}
	});
}

// To load state from local storage-----------
function loadFromLocalStorage() {
	const getDataAction = cacheStorage.getData('state');
	getDataAction.then(data => {
		if (data.state === undefined) return undefined;
		console.log(data);
		return data.state;
	});
}

const persistedState = loadFromLocalStorage();

const middleware = [ thunk ];

const store = createStore(
	rootReducer,
	persistedState,
	compose(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

store.subscribe(() => saveToLocalStorage(store.getState()));

module.exports = store;
