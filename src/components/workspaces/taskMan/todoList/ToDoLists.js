import React, { Component } from "react";
import { Callout } from "@blueprintjs/core";
import { ipcRenderer } from "electron";

import DailiesList from "./dailiesList/DailiesList";
import KanbanList from "./kanbanList/KanbanList";

export default class ToDoLists extends Component {
  // taskStructure = {};

  componentWillMount() {
    console.log("Will Mount");
    ipcRenderer.send("allDailiesTasks", true);
    ipcRenderer.send("allKanbanTasks", true);
  }

  render() {
    return (
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "25% 75%"
          }}
        >
          <div style={{ gridColumn: "1", padding: "5px" }}>
            <Callout>
              <DailiesList />
            </Callout>
          </div>
          <div style={{ gridColumn: "2", padding: "5px" }}>
            <Callout>
              <KanbanList />
            </Callout>
          </div>
        </div>
      </div>
    );
  }
}
