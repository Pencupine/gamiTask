import React, { Component } from "react";
import { Callout } from "@blueprintjs/core";
import { ipcRenderer } from "electron";

import DailiesList from "./DailiesList";
import KanbanList from "./KanbanList";

export default class ToDoLists extends Component {
  render() {
    const taskCardData = {
      label: "Dipanjan",
      taskCompleted: false,
      tags: [
        {
          tagID: "1112",
          tagName: "asdfasf"
        },
        {
          tagID: "1242",
          tagName: "asdfrg"
        }
      ]
    };
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
