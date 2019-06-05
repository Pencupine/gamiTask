import React, { Component } from "react";
import { Callout } from "@blueprintjs/core";
import TaskCards from "./TaskCards";
import NewKanbanCard from "./NewKanbanCard";
import { ipcRenderer } from "electron";

export default class KanbanList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kanbanData: [{}, {}, {}],
      todoFlag: false,
      doingFlag: false,
      doneFlag: false
    };
  }
  componentWillMount() {
    console.log("Will Mount");
    ipcRenderer.send("allKanbanTasks", true);
  }

  render() {
    // var { kanbanData } = this.state;
    $(document).ready(function() {
      $(".sortableTodo").sortable({
        connectWith: ".sortableDoing"
      });
      $(".sortableDoing").sortable({
        connectWith: [".sortableTodo", ".sortableDone"]
      });
      $(".sortableDone").sortable({
        connectWith: ".sortableDoing"
      });
    });

    $(".sortableTodo").on("sortupdate", function(event, ui) {
      var sortedTodoIDsInt = [];
      var sortedTodoIDs = $(".sortableTodo").sortable("toArray");
      // console.log(sortedTodoIDs);
      var i;
      for (i = 0; i < sortedTodoIDs.length; i++) {
        if (sortedTodoIDs[i] == "") continue;
        sortedTodoIDsInt.push(parseInt(sortedTodoIDs[i]));
      }

      console.log(sortedTodoIDsInt);
      ipcRenderer.send("sortKanbanTaskColumn", {
        kanbanType: 0,
        colOrder: sortedTodoIDsInt
      });
    });

    $(".sortableDoing").on("sortupdate", function(event, ui) {
      var sortedDoingIDsInt = [];
      var sortedDoingIDs = $(".sortableDoing").sortable("toArray");
      // console.log(sortedDoingIDs);
      var i;
      for (i = 0; i < sortedDoingIDs.length; i++) {
        if (sortedDoingIDs[i] == "") continue;
        sortedDoingIDsInt.push(parseInt(sortedDoingIDs[i]));
      }

      console.log(sortedDoingIDsInt);
      ipcRenderer.send("sortKanbanTaskColumn", {
        kanbanType: 1,
        colOrder: sortedDoingIDsInt
      });
    });

    $(".sortableDone").on("sortupdate", function(event, ui) {
      var sortedDoneIDsInt = [];
      var sortedDoneIDs = $(".sortableDone").sortable("toArray");
      // console.log(sortedDoneIDs);
      var i;
      for (i = 0; i < sortedDoneIDs.length; i++) {
        if (sortedDoneIDs[i] == "") continue;
        sortedDoneIDsInt.push(parseInt(sortedDoneIDs[i]));
      }

      console.log(sortedDoneIDsInt);
      ipcRenderer.send("sortKanbanTaskColumn", {
        kanbanType: 2,
        colOrder: sortedDoneIDsInt
      });
    });

    // RECIEVING AND SETTING UPDATED LIST------------------------
    ipcRenderer.on("kanbanTasks", (event, data) => {
      const cardsArray = data.kanbanCards;
      this.setState({
        kanbanData: cardsArray
      });
    });

    var TodoList = <div />;
    var DoingList = <div />;
    var DoneList = <div />;
    const { kanbanData } = this.state;

    if (kanbanData[0].taskCards !== undefined) {
      if (kanbanData[0].taskCards[0] !== undefined) {
        var todoCards = kanbanData[0].taskCards;
        TodoList = todoCards.map(todoCard => {
          return (
            <li key={todoCard.taskID} id={todoCard.taskID} draggable="true">
              <TaskCards taskCardData={todoCard} />
            </li>
          );
        });
      }
    }

    if (kanbanData[1].taskCards !== undefined) {
      if (kanbanData[1].taskCards[0] !== undefined) {
        var doingCards = kanbanData[1].taskCards;
        DoingList = doingCards.map(doingCard => {
          return (
            <li key={doingCard.taskID} id={doingCard.taskID} draggable="true">
              <TaskCards taskCardData={doingCard} />
            </li>
          );
        });
      }
    }

    if (kanbanData[2].taskCards !== undefined) {
      if (kanbanData[2].taskCards[0] !== undefined) {
        var doneCards = kanbanData[2].taskCards;
        DoneList = doneCards.map(doneCard => {
          return (
            <li key={doneCard.taskID} id={doneCard.taskID} draggable="true">
              <TaskCards taskCardData={doneCard} />
            </li>
          );
        });
      }
    }

    return (
      <div
        className="sortableKanban"
        style={{
          display: "grid",
          gridTemplateColumns: "33.33% 33.33% 33.33%"
        }}
      >
        <div style={{ gridColumn: "1", paddingRight: "5px" }}>
          <Callout title="To-Dos">
            <ul
              className="sortableTodo"
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
              {TodoList}
            </ul>
            <NewKanbanCard kanbanType={0} />
          </Callout>
        </div>
        <div
          style={{
            gridColumn: "2",
            paddingLeft: "5px",
            paddingRight: "5px"
          }}
        >
          <Callout title="Doing">
            <ul
              className="sortableDoing"
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
              {DoingList}
            </ul>
            <NewKanbanCard kanbanType={1} />
          </Callout>
        </div>
        <div style={{ gridColumn: "3", paddingLeft: "5px" }}>
          <Callout title="Done">
            <ul
              className="sortableDone"
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
              {DoneList}
            </ul>
            <NewKanbanCard kanbanType={2} />
          </Callout>
        </div>
      </div>
    );
  }
}
