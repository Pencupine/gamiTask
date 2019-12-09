import { ipcRenderer } from 'electron';
import history from '../../utils/history';

function signOut() {
	ipcRenderer.send('signOutFromNav', null);
	console.log('Sign Out');
}

exports.signOut = signOut;
