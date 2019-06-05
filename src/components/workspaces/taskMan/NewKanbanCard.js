import React, { Component } from "react";
import { InputGroup } from "@blueprintjs/core";

import { ipcRenderer } from "electron";
import { getCurrentDate } from "../../../tools/getCurrentDate";

export default class TaskCards extends Component {
  constructor(props) {
    super(props);

    this.handleNewKanbanTask = this.handleNewKanbanTask.bind(this);
  }

  handleNewKanbanTask(event) {
    const nodeNumber = 1 + this.props.kanbanType;
    const node = document.getElementsByClassName("taskInputGroup")[nodeNumber]
      .lastChild;
    const title = node.value;
    if (title == "") return;
    node.value = "";
    const date = getCurrentDate();
    const value = {
      title: title,
      taskType: 1,
      kanbanType: this.props.kanbanType,
      dateCreated: date
    };
    ipcRenderer.send("newTaskCard", value);
  }

  render() {
    return (
      <div
        className="card"
        style={{
          backgroundColor: "white",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          transition: "0.3s",
          borderRadius: "5px",
          margin: "5px"
        }}
      >
        <div
          style={{
            display: "grid",
            padding: "5px",
            maxHeight: "60px",
            gridTemplateColumns: "7% 86% 7%",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              gridColumn: "1"
            }}
          >
            <div
              style={{
                gridRow: "1",
                maxHeight: "20px",
                maxWidth: "17px"
              }}
            >
              {/* <Checkbox
                minimal="true"
                checked={this.state.taskCompleted}
                onChange={this.handleTaskToggle}
              /> */}
            </div>
            <div
              style={{
                gridRow: "2"
              }}
            >
              {/* <Icon icon="cog" iconSize={12} style={{ color: "#8A9BA8" }} /> */}
            </div>
          </div>
          <div
            id="newTaskCard"
            style={{
              gridColumn: "2",
              maxHeight: "50px",
              backgroundColor: "#E1E8ED",
              borderRadius: "5px",
              padding: "5px"
            }}
          >
            <InputGroup
              className="taskInputGroup"
              id="newKanbanCard"
              onKeyPress={ev => {
                if (ev.key === "Enter") {
                  this.handleNewKanbanTask();
                }
              }}
              leftIcon="plus"
              maxLength={40}
            />
          </div>
          <div className="text-center" style={{ gridColumn: "3" }} />
        </div>
      </div>
    );
  }
}
