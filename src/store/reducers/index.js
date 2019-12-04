import { combineReducers } from 'redux';
import veiwReducer from './viewReducer';

export default combineReducers({
	viewState: veiwReducer
});
