import { ipcRenderer } from 'electron';
import cacheStorage from '../storage/cache.service';
import authService from './auth.service';

function signOut() {
	ipcRenderer.send('signOutFromNav', null);
	console.log('Sign Out');
}

function checkAuthFromToken() {
	return new Promise(resolve => {
		// if (!this.props.auth.isAuthenticated) {

		const getToken = cacheStorage.getData('idToken');
		getToken.then(data => {
			console.log('AUTH GATE :: FOUND DATA :', data.idToken);
			if (data.idToken !== undefined) {
				const validateToken = authService.checkTokenState(data.idToken);
				validateToken.then(res => {
					if (res) {
						resolve(true);
					} else {
						store.dispatch({
							type: PURGE
						});
						resolve(false);
					}
				});
			} else {
				resolve(false);
			}
		});
		// } else {
		// 	window.location.href = '/';
		// }
	});
}

exports.signOut = signOut;
exports.checkAuthFromToken = checkAuthFromToken;
