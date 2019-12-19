import cacheService from '../../../../services/storage/cache.service';

function getAuth() {
	const getToken = cacheService.getToken('idToken');

	getToken.then(data => {
		if (data.idToken !== undefined) {
			const validateToken = authService.checkTokenState(data.idToken);
			validateToken.then(res => {
				if (res) {
				} else {
					store.dispatch({
						type: PURGE
					});
				}
			});
		}
	});
}

export default getAuth;
