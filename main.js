// Modules to control application life
const { app, BrowserWindow, ipcMain } = require("electron");
const url = require("url");
const path = require("path");
const isDev = require("electron-is-dev");

const dbConnection = require("./services/database/dbConnection");

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
//
//
// Entry Message
require("./services/stupidConsoleMessages").entryMessage();
//
//
// ================================================================================================
//                                           ELECTRON APP
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
//                                        WINDOW OPERATIONS
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
  dbConnection.disconnect(alphaData, setFileChangedVal);
  if (process.platform !== "darwin") app.quit();

  require("./services/stupidConsoleMessages").exitMessage();
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

const taskListAPI = require("./services/tasks/taskListAPI");

//------------Get Tasks List Request----------------
ipcMain.on("allDailiesTasks", (event, type) => {
  taskListAPI.updateTasks(alphaData, 0, mainWindow);
});

ipcMain.on("allKanbanTasks", (event, type) => {
  taskListAPI.updateTasks(alphaData, 1, mainWindow);
});

//----------------New Task Request-------------------
ipcMain.on("newTaskCard", (event, value) => {
  taskListAPI.newTaskCard(alphaData, value, setAlphaData);
  taskListAPI.updateTasks(alphaData, value.taskType, mainWindow);

  setFileChangedVal(true);
});

// ----------------Remove Task Request-----------------
ipcMain.on("removeTaskCard", (event, value) => {
  var updatedListType = taskListAPI.removeTaskCard(
    alphaData,
    value,
    setAlphaData
  );

  taskListAPI.updateTasks(alphaData, updatedListType, mainWindow);

  setFileChangedVal(true);
});

//------------To reorder Multilist----------------------------
ipcMain.on("setNewTaskCardOrder", (event, value) => {
  console.log("Sort Request");

  const taskType = value.taskType;
  const result = value.result;

  if (taskType == 0)
    taskListAPI.reorderDailiesList(alphaData, result, setAlphaData);
  if (taskType == 1)
    taskListAPI.reorderKanbanList(alphaData, result, setAlphaData);

  taskListAPI.updateTasks(alphaData, value.taskType, mainWindow);

  setFileChangedVal(true);
});

//===============================================================================
//--------------------------------TASKS SCORES-----------------------------------

const taskProgressAPI = require("./services/tasks/taskProgressAPI");

ipcMain.on("allTaskProgressScores", (event, type) => {
  taskProgressAPI.updateTasks(alphaData, 0, mainWindow);
});

//===============================================================================
//------------------------------------TAGS---------------------------------------
var tags = [
  {
      tagID: 1,
      tagType: 'time',
      title: 'When',
      priority: 1,
      subTags: [2, 3, 4]
  },
  {
      tagID: 2,
      tagType: 'time',
      title: 'Morning',
      priority: 2,
      subTags: [6]
  },
  {
      tagID: 3,
      tagType: 'time',
      title: 'Evening',
      priority: 2,
      subTags: [5, 7, 8]
  },
  {
      tagID: 4,
      tagType: 'time',
      title: 'Night',
      priority: 2,
      subTags: []
  },
  {
      tagID: 5,
      tagType: 'time',
      title: 'Dusk',
      priority: 3,
      subTags: []
  },
  {
      tagID: 6,
      tagType: 'time',
      title: 'Dawn',
      priority: 3,
      subTags: []
  },
  {
      tagID: 7,
      tagType: 'time',
      title: '5pm',
      priority: 3,
      subTags: []
  },
  {
      tagID: 8,
      tagType: 'time',
      title: '6pm',
      priority: 3,
      subTags: []
  },
  {
      tagID: 9,
      tagType: 'where',
      title: 'Home',
      priority: 1,
      subTags: []
  },
]

var premiumTags = [1, 9];

ipcMain.on('getAllTags', (event, val) => {
  mainWindow.webContents.send('allTags', {
    tags: tags,
    premiumTags: premiumTags
  })
})