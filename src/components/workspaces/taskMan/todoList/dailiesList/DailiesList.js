import React, { Component } from "react";
import { ipcRenderer } from "electron";
import { DragDropContext } from "react-beautiful-dnd";

import Column from "../../column/Column";

export default class DailiesList extends Component {
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
          title: "My Dailies",
          taskIDs: []
        }
      },
      columnOrder: ["0"]
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

    // Sending backend reorder information
    ipcRenderer.send("setNewTaskCardOrder", {
      taskType: 0,
      result: result
    });

    this.setState(newState);
    return;
  };

  render() {
    // RECIEVING AND SETTING UPDATED LIST------------------------

    ipcRenderer.on("dailiesTasks", (event, data) => {
      var taskCards = data.tasksData.taskCards;

      var defaultStructure = this.getDefaultStructure();
      var tasks = defaultStructure.tasks;
      var columns = defaultStructure.columns;

      for (var i = 0; i < taskCards.length; i++) {
        tasks[taskCards[i].taskID] = taskCards[i];

        columns["0"].taskIDs.push(taskCards[i].taskID);
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
      <div>
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
                taskType={0}
              />
            );
          })}
        </DragDropContext>
      </div>
    );
  }
}
