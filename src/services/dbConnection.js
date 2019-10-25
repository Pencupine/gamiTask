const fs = require("fs");

// Database File URL-------------------
const fileName = `${process.env.LOCALAPPDATA}/gamiTask/data.json`;

// Folder Check ----------------------- (To check if the folder exists)
function folderCheck() {
  if (!fs.existsSync(`${process.env.LOCALAPPDATA}/gamiTask`))
    fs.mkdir(`${process.env.LOCALAPPDATA}/gamiTask`, err => {
      if (err) console.log(err.message);
      else console.log("Folder Successfully Created!");
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

// File Reader Function-----------
function readDatabase(setAlphaInMain) {
  fs.readFile(fileName, "utf-8", (err, data) => {
    var alphaData;
    if (err) {
      console.log(err.message);
      console.log("Please make a copy of old Data as soon as possible!");
      console.log("Creating New File!");
      alphaData = createNewFile();
      console.log(alphaData);
      setAlphaInMain(alphaData);
    } else {
      console.log("Reading Old Data!");
      alphaData = JSON.parse(data);
      setAlphaInMain(alphaData);
    }
  });
}

// File Writer Function------------
function writeDatabase(newData, setFileChangedVal) {
  fs.writeFile(fileName, JSON.stringify(newData, null, 2), err => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("File Successfully Saved");
      setFileChangedVal(false);
    }
  });
}

// Change Checker---------------------------------------------------------------------------------
var timeAfterSaving = 0;
function checkForChanges(fileChanged, newData, setFileChangedVal) {
  if (fileChanged === true) {
    writeDatabase(newData, setFileChangedVal);
    timeAfterSaving = 0;
  } else {
    timeAfterSaving = timeAfterSaving + 1;
    console.log(". " + timeAfterSaving);
  }
}

// Establish Database Connection Function----------------------------------------------------------
function connect(setAlphaInMain) {
  console.log("Connecting to Database...");
  folderCheck();
  readDatabase(setAlphaInMain);
  return;
}

// Disconnect Database Connection Function----------------------------------------------------------
function disconnect(newData, setFileChangedVal) {
  console.log("Disconnecting from Database...");
  writeDatabase(newData, setFileChangedVal);
  return;
}

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
// Exporting Functions -------------
exports.connect = connect;
exports.disconnect = disconnect;
exports.checkForChanges = checkForChanges;
