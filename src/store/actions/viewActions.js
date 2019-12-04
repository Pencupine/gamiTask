import { SHOW_SIDE_MENU, HIDE_SIDE_MENU } from './types';

export const showSideMenu = () => dispatch => {
	console.log('Showing Side Menu');
	dispatch({
		type: SHOW_SIDE_MENU,
		payload: true
	});
};

export const hideSideMenu = () => dispatch => {
	console.log('Hiding Side Menu');
	dispatch({
		type: HIDE_SIDE_MENU,
		payload: false
	});
};
