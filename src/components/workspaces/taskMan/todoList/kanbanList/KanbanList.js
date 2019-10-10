import React, { Component } from "react";
import { ipcRenderer } from "electron";
import { DragDropContext } from "react-beautiful-dnd";

import Column from "../../column/Column";

export default class KanbanList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskStructure: this.getDefaultStructure()
    };
  }

  getDefaultStructure = () => {
    return {
      tasks: {},
      columns: {
        "0": {
          id: "0",
          title: "Todo",
          taskIDs: []
        },
        "1": {
          id: "1",
          title: "Doing",
          taskIDs: []
        },
        "2": {
          id: "2",
          title: "Done",
          taskIDs: []
        }
      },
      columnOrder: ["0", "1", "2"]
    };
  };

  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    var newState = {};

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = this.state.taskStructure.columns[source.droppableId];
    const finishColumn = this.state.taskStructure.columns[
      destination.droppableId
    ];

    // Reordering in the same list-----------
    if (startColumn == finishColumn) {
      const column = this.state.taskStructure.columns[source.droppableId];

      const newTaskIDs = Array.from(column.taskIDs);
      newTaskIDs.splice(source.index, 1);
      newTaskIDs.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...column,
        taskIDs: newTaskIDs
      };

      newState = {
        ...this.state,
        taskStructure: {
          ...this.state.taskStructure,
          columns: {
            ...this.state.taskStructure.columns,
            [newColumn.id]: newColumn
          }
        }
      };

      ipcRenderer.send("setNewTaskCardOrder", {
        taskType: 1,
        result: result
      });

      this.setState(newState);
      return;
    }

    // Reordering between lists-----------
    const startTaskIDs = Array.from(startColumn.taskIDs);
    startTaskIDs.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      taskIDs: startTaskIDs
    };

    const finishTaskIDs = Array.from(finishColumn.taskIDs);
    finishTaskIDs.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finishColumn,
      taskIDs: finishTaskIDs
    };

    newState = {
      ...this.state,
      taskStructure: {
        ...this.state.taskStructure,
        columns: {
          ...this.state.taskStructure.columns,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn
        }
      }
    };

    // Sending backend reorder information
    ipcRenderer.send("setNewTaskCardOrder", {
      taskType: 1,
      result: result
    });

    this.setState(newState);
    return;
  };

  render() {
    // RECIEVING AND SETTING UPDATED LIST------------------------

    ipcRenderer.on("kanbanTasks", (event, data) => {
      const kanbanCards = data.tasksData.kanbanCards;

      var defaultStructure = this.getDefaultStructure();
      var tasks = defaultStructure.tasks;
      var columns = defaultStructure.columns;
      var columnObj;

      for (var i = 0; i < 3; i++) {
        columnObj =
          i == 0 ? columns["0"] : i == 1 ? columns["1"] : columns["2"];

        for (var j = 0; j < kanbanCards[i].taskCards.length; j++) {
          tasks[kanbanCards[i].taskCards[j].taskID] =
            kanbanCards[i].taskCards[j];

          columnObj.taskIDs.push(kanbanCards[i].taskCards[j].taskID);
        }
      }

      this.setState({
        taskStructure: {
          tasks: tasks,
          columns: columns,
          columnOrder: defaultStructure.columnOrder
        }
      });
    });

    return (
      <div
        style={{
          display: "flex",
          alignContent: "flex-start"
        }}
      >
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.state.taskStructure.columnOrder.map(columnID => {
            const column = this.state.taskStructure.columns[columnID];
            const tasks = column.taskIDs.map(
              taskID => this.state.taskStructure.tasks[taskID]
            );
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                taskType={1}
              />
            );
          })}
        </DragDropContext>
      </div>
    );
  }
}
