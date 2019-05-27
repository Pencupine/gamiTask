// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const url = require("url");
const path = require("path");
const isDev = require("electron-is-dev");
// const * as firebase = require("firebase");

// FIREBASE CONFIG-------------------------------

// const firebaseConfig = {
//   apiKey: "AIzaSyDBF8gzhskQhkIoxTrr0H1LMAhZOyqbhfE",
//   authDomain: "electron-react-firebase.firebaseapp.com",
//   databaseURL: "https://electron-react-firebase.firebaseio.com",
//   projectId: "electron-react-firebase",
//   storageBucket: "electron-react-firebase.appspot.com",
//   messagingSenderId: "565833849649",
//   appId: "1:565833849649:web:93ce6bf50b4623df"
// };

// firebase.initializeApp(firebaseConfig);

// ----------------------------------------------

// For easy reloading in dev environment
if (isDev) {
  require("electron-reload")(__dirname, __dirname, {
    electron: require(`${__dirname}/../node_modules/electron`)
  });
  console.log(
    "Ignore this message... There is some problem with the electron-reload module. Please reload the 'electron .' manually!!!"
  );
}

let mainWindow = null;
let signUpChildWindow = null;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// Different IPC Processes-------------------------------------------------------------------
var provider = null;
ipcMain.on("googleSignUp", (event, value) => {
  console.log("Hello!");
  signUpChildWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false
  });
  signUpChildWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "auth.html"),
      protocol: "file:",
      slashes: true
    })
  );
  signUpChildWindow.on("ready-to-show", () => {
    signUpChildWindow.show();
  });
  //   console.log("Sign Up Request recieved");
  //   signUpChildWindow.on("ready-to-show", () => {
  //     provider = new firebase.auth.GoogleAuthProvider();
  //   });
  //   signUpChildWindow.webContents.send("signUpGoogleProvider", {
  //     config: firebaseConfig,
  //     provider: provider
  //   });
});
// );
