//--------- For Sending Updated Tasks List----------
function updateTasks(alphaData, type, mainWindow) {
  var tasksData = alphaData.database[0].tasks.allTasks[type];
  // var order = alphaDsata.database[0].tasks.order[type];
  var res = {
    // order: order,
    tasksData: tasksData
  };
  if (type == 0) mainWindow.webContents.send("dailiesTasks", res);
  else if (type == 1) mainWindow.webContents.send("kanbanTasks", res);
}

//----------For Addition of new Task Card into a list------------
function newTaskCard(alphaData, value, setAlphaData) {
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

  // Updating new alphaData
  setAlphaData(alphaData);

  return;
}

// ----------For removal of a task card from a list-----------
function removeTaskCard(alphaData, value, setAlphaData) {
  console.log("Remove");
  alphaData.database[0].tasks.totalTasks =
    alphaData.database[0].tasks.totalTasks - 1;
  var order = alphaData.database[0].tasks.order;
  var i;
  for (i = 0; i < order[0].length; i++) {
    if (order[0][i] == value) {
      console.log("Remove request in Dailies at " + i);
      var taskCards = alphaData.database[0].tasks.allTasks[0].taskCards;
      taskCards.splice(i, 1);
      order[0].splice(i, 1);

      setAlphaData(alphaData);

      return 0;
    }
  }

  for (i = 0; i < 3; i++) {
    if (order[1][i] !== undefined) {
      console.log("Remove request at:" + i);
      var j;
      for (j = 0; j < order[1][i].length; j++) {
        console.log(order[1][i]);
        if (order[1][i][j] == value) {
          console.log("Remove request in Kanban at:" + i + "," + j);
          var taskCards =
            alphaData.database[0].tasks.allTasks[1].kanbanCards[i].taskCards;
          taskCards.splice(j, 1);
          order[1][i].splice(j, 1);

          setAlphaData(alphaData);

          return 1;
        }
      }
    }
  }
}

//-----------For Reordering Kanban List D n D-------------------
function reorderKanbanList(alphaData, result, setAlphaData) {
  var startCol =
    alphaData.database[0].tasks.allTasks[1].kanbanCards[
      result.source.droppableId
    ].taskCards;
  var finishCol =
    alphaData.database[0].tasks.allTasks[1].kanbanCards[
      result.destination.droppableId
    ].taskCards;

  var startOrderCol =
    alphaData.database[0].tasks.order[1][result.source.droppableId];
  var finishOrderCol =
    alphaData.database[0].tasks.order[1][result.destination.droppableId];

  var reorderedTaskCard = startCol[result.source.index];

  // TO handle intra list reorder
  if (startCol === finishCol) {
    // console.log("samelist request");
    var col = startCol;
    var orderCol = startOrderCol;

    col.splice(result.source.index, 1);
    col.splice(result.destination.index, 0, reorderedTaskCard);
    // console.log(col);

    orderCol.splice(result.source.index, 1);
    orderCol.splice(result.destination.index, 0, reorderedTaskCard.taskID);
    // console.log(orderCol);
  } else {
    // To handle inter list reorder
    startCol.splice(result.source.index, 1);
    finishCol.splice(result.destination.index, 0, reorderedTaskCard);
    // console.log(startCol);
    // console.log(finishCol);

    startOrderCol.splice(result.source.index, 1);
    finishOrderCol.splice(
      result.destination.index,
      0,
      reorderedTaskCard.taskID
    );
    // console.log(startOrderCol);
    // console.log(finishOrderCol);
  }

  setAlphaData(alphaData);

  return;
}

// ------------For reordering Dailies List------------------
function reorderDailiesList(alphaData, result, setAlphaData) {
  var col = alphaData.database[0].tasks.allTasks[0].taskCards;
  var orderCol = alphaData.database[0].tasks.order[0];

  var reorderedTaskCard =
    alphaData.database[0].tasks.allTasks[0].taskCards[result.source.index];

  col.splice(result.source.index, 1);
  col.splice(result.destination.index, 0, reorderedTaskCard);
  // console.log(col);

  orderCol.splice(result.source.index, 1);
  orderCol.splice(result.destination.index, 0, reorderedTaskCard.taskID);

  setAlphaData(alphaData);

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
// -------------------- Exporting Functions-----------------------

exports.updateTasks = updateTasks;
exports.newTaskCard = newTaskCard;
exports.removeTaskCard = removeTaskCard;
exports.reorderKanbanList = reorderKanbanList;
exports.reorderDailiesList = reorderDailiesList;
