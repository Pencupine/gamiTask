const { BrowserWindow } = require('electron');
const admin = require('firebase-admin');
const url = require('url');
const path = require('path');
const electronStorage = require('electron-json-storage');

let signUpChildWindow = null;

admin.initializeApp({
	credential: admin.credential.cert(require('../../config').firebaseAdminSDK_key),
	databaseURL: 'https://testbrowserview.firebaseio.com'
});

// AUTH BROWSER WINDOW GENERATOR-----------------------------
async function startAuthWindow(mainWindow) {
	console.log('RENDERING AUTH PAGE');

	signUpChildWindow = new BrowserWindow({
		parent: mainWindow,
		width: 400,
		height: 500,
		modal: true,
		show: false,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
			webviewTag: true
		}
	});
	console.log('BrowserWindow Generated');

	signUpChildWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, '../../views/auth.html'),
			protocol: 'file:',
			slashes: true
		})
	);

	signUpChildWindow.on('ready-to-show', () => {
		console.log('readyToSHow');
		signUpChildWindow.show();
	});

	signUpChildWindow.on('closed', function() {
		signUpChildWindow = null;
	});
}

// SIGN IN USER----------------------------------------------
async function signInUser(idToken, mainWindow) {
	console.log('\n SIGNING IN USER WITH TOKEN : ', idToken);
	await saveToken('idToken', { idToken: idToken });
	checkAuthState(mainWindow);
}

// AUTH STATE CHECK-------------------------------------------
function checkAuthState(mainWindow) {
	console.log('\n CHECKING AUTH STATE');
	electronStorage.get('idToken', async (error, data) => {
		if (error) {
			console.log('error in finding user token');
			return;
		}
		console.log('\n Undefined or not : ', data);
		if (data.idToken !== undefined) {
			if (await checkTokenState(data.idToken)) {
				console.log('USER IN SESSION');
				// BLAH BLAH BLAH BLAH
			} else {
				console.log('USER SESSION EXPIRED. REMOVING ID');
				removeToken('idToken');
				startAuthWindow(mainWindow);
				signUpChildWindow.webContents.send('signOut', true);
			}
			return;
		} else {
			startAuthWindow(mainWindow);
			signUpChildWindow.webContents.send('signOut', true);
		}
	});
}

async function checkTokenState(idToken) {
	console.log('\n CHECKING TOKEN STATE');
	console.log(idToken);
	return new Promise(resovle => {
		admin
			.auth()
			.verifyIdToken(idToken, true)
			.then(decodedData => {
				console.log(decodedData);
				console.log(new Date().getTime());
				const authState = new Date().getTime() / 1000 > decodedData.exp;
				console.log('\n authState : ', authState);
				resolve(authState);
			})
			.catch(error => {
				console.log(error);
			});
	});
}

async function checkToken(idToken) {
	admin
		.auth()
		.verifyIdToken(idToken, true)
		.then(decodedData => {
			console.log(decodedData);
			console.log(new Date().getTime());
			if (new Date().getTime() / 1000 > decodedData.exp) {
				console.log(new Date().getTime());

				console.log(decodedData.exp);
				console.log('tokenExpired');
				signUpChildWindow.webContents.send('signOut', true);
			} else {
				saveToken('idToken', { idToken: idToken });
				console.log('Closing browser Window');
				var win = BrowserWindow.getFocusedWindow();
				win.close();
			}
		})
		.catch(error => {
			console.log(error);
		});
}

async function getToken(key) {
	return new Promise(resolve => {
		electronStorage.get(key, (error, data) => {
			if (error) console.log(error);
			console.log('\n FROM STORAGE', data);
			resolve(data);
		});
	});
}

async function saveToken(key, value) {
	console.log('\n SAVING TO STORAGE : ', value);
	return new Promise(resolve => {
		electronStorage.set(key, value, error => {
			if (error) throw error;
		});
		resolve(true);
	});
}

async function removeToken(key) {
	console.log('\n DELETING FROM STORAGE : ', key);
	return new Promise(resolve => {
		electronStorage.remove(key, error => {
			if (error) throw error;
		});
		resolve(true);
	});
}

exports.removeToken = removeToken;
exports.checkAuthState = checkAuthState;
exports.startAuthWindow = startAuthWindow;
exports.signInUser = signInUser;
