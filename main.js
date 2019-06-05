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
  writeDatabase(alphaData);
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
const fileName = `C:/Users/LENOVO/Documents/gamiTask/data.json`;
if (!fs.existsSync("C:/Users/LENOVO/Documents/gamiTask"))
  fs.mkdir("C:/Users/LENOVO/Documents/gamiTask", err => {
    if (err) console.log(err.message);
    else console.log("Folder Successfully Created!");
  });
// ------------------------------------
var alphaData;
var fileChanged = false;

readDatabase();

setInterval(checkForChanges, 10000);

// Change Checker----------------

var timeAfterSaving = 0;
function checkForChanges() {
  if (fileChanged === true) {
    writeDatabase(alphaData);
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
      alphaData = createNewFile();
      console.log(alphaData);
      fileChanged = false;
    } else {
      console.log("Reading Old Data!");
      alphaData = JSON.parse(data);
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
              kanbanCards: [
                {
                  kanbanType: 0,
                  taskCards: []
                },
                {
                  kanbanType: 1,
                  taskCards: []
                },
                {
                  kanbanType: 2,
                  taskCards: []
                }
              ]
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

//--------------Tasks List Request---------------
ipcMain.on("allDailiesTasks", (event, type) => {
  updateTasks(0, alphaData);
});

ipcMain.on("allKanbanTasks", (event, type) => {
  updateTasks(1, alphaData);
});

//-----------New Task Request---------------
ipcMain.on("newTaskCard", (event, value) => {
  var tasks = alphaData.database[0].tasks;
  tasks.totalTasks = tasks.totalTasks + 1;
  var taskStack =
    value.taskType == 0
      ? tasks.allTasks[0].taskCards
      : tasks.allTasks[1].kanbanCards[value.kanbanType].taskCards;
  taskStack.push({
    taskID: tasks.totalTasks,
    title: value.title,
    dateCreated: value.dateCreated
  });

  fileChanged = true;
  updateTasks(value.taskType, alphaData);
});

// -----------Sort Dailies Task Request---------------
var count = 0;
ipcMain.on("sortTaskCard", (event, value) => {
  console.log("new Sort Request");
  var tasks = alphaData.database[0].tasks;
  var taskCards = tasks.allTasks[value.taskType].taskCards;
  console.log(taskCards);
  var i;
  var newTaskCardsArray = [];
  var newOrder = [];
  for (i = 0; i < value.order.length; i++) {
    var obj = taskCards.find(taskCard => {
      if (taskCard.taskID === value.order[i]) {
        return taskCard;
      }
    });
    newTaskCardsArray.push(obj);
    newOrder.push(obj.taskID);
  }
  console.log(count++);
  console.log(newTaskCardsArray);

  for (i = 0; i < taskCards.length; i++) {
    taskCards[i] = newTaskCardsArray[i];
  }
  fileChanged = true;
  // updateTasks(value.taskType, alphaData);
});

// -------------Sort Kanban Task Request----------------
var kanbanColFlag = [false, false, false];
var kanbanColOrder = [[], [], []];
// kanbanNewOrder = [{},{},{}];
ipcMain.on("sortKanbanTaskColumn", (event, value) => {
  kanbanColFlag[value.kanbanType] = true;
  kanbanColOrder[value.kanbanType] = value.colOrder;
  console.log(value.colOrder);

  if (kanbanColFlag[0] && kanbanColFlag[1]) {
    console.log(kanbanColOrder);
    console.log(kanbanColFlag);
    sortAndSaveNewColumns(0, 1, kanbanColOrder[0], kanbanColOrder[1]);
    kanbanColFlag = [false, false, false];
    kanbanColOrder = [[], [], []];
  }
  if (kanbanColFlag[1] && kanbanColFlag[2]) {
    console.log(kanbanColOrder);
    console.log(kanbanColFlag);
    sortAndSaveNewColumns(1, 2, kanbanColOrder[1], kanbanColOrder[2]);
    kanbanColFlag = [false, false, false];
    kanbanColOrder = [[], [], []];
  }
});

function sortAndSaveNewColumns(a, b, order_a, order_b) {
  var kanbanCards = alphaData.database[0].tasks.allTasks[1].kanbanCards;
  var newKanbanOrder = [[], [], []];
  var i;
  console.log("a : " + a);
  console.log("b : " + b);
  console.log("order_a : " + order_a);
  console.log("order_b : " + order_b);

  var taskObj;
  for (i = 0; i < order_a.length; i++) {
    taskObj = undefined;

    if (kanbanCards[a].taskCards[0] !== undefined)
      taskObj = kanbanCards[a].taskCards.find(taskCard => {
        if (taskCard.taskID == order_a[i]) return taskCard;
      });
    if (taskObj == undefined)
      if (kanbanCards[b].taskCards[0] !== undefined)
        taskObj = kanbanCards[b].taskCards.find(taskCard => {
          if (taskCard.taskID == order_a[i]) return taskCard;
        });
    newKanbanOrder[a].push(taskObj);
  }

  for (i = 0; i < order_b.length; i++) {
    taskObj = undefined;

    if (kanbanCards[a].taskCards[0] !== undefined)
      taskObj = kanbanCards[a].taskCards.find(taskCard => {
        if (taskCard.taskID == order_b[i]) return taskCard;
      });
    if (taskObj == undefined)
      if (kanbanCards[b].taskCards[0] !== undefined)
        taskObj = kanbanCards[b].taskCards.find(taskCard => {
          if (taskCard.taskID == order_b[i]) return taskCard;
        });
    newKanbanOrder[b].push(taskObj);
  }
  console.log(newKanbanOrder);

  kanbanCards[a].taskCards = newKanbanOrder[a];
  kanbanCards[b].taskCards = newKanbanOrder[b];

  newKanbanOrder = [[], [], []];
  fileChanged = true;
}
