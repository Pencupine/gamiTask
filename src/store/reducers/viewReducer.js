import { SHOW_SIDE_MENU, HIDE_SIDE_MENU } from '../actions/types';

const initialState = {
	viewSideMenu: false
};

export default function(state = initialState, action) {
	console.log('viewReducer Triggered with action :', action);
	switch (action.type) {
		case SHOW_SIDE_MENU:
			return {
				...state,
				viewSideMenu: action.payload
			};
		case HIDE_SIDE_MENU:
			return {
				...state,
				viewSideMenu: action.payload
			};
		default:
			return state;
	}
}
