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
      <div>
        <Callout title="My Dailies">
          <div
            style={{
              maxBlockSize: "54vh",
              overflow: "auto"
            }}
          >
            {TasksList}
          </div>
          <NewTaskCard type={0} updateFunction={this.updateTasks} />
        </Callout>
      </div>
    );
  }
}
