import React, { Component } from "react";
import {
  Card,
  Checkbox,
  Icon,
  Button,
  Intent,
  Popover,
  Classes,
  Code
} from "@blueprintjs/core";

import TaskCheckboxGroup from "../../commonUtils/TaskCheckboxGroup";
import { ipcRenderer } from "electron";

export default class TaskCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskCompleted: false,
      displayDelete: false,
      renderCard: true
    };

    this.handleTaskToggle = this.handleTaskToggle.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  componentWillUnmount() {
    console.log("unmounting");
  }

  handleTaskToggle() {
    this.setState({
      taskCompleted: !this.state.taskCompleted
    });
  }

  changeDisplay() {
    this.setState({
      displayDelete: !this.state.displayDelete
    });
  }

  deleteTask() {
    this.setState({ renderCard: false });
    // ipcRenderer.send("allDailiesTasks", true);
    // ipcRenderer.send("allKanbanTasks", true);
    ipcRenderer.send("removeTaskCard", this.props.taskCardData.taskID);
    // this.changeDisplay();
  }

  render() {
    const PopoverContent = (
      <div key="text" style={{ padding: "20px" }}>
        <h5>Confirm deletion</h5>
        <p>Are you sure you want to delete this Card?</p>
        <p>
          You can find them in : <Code>Archives</Code>{" "}
          <Icon icon="chevron-right" iconSize={12} /> <Code>Trash</Code>
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 15
          }}
        >
          <Button
            minimal={true}
            className={Classes.POPOVER_DISMISS}
            style={{ marginRight: 10 }}
            onClick={this.changeDisplay}
          >
            Cancel
          </Button>
          <Button
            minimal={true}
            intent={Intent.DANGER}
            className={Classes.POPOVER_DISMISS}
            onClick={this.deleteTask}
            // onClick={this.changeDisplay}
          >
            Delete
          </Button>
        </div>
      </div>
    );

    return this.state.renderCard ? (
      <div
        id="taskCard"
        className="card"
        draggable="true"
        style={{
          backgroundColor: "white",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          transition: "0.3s",
          borderRadius: "5px",
          margin: "5px",
          minHeight: "50px"
        }}
      >
        <div
          style={{
            display: "grid",
            padding: "5px",
            gridTemplateColumns: "8% 84% 8%",
            overflow: "hidden"
          }}
        >
          <div>
            <div
              style={{
                maxHeight: "18px",
                maxWidth: "17px"
              }}
            >
              <Checkbox
                minimal="true"
                checked={this.state.taskCompleted}
                onChange={this.handleTaskToggle}
              />
            </div>
            <div>
              <Icon icon="tag" iconSize={12} style={{ color: "#8A9BA8" }} />
            </div>
          </div>

          <div
            style={{
              gridColumn: "2",
              backgroundColor: "#E1E8ED",
              borderRadius: "5px",
              padding: "5px",
              wordWrap: "break-word",
              overflow: "auto"
            }}
          >
            {this.props.taskCardData.title}
          </div>

          <div className="text-center" style={{ gridColumn: "3" }}>
            <div style={{ paddingLeft: "20%" }}>
              <Popover
                className="bp3-dark"
                isOpen={this.state.displayDelete}
                canEscapeKeyClose={true}
                minimal={true}
                position={"auto-end"}
              >
                <Icon
                  icon="cross"
                  iconSize={12}
                  style={{
                    color: "#FF7373",
                    marginTop: "3px",
                    marginBottom: "12px"
                  }}
                  onClick={this.changeDisplay}
                />
                {PopoverContent}
              </Popover>
              <Icon icon="cog" iconSize={12} style={{ color: "#8A9BA8" }} />
            </div>
          </div>
          {/* <Icon
            icon="delete"
            iconSize={12}
            style={{
              color: "#F55656",
              gridRow: "3"
            }}
          /> */}
        </div>
      </div>
    ) : null;
  }
}
