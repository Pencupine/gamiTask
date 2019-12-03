import { combineReducers } from 'redux';
import authReducer from './authReducer';
import veiwReducer from './viewReducer';

export default combineReducers({
	viewState: veiwReducer
});
