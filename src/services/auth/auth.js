const { BrowserWindow } = require('electron');
const admin = require('firebase-admin');
const url = require('url');
const path = require('path');

let signUpChildWindow = null;

admin.initializeApp({
	credential: admin.credential.cert(require('../../config').firebaseAdminSDK_key),
	databaseURL: 'https://testbrowserview.firebaseio.com'
});

function startAuthWindow(mainWindow) {
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

function saveToken(idToken) {
	admin
		.auth()
		.verifyIdToken(idToken, true)
		.then(decodedData => {
			console.log(decodedData);
			if (new Date().getTime() / 1000 > decodedData.exp) {
				console.log(new Date().getTime());
				console.log(new Date().getTime());

				console.log(decodedData.exp);
				console.log('tokenExpired');
				signUpChildWindow.webContents.send('signOut', true);
			} else {
				var win = BrowserWindow.getFocusedWindow();
				win.close();
			}
		})
		.catch(error => {
			console.log(error);
		});
}

exports.startAuthWindow = startAuthWindow;
exports.saveToken = saveToken;
