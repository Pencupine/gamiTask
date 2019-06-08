import React, { Component } from "react";
import { Callout } from "@blueprintjs/core";
import TaskCards from "./TaskCards";
import NewTaskCard from "./NewTaskCard";
import { ipcRenderer } from "electron";

export default class DailiesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: [],
      taskCards: []
    };
  }

  render() {
    // ------------To Recieve New Tasks List------------------------
    ipcRenderer.on("dailiesTasks", (event, data) => {
      this.setState({ taskCards: data.tasksData.taskCards, order: data.order });
    });

    // -------------To Handle Changes in the List Order--------------

    $(document).ready(function() {
      $(".sortableDailies").sortable();
    });

    $(".sortableDailies").one("sortupdate", event => {
      var sortedIDs = $(".sortableDailies").sortable("toArray");
      var i;
      var sortedIDsInt = [];
      for (i = 0; i < sortedIDs.length; i++) {
        sortedIDsInt.push(parseInt(sortedIDs[i]));
      }
      console.log(sortedIDsInt);

      var newTaskCardsState = [];
      var oldTaskCardsState = this.state.taskCards;
      for (i = 0; i < sortedIDsInt.length; i++) {
        newTaskCardsState.push(
          oldTaskCardsState.find(taskCard => {
            if (taskCard.taskID == sortedIDsInt[i]) return taskCard;
          })
        );
      }

      this.setState({ order: sortedIDsInt, taskCards: newTaskCardsState });

      ipcRenderer.send("setNewTaskCardOrder", {
        taskType: 0,
        colOrder: sortedIDsInt,
        taskCards: this.state.taskCards
      });
    });

    const taskCards = this.state.taskCards;
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
