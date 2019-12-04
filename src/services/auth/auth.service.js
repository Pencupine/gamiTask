const { BrowserWindow } = require('electron');
const admin = require('firebase-admin');
const url = require('url');
const path = require('path');
const cacheService = require('../storage/cache.service');

// Configure Firebase and Initialize app--------------
let signUpChildWindow = null;

admin.initializeApp({
	credential: admin.credential.cert(require('../../config').firebaseAdminSDK_key),
	databaseURL: 'https://testbrowserview.firebaseio.com'
});

//
//
//
//
//
//
//
//

// AUTH BROWSER WINDOW GENERATOR-----------------------------
async function startAuthWindow(mainWindow, showWindow) {
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
		if (showWindow) {
			signUpChildWindow.show();
			// signUpChildWindow.webContents.openDevTools();
		}
	});

	signUpChildWindow.on('closed', function() {
		signUpChildWindow = null;
	});
}

//
//
//
//
//

// SIGN IN USER----------------------------------------------
async function signInUser(idToken, mainWindow, sendUIAuthState) {
	console.log('\n SIGNING IN USER WITH TOKEN');
	await cacheService.saveData('idToken', { idToken: idToken });
	checkAuthState(mainWindow, true, sendUIAuthState);
}

//
//
//
//

// AUTH STATE CHECK-------------------------------------------
async function checkAuthState(mainWindow, showWindow, sendUIAuthState) {
	console.log('\n CHECKING AUTH STATE');

	const data = await cacheService.getData('idToken');
	console.log('\n Token undefined or not : ', data);

	if (data.idToken !== undefined) {
		console.log('\nTOKEN FOUND.\n   CHECKING TOKEN VALIDITY...');

		if (await checkTokenState(data.idToken)) {
			console.log('        CHECK RESULT : User in session');
			handleInterfaceRedirection(mainWindow, true, showWindow, sendUIAuthState);
		} else {
			console.log('        CHECK RESULT : User session expired. Removing ID');
			await cacheService.removeData('idToken');
			handleInterfaceRedirection(mainWindow, false, showWindow, sendUIAuthState);
		}
	} else {
		console.log('\nTOKEN NOT FOUND');
		handleInterfaceRedirection(mainWindow, false, showWindow, sendUIAuthState);
	}
}

// HANDLE UI SIGN IN AND SIGN OUT AUTH STATE-----------------------
function handleInterfaceRedirection(mainWindow, logIn, showWindow, sendUIAuthState) {
	if (logIn) {
		console.log('Logging IN User in UI');
		// close signUpchildwindow if its showing
		if (signUpChildWindow !== null) signUpChildWindow.hide();
		// Redirect to home
		// mainWindow.webContents.send('redirectToHome', logIn);
	} else {
		console.log('Logging OUT User in UI');
		// if signUpChildWindow is close.... open it if neccessary. If open just reload;
		if (signUpChildWindow === null) {
			if (showWindow) startAuthWindow(mainWindow, true);
		} else signUpChildWindow.reload();
		// Redirect away from home
		// mainWindow.webContents.send('redirectToHome', logIn);
	}
	sendUIAuthState(logIn);
}

//
//
//
//
//
//
//
//

// CHECK TOKEN STATE---------------------------------------------
async function checkTokenState(idToken) {
	console.log('\n CHECKING TOKEN STATE');
	// console.log(idToken);
	return new Promise(resolve => {
		admin
			.auth()
			.verifyIdToken(idToken, true)
			.then(decodedData => {
				const currentDate = new Date().getTime() / 1000;
				const authState = !(currentDate > decodedData.exp);
				console.log('\n authState : ', authState);
				resolve(authState);
			})
			.catch(error => {
				console.log(error);
				resolve(false);
			});
	});
}

//
//
//
//

// EXPORTS---------------------------------------------------------------------------
exports.checkAuthState = checkAuthState;
exports.startAuthWindow = startAuthWindow;
exports.signInUser = signInUser;
