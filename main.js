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

// File Writer Function------------
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
          nextTaskID: 0,
          order: [[], [[], [], []]],
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

//

//

//

//

//

//=========================================================================
//--------------------------------TASKS------------------------------------

//--------- For Sending Updated Tasks List----------

function updateTasks(type) {
  var tasksData = alphaData.database[0].tasks.allTasks[type];
  var order = alphaData.database[0].tasks.order[type];
  var res = {
    order: order,
    tasksData: tasksData
  };
  if (type == 0) mainWindow.webContents.send("dailiesTasks", res);
  else if (type == 1) mainWindow.webContents.send("kanbanTasks", res);
}

//------------Get Tasks List Request----------------
ipcMain.on("allDailiesTasks", (event, type) => {
  console.log("updating Dailies");
  updateTasks(0);
});

ipcMain.on("allKanbanTasks", (event, type) => {
  updateTasks(1);
});

//----------------New Task Request-------------------
ipcMain.on("newTaskCard", (event, value) => {
  var tasks = alphaData.database[0].tasks;
  tasks.totalTasks = tasks.totalTasks + 1;
  tasks.nextTaskID = tasks.nextTaskID + 1;

  var taskStack =
    value.taskType == 0
      ? tasks.allTasks[0].taskCards
      : tasks.allTasks[1].kanbanCards[value.kanbanType].taskCards;
  taskStack.push({
    taskID: tasks.nextTaskID,
    title: value.title,
    dateCreated: value.dateCreated
  });

  if (value.taskType == 0) {
    tasks.order[0].push(tasks.nextTaskID);
  } else if (value.taskType == 1) {
    tasks.order[1][value.kanbanType].push(tasks.nextTaskID);
  }

  updateTasks(value.taskType);
  fileChanged = true;
});

// ----------------Remove Task Request-----------------
ipcMain.on("removeTaskCard", (event, value) => {
  alphaData.database[0].tasks.totalTasks =
    alphaData.database[0].tasks.totalTasks - 1;
  var order = alphaData.database[0].tasks.order;
  var i;
  for (i = 0; i < order[0].length; i++) {
    if (order[0][i] == value) {
      console.log("Remove request");
      var taskCards = alphaData.database[0].tasks.allTasks[0].taskCards;
      taskCards.splice(i, 1);
      order[0].splice(i, 1);
      fileChanged = true;
      // updateTasks(0);
      // return;
    }
  }
  for (i = 0; i < 3; i++) {
    if (order[1][i] !== undefined) {
      var j;
      for (j = 0; j < order[1][i].length; j++) {
        if (order[1][i][j] == value) {
          console.log("Remove request at:" + i + "," + j);
          // var taskCards =
          //   alphaData.database[0].tasks.allTasks[1].kanbanCards[i].taskCards;
          // taskCards.splice(j, 1);
          // order[1][i].splice(j, 1);
          // fileChanged = true;
          //         // updateTasks(1);
          // return;
        }
      }
    }
  }
});

// --------------Sort Task Request-------------------
var kanbanColFlag = [false, false, false];
var kanbanColOrder = [[], [], []];
ipcMain.on("sortTaskCard", (event, value) => {
  if (value.taskType == 0) {
    reorderCards(value);
    return;
  } else if (value.taskType == 1) {
    var taskCards =
      alphaData.database[0].tasks.allTasks[1].kanbanCards[value.kanbanType]
        .taskCards;
    if (value.colOrder.length === taskCards.length) {
      reorderCards(value);
      return;
    }
    kanbanColFlag[value.kanbanType] = true;
    kanbanColOrder[value.kanbanType] = value.colOrder;

    if (kanbanColFlag[0] && kanbanColFlag[1]) {
      sortAndSaveNewColumns(0, 1, kanbanColOrder[0], kanbanColOrder[1]);
      // updateTasks(1);
      kanbanColFlag = [false, false, false];
      kanbanColOrder = [[], [], []];
    }
    if (kanbanColFlag[1] && kanbanColFlag[2]) {
      sortAndSaveNewColumns(1, 2, kanbanColOrder[1], kanbanColOrder[2]);
      // updateTasks(1);
      kanbanColFlag = [false, false, false];
      kanbanColOrder = [[], [], []];
    }
  }
});

ipcMain.on("setNewTaskCardOrder", (event, value) => {
  console.log("Sort Request");
  if (value.taskType == 0) {
    alphaData.database[0].tasks.allTasks[0].taskCards = value.taskCards;
  } else if (value.taskType == 1) {
    alphaData.database[0].tasks.allTasks[1].kanbanCards = value.taskCards;
  }
  alphaData.database[0].tasks.order[value.taskType] = value.colOrder;

  fileChanged = true;
});

// ReorderCards In different columns---------------------------

function sortAndSaveNewColumns(a, b, order_a, order_b) {
  var kanbanCards = alphaData.database[0].tasks.allTasks[1].kanbanCards;
  var newKanbanOrder = [[], [], []];
  var i;

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

  alphaData.database[0].tasks.order[1][a] = order_a;
  alphaData.database[0].tasks.order[1][b] = order_b;

  newKanbanOrder = [[], [], []];
  fileChanged = true;
  // updateTasks(1);
  return;
}

// Reorder Cards In same column Function ------------------------------

function reorderCards(value) {
  if (value.taskType == 0) {
    var taskCards = alphaData.database[0].tasks.allTasks[0].taskCards;
    alphaData.database[0].tasks.order[0] = value.colOrder;
  } else if (value.taskType == 1) {
    var taskCards =
      alphaData.database[0].tasks.allTasks[1].kanbanCards[value.kanbanType]
        .taskCards;
    alphaData.database[0].tasks.order[1][value.kanbanType] = value.colOrder;
  }

  var i;
  var newTaskCardsArray = [];
  for (i = 0; i < value.colOrder.length; i++) {
    var obj = taskCards.find(taskCard => {
      if (taskCard.taskID === value.colOrder[i]) {
        return taskCard;
      }
    });
    newTaskCardsArray.push(obj);
  }

  for (i = 0; i < taskCards.length; i++) {
    taskCards[i] = newTaskCardsArray[i];
  }
  fileChanged = true;
  // updateTasks(value.taskType);
  return;
}

// ARRAY NODEFINDER 5000---------------------------------------
// function NODE_FINDER(data, request, val){
//   // if (data === val) return { found : true };
//   if(typeof data === Object){
//     if (data.taskID !== undefined){

//     }
//     arrayOfKeys = data.keys();
//     var i;
//     var obj;
//     for(i =0; i<arrayOfKeys.length; i++){
//       obj = NODE_FINDER(data[arrayOfKeys[i]], request, val);
//       if(obj.found !== undefined && obj.found === true);
//         return {
//           dataFound: true
//         };
//     }
//   }
//   else if(typeof data === Array){
//     // for
//   }
// }
