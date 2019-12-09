import { combineReducers } from 'redux';
import veiwReducer from './viewReducer';
import authReducer from './authReducer';

export default combineReducers({
	viewState: veiwReducer,
	auth: authReducer
});
