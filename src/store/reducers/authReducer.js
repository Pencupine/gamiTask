import { FETCH_POSTS, AUTH_USER } from '../actions/types';

const initialState = {
	user: {},
	isAuthenticated: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_POSTS:
			return {
				...state,
				user: action.payload,
				isAuthenticated: action.payload.idToken !== undefined
			};
		default:
			return state;
	}
}
