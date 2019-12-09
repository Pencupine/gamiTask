import { AUTH_USER } from '../actions/types';

import { PURGE } from 'redux-persist';

import isEmpty from '../../utils/isEmpty';

const initialState = {
	isAuthenticated: false,
	user: {}
	// loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case AUTH_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			};
		case PURGE:
			console.log('PURGIN!!!');
			return initialState;
		default:
			return state;
	}
}
