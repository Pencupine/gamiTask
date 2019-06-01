import React, { Component } from "react";
import { Card, Checkbox, Icon, Button } from "@blueprintjs/core";

import TaskCheckboxGroup from "../../commonUtils/TaskCheckboxGroup";

export default class TaskCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskCompleted: false
    };

    this.handleTaskToggle = this.handleTaskToggle.bind(this);
  }

  handleTaskToggle() {
    this.setState({
      taskCompleted: !this.state.taskCompleted
    });
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
            gridTemplateColumns: "10% 80% 10%",
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
              <Checkbox
                minimal="true"
                checked={this.state.taskCompleted}
                onChange={this.handleTaskToggle}
              />
            </div>
            <div
              // className="text-center"
              style={{
                gridRow: "2"
              }}
            >
              <Icon icon="cog" iconSize={12} style={{ color: "#8A9BA8" }} />
            </div>
          </div>
          <div
            className=""
            style={{
              gridColumn: "2",
              maxHeight: "50px",
              backgroundColor: "#E1E8ED",
              borderRadius: "5px",
              padding: "5px"
            }}
          >
            {this.props.taskCardData.label}
          </div>
          <div className="text-center" style={{ gridColumn: "3" }}>
            <Icon
              icon="tag"
              iconSize={12}
              style={{ color: "#8A9BA8", marginBottom: "17px" }}
            />
            <Icon
              icon="layout-linear"
              iconSize={12}
              style={{ color: "#8A9BA8" }}
            />
          </div>
        </div>
      </div>
    );
  }
}
