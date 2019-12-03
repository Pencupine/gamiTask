import { FETCH_POSTS, AUTH_USER } from './types';
import cacheService from '../../services/storage/cache.service';

export const fetchAuth = () => async dispatch => {
	await cacheService.getToken('idToken').then(token => {
		dispatch({
			type: FETCH_POSTS,
			payload: token
		});
	});
};
