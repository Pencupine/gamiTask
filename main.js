// Modules to control application life
const { app, BrowserWindow, ipcMain, BrowserView } = require('electron');
const url = require('url');
const path = require('path');
const isDev = require('electron-is-dev');

const dbConnection = require('./services/dbConnection');

// --------For easy reloading in dev environment--------------------
if (isDev) {
	require('electron-reload')(__dirname, __dirname, {
		electron: require(`${__dirname}/../node_modules/electron`)
	});
	console.log(
		"Ignore this message... There is some problem with the electron-reload module. Please reload the 'electron .' manually!!!"
	);
}
//------------------------XXXX--------------------------------------
//
//
//
//
//
// Entry Message
require('./services/stupidConsoleMessages').entryMessage();
//
//
// ================================================================================================
//                                           ELECTRON APP
// ------------------------------------------------------------------------------------------------

let mainWindow = null;
function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 900,
		useContentSize: true,
		autoHideMenuBar: true,
		resizable: true,
		minimizable: true,
		maximizable: true,
		frame: false,
		webPreferences: {
			nodeIntegration: true
		}
	});

	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, 'index.html'),
			protocol: 'file:',
			slashes: true
		})
	);

	// DevTools.
	// mainWindow.webContents.openDevTools()

	mainWindow.on('closed', function() {
		mainWindow = null;
	});
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	// On macOS quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function() {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) createWindow();
});

// ================================================================================================
//                                        WINDOW OPERATIONS
// ------------------------------------------------------------------------------------------------
ipcMain.on('minimizeWindow', (event, value) => {
	mainWindow.minimize();
});

ipcMain.on('maximizeWindow', (event, value) => {
	mainWindow.maximize();
});

ipcMain.on('unmaximizeWindow', (event, value) => {
	mainWindow.unmaximize();
});

ipcMain.on('closeWindow', (event, value) => {
	dbConnection.disconnect(alphaData, setFileChangedVal);
	if (process.platform !== 'darwin') app.quit();

	require('./services/stupidConsoleMessages').exitMessage();
});

// ================================================================================================
//                                         FIREBASE OPERATIONS
// ------------------------------------------------------------------------------------------------
let signUpChildWindow = null;

// var firebase = require('firebase');
// var firebaseui = require('firebaseui');

ipcMain.on('openSignUp', (event, value) => {
	console.log('Opening Browser');
	signUpChildWindow = new BrowserWindow({
		parent: mainWindow,
		width: 500,
		height: 500,
		modal: true,
		show: false,
		webPreferences: {
			nodeIntegration: true,
			webviewTag: true
		}
	});
	console.log('BrowserWindow Generated');

	signUpChildWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, 'auth/auth.html'),
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
});

ipcMain.on('saveToken', (event, value) => {
	console.log(value);
});
// ---------------------------XXX------------------------------

//
//
//
//
//
//
//
//
//

//
//
//
//
// ============================================================================================================
//                                     D A T A B A S E    C O N N E C T I O N
// -------------------------------------------------------------------------------------------------------------
var alphaData;
var fileChanged = false;

// set AlphaData-------------------
function setAlphaData(data) {
	alphaData = data;
}

// set FileChanged-----------------
function setFileChangedVal(fileChangedVal) {
	fileChanged = fileChangedVal;
}

// Extracting alphaData from fileSystem----------
dbConnection.connect(setAlphaData);

// Change Checker----------------
setInterval(() => {
	dbConnection.checkForChanges(fileChanged, alphaData, setFileChangedVal);
}, 10000);

//
//
//
//
//
//
//
//
//
//
//

//
//

//
//
//
//
//
//
//
//
//
//
//
//
//
//

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ====================================================================================================
//                   ///////  ////////   //    //  ////////          ////   ////////  //////
//                  //        //     //  //    //  //     //        // //   //     //   //
//                  //        //     //  //    //  //     //       //  //   //     //   //
//                  //        ////////   //    //  //     //      ////////  ////////    //
//                  //        //    //   //    //  //     //     //     //  //          //
//                   ///////  //     //   //////   ////////     //      //  //        //////
// ____________________________________________________________________________________________________
//                                                                                       -by  Pencupine
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//

//

//

//

//

//===========================================================================================
//------------------------------------------TASKS--------------------------------------------

const taskListAPI = require('./services/tasks/taskListAPI');

//------------Get Tasks List Request----------------
ipcMain.on('allDailiesTasks', (event, type) => {
	taskListAPI.updateTasks(alphaData, 0, mainWindow);
});

ipcMain.on('allKanbanTasks', (event, type) => {
	taskListAPI.updateTasks(alphaData, 1, mainWindow);
});

//----------------New Task Request-------------------
ipcMain.on('newTaskCard', (event, value) => {
	taskListAPI.newTaskCard(alphaData, value, setAlphaData);
	taskListAPI.updateTasks(alphaData, value.taskType, mainWindow);

	setFileChangedVal(true);
});

// ----------------Remove Task Request-----------------
ipcMain.on('removeTaskCard', (event, value) => {
	var updatedListType = taskListAPI.removeTaskCard(alphaData, value, setAlphaData);

	taskListAPI.updateTasks(alphaData, updatedListType, mainWindow);

	setFileChangedVal(true);
});

//------------To reorder Multilist----------------------------
ipcMain.on('setNewTaskCardOrder', (event, value) => {
	console.log('Sort Request');

	const taskType = value.taskType;
	const result = value.result;

	if (taskType == 0) taskListAPI.reorderDailiesList(alphaData, result, setAlphaData);
	if (taskType == 1) taskListAPI.reorderKanbanList(alphaData, result, setAlphaData);

	taskListAPI.updateTasks(alphaData, value.taskType, mainWindow);

	setFileChangedVal(true);
});

//===============================================================================
//--------------------------------TASKS SCORES-----------------------------------

const taskProgressAPI = require('./services/tasks/taskProgressAPI');

ipcMain.on('allTaskProgressScores', (event, type) => {
	taskProgressAPI.updateTasks(alphaData, 0, mainWindow);
});
