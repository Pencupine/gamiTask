import React, { Component } from "react";
import { Callout } from "@blueprintjs/core";

import TaskCheckboxGroup from "../../commonUtils/TaskCheckboxGroup";

export default class NoticeCard extends Component {
  render() {
    return (
      <div>
        <h4>Notice</h4>
        <div
          className="row"
          style={{
            display: "grid",
            gridTemplateColumns: "33.33% 33.33% 33.33%"
          }}
        >
          <div style={{ gridColumnStart: "1", padding: "3px" }}>
            <Callout title="Today" />
          </div>
          <div style={{ gridColumnStart: "2", padding: "3px" }}>
            <Callout title="This Week">
              {/* <TaskCheckboxGroup text="Task 1" /> */}
              Goal 2 Remminder
            </Callout>
          </div>
          <div style={{ gridColumnStart: "3", padding: "3px" }}>
            <Callout title="This Month" />
          </div>
        </div>
      </div>
    );
  }
}
