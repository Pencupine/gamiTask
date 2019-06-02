// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const url = require("url");
const path = require("path");
const isDev = require("electron-is-dev");
const fs = require("fs");

// require("fileAPI.js`");

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
// Window operations
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

// FOR CRUD API --------------------------------------------------------------------------------------
const fileName = `../data.json`;

var oldData;
var fileChanged = false;

readDatabase();

setInterval(checkForChanges, 10000);

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
      console.log(oldData);
      fileChanged = false;
    }
  });
}

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

ipcMain.on("newTaskCard", (event, value) => {
  var tasks = oldData.database[0].tasks;
  // fs.readFile(fileName, "utf-8", (err, data) => {
  //   if (err) {
  //     oldData = createNewFile();
  //     console.log(oldData);

  //     var tasks = oldData.tasks;
  tasks.totalTasks = tasks.totalTasks + 1;
  tasks.allTasks[value.taskType].taskCards.push({
    title: value.title,
    dateCreated: value.dateCreated
  });
  fileChanged = true;
  updateTasks(value.taskType, oldData);

  //     fs.writeFile(fileName, JSON.stringify(oldData, null, 2), err => {
  //       if (err) {
  //         console.log(err.message);
  //       } else {
  //         console.log("File Successfully Created");
  //         fs.readFile(fileName, "utf-8", (err, data) => {
  //           if (err) {
  //             console.log(err.message);
  //           } else {
  //             console.log(JSON.parse(data));
  //             updateTasks(value.taskType, oldData);
  //           }
  //         });
  //       }
  //     });
  //   } else {
  //     oldData = JSON.parse(data);
  //     console.log(oldData);
  //     var tasks = oldData.tasks;
  //     tasks.totalTasks = tasks.totalTasks + 1;
  //     tasks.allTasks[value.taskType].taskCards.push({
  //       cardID: tasks.totalTasks,
  //       title: value.title,
  //       dateCreated: value.dateCreated
  //     });
  //     fs.writeFile(fileName, JSON.stringify(oldData, null, 2), err => {
  //       if (err) {
  //         console.log(err.message);
  //       } else {
  //         console.log("File Successfully Created");
  //         fs.readFile(fileName, "utf-8", (err, data) => {
  //           if (err) {
  //             console.log(err.message);
  //           } else {
  //             console.log(JSON.parse(data));
  //             updateTasks(value.taskType, oldData);
  //           }
  //         });
  //       }
  //     });
  //   }
  // });
});

function updateTasks(type, data) {
  const res = data.database[0].tasks.allTasks[type];
  if (type == 0) mainWindow.webContents.send("dailiesTasks", res);
  else if (type == 1) mainWindow.webContents.send("kanbanTasks", res);
}

ipcMain.on("allTasks", (event, type) => {
  // fs.readFile(fileName, "utf-8", (err, data) => {
  // if (err) {
  // mainWindow.webContents.send("allTasks", err);
  // } else {
  // const jsonData = JSON.parse(data);
  updateTasks(type, oldData);
  // }
  // });
});
