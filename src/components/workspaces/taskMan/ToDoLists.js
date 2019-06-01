import React, { Component } from "react";

import { Callout, Card } from "@blueprintjs/core";

import CheckboxGroup from "../../commonUtils/TaskCheckboxGroup";
import TaskCards from "./TaskCards";

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
          // className="row"
          style={{
            display: "grid",
            gridTemplateColumns: "20% 20% 60%"
          }}
        >
          <div style={{ gridColumn: "1", padding: "5px", paddingLeft: "5px" }}>
            <Callout>
              <Callout title="My Habits">
                <TaskCards taskCardData={taskCardData} />
              </Callout>
            </Callout>
          </div>
          <div style={{ gridColumn: "2", padding: "5px" }}>
            <Callout>
              <Callout title="My Dailies">
                <TaskCards taskCardData={taskCardData} />
              </Callout>
            </Callout>
          </div>
          <div style={{ gridColumn: "3", padding: "5px" }}>
            <Callout
            //  title="My KanBan"
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "33.33% 33.33% 33.33%"
                }}
              >
                <div style={{ gridColumn: "1", paddingRight: "5px" }}>
                  <Callout title="To-Dos">
                    <TaskCards taskCardData={taskCardData} />
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
                    <TaskCards taskCardData={taskCardData} />
                  </Callout>
                </div>
                <div style={{ gridColumn: "3", paddingLeft: "5px" }}>
                  <Callout title="Done">
                    <TaskCards taskCardData={taskCardData} />
                  </Callout>
                </div>
              </div>
            </Callout>
          </div>
        </div>
      </div>
    );
  }
}
