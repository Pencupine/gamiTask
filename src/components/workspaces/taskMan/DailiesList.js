import React, { Component } from "react";
import { Callout } from "@blueprintjs/core";
import TaskCards from "./TaskCards";
import NewTaskCard from "./NewTaskCard";
import { ipcRenderer } from "electron";

export default class DailiesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasksData: []
    };
  }

  componentWillMount() {
    console.log("Will Mount");
    ipcRenderer.send("allDailiesTasks", true);
  }

  render() {
    var oldTaskCardStates = this.state.tasksData;

    // -------------To Handle Changes in the List Order--------------
    $(document).ready(function() {
      $(".sortableDailies").sortable();
    });
    $(".sortableDailies").on("sortupdate", function(event, ui) {
      var sortedIDs = $(".sortableDailies").sortable("toArray");
      var i;
      var sortedIDsInt = [];
      for (i = 0; i < sortedIDs.length; i++) {
        sortedIDsInt.push(parseInt(sortedIDs[i]));
      }
      // console.log(sortedIDsInt);
      ipcRenderer.send("sortTaskCard", {
        taskType: 0,
        order: sortedIDsInt
      });

      var newTaskCardStates = [];
      for (i = 0; i < sortedIDs.length; i++) {
        newTaskCardStates.push(
          oldTaskCardStates.find(oldTaskCard => {
            if (oldTaskCard.taskID == sortedIDsInt[i]) return oldTaskCard;
          })
        );
      }
      // stateChange(newTaskCardStates);
    });

    ipcRenderer.on("dailiesTasks", (event, data) => {
      // console.log(data);
      this.setState({ tasksData: data.taskCards });
    });

    const taskCards = this.state.tasksData;
    var i = 0;
    var TasksList = taskCards.map(taskCard => {
      return (
        <li key={taskCard.taskID} id={taskCard.taskID} draggable="true">
          <TaskCards taskCardData={taskCard} />
        </li>
      );
    });

    return (
      <div>
        <Callout title="My Dailies">
          <ul
            className="sortableDailies"
            style={{
              listStyleType: "none",
              listStylePosition: "inside",
              padding: "0",
              margin: "0",
              maxBlockSize: "54vh",
              overflow: "auto",
              minHeight: "10px"
            }}
          >
            {TasksList}
          </ul>
          <NewTaskCard />
        </Callout>
      </div>
    );
  }
}
