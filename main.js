// Modules to control application life
const { app, BrowserWindow, ipcMain } = require("electron");
const url = require("url");
const path = require("path");
const isDev = require("electron-is-dev");
const fs = require("fs");

// --------For easy reloading in dev environment--------------------
if (isDev) {
  require("electron-reload")(__dirname, __dirname, {
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
// ================================================================================================
//                                      ELECTRON APP
// ------------------------------------------------------------------------------------------------

let mainWindow = null;
let signUpChildWindow = null;

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
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  // DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// ================================================================================================
//                                  WINDOW OPERATIONS
// ------------------------------------------------------------------------------------------------
ipcMain.on("minimizeWindow", (event, value) => {
  mainWindow.minimize();
});
ipcMain.on("maximizeWindow", (event, value) => {
  mainWindow.maximize();
});
ipcMain.on("unmaximizeWindow", (event, value) => {
  mainWindow.unmaximize();
});
ipcMain.on("closeWindow", (event, value) => {
  writeDatabase(oldData);
  if (process.platform !== "darwin") app.quit();
});

var provider = null;
ipcMain.on("googleSignUp", (event, value) => {
  console.log("NewUserRequest!");
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
});
// ---------------------------XXX------------------------------

//
//
//

// ====================================================================================================
//                   /////  //////   //  //  //////        ///    ///////  ////
//                  //      //   //  //  //  //   //      // //   //   //   //
//                  //      //////   //  //  //   //     ///////  //////    //
//                   /////  //   //   ////   //////     //     // //       ////
// ____________________________________________________________________________________________________

// Database File URL-------------------
const fileName = `../data.json`;
// ------------------------------------
var oldData;
var fileChanged = false;

readDatabase();

setInterval(checkForChanges, 10000);

// Change Checker----------------

var timeAfterSaving = 0;
function checkForChanges() {
  if (fileChanged === true) {
    writeDatabase(oldData);
    timeAfterSaving = 0;
  } else {
    timeAfterSaving = timeAfterSaving + 1;
    console.log(". " + timeAfterSaving);
  }
}

// File Reader Function-----------
function readDatabase() {
  fs.readFile(fileName, "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
      console.log("Please make a copy of old Data as soon as possible!");
      console.log("Creating New File!");
      oldData = createNewFile();
      fileChanged = false;
    } else {
      console.log("Reading Old Data!");
      oldData = JSON.parse(data);
      fileChanged = false;
    }
  });
}

// File Writing Function------------
function writeDatabase(newData) {
  fs.writeFile(fileName, JSON.stringify(newData, null, 2), err => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("File Successfully Saved");
      fileChanged = false;
    }
  });
}

//-----Initiated data----------------
function createNewFile() {
  var initiatedData = {
    database: [
      {
        tasks: {
          totalTasks: 0,
          allTasks: [
            {
              taskType: 0,
              taskCards: []
            },
            {
              taskType: 1,
              taskCards: []
            }
          ]
        }
      }
    ]
  };
  return initiatedData;
}

//=========================================================================
//--------------------------------TASKS------------------------------------

//--------- For Sending Updated Tasks List----------

function updateTasks(type, data) {
  const res = data.database[0].tasks.allTasks[type];
  if (type == 0) mainWindow.webContents.send("dailiesTasks", res);
  else if (type == 1) mainWindow.webContents.send("kanbanTasks", res);
}

//----------All Tasks List Request---------
ipcMain.on("allTasks", (event, type) => {
  updateTasks(type, oldData);
});

//-----------New Task Request---------------
ipcMain.on("newTaskCard", (event, value) => {
  var tasks = oldData.database[0].tasks;
  tasks.totalTasks = tasks.totalTasks + 1;
  tasks.allTasks[value.taskType].taskCards.push({
    title: value.title,
    dateCreated: value.dateCreated
  });

  fileChanged = true;
  updateTasks(value.taskType, oldData);
});
