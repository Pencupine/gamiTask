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

    this.updateTasks = this.updateTasks.bind(this);
  }

  componentWillMount() {
    this.updateTasks();
  }

  updateTasks() {
    ipcRenderer.send("allTasks", 0);
    ipcRenderer.on("dailiesTasks", (event, data) => {
      console.log(data);
      this.setState({ tasksData: data.taskCards });
    });
  }

  render() {
    ipcRenderer.on("dailiesTasks", (event, data) => {
      console.log(data);
      this.setState({ tasksData: data.taskCards });
    });

    const taskCards = this.state.tasksData;
    var i = 0;
    var TasksList = taskCards.map(taskCard => {
      return <TaskCards key={i++} taskCardData={taskCard} />;
    });
    return (
      <div
      // style={{ overflow: "auto" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "33.33% 33.33% 33.33%"
          }}
        >
          <div style={{ gridColumn: "1", paddingRight: "5px" }}>
            <Callout title="To-Dos">
              <br />
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
              <br />
            </Callout>
          </div>
          <div style={{ gridColumn: "3", paddingLeft: "5px" }}>
            <Callout title="Done">
              <br />
            </Callout>
          </div>
        </div>
        <div
          style={{
            maxBlockSize: "49.45vh",
            overflow: "auto"
          }}
        >
          {TasksList}
        </div>
        <NewTaskCard type={0} updateFunction={this.updateTasks} />
      </div>
    );
  }
}
