import React, { Component } from "react";
import {
  Card,
  Checkbox,
  Icon,
  Button,
  EditableText,
  InputGroup
} from "@blueprintjs/core";

import TaskCheckboxGroup from "../../commonUtils/TaskCheckboxGroup";

import { ipcRenderer } from "electron";
import { getCurrentDate } from "../../../tools/getCurrentDate";

export default class TaskCards extends Component {
  constructor(props) {
    super(props);

    this.handleNewTask = this.handleNewTask.bind(this);
  }

  handleNewTask(event) {
    const node = document.getElementsByClassName("taskInputGroup")[
      this.props.type
    ].lastChild;
    const title = node.value;
    console.log(title);
    node.value = "";
    const date = getCurrentDate();
    const value = {
      title: title,
      taskType: this.props.type,
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
              id="newTaskCard"
              onKeyPress={ev => {
                if (ev.key === "Enter") {
                  this.handleNewTask();
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
