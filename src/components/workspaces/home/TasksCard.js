import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Spinner, Tooltip, Position, Intent, Callout } from "@blueprintjs/core";

export default class TasksCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinnerValue: 0.4
    };
  }

  render() {
    const { spinnerValue } = this.state;
    var spinnerIntent =
      spinnerValue >= 0.9
        ? Intent.SUCCESS
        : spinnerValue >= 0.75
        ? Intent.PRIMARY
        : spinnerValue >= 0.5
        ? Intent.WARNING
        : Intent.DANGER;
    return (
      <div>
        <div className="row" style={{ marginBottom: "10px" }}>
          <div className="col-md-6">
            <Tooltip
              hoverOpenDelay={500}
              content="Tasks"
              position={Position.BOTTOM}
            >
              <Link to="/taskman" style={{ textDecoration: "none" }}>
                <h4>Tasks</h4>
              </Link>
            </Tooltip>
          </div>
          <div
            className="col-md-3 text-center"
            style={{
              color: "#8A9BA8"
            }}
          >
            <h4>80%</h4>
          </div>
          <div className="col-md-3 text-center">
            <Spinner
              size={Spinner.SIZE_STANDARD}
              value={this.state.spinnerValue}
              intent={spinnerIntent}
            />
          </div>
        </div>
        <div
          className="row"
          style={{
            display: "grid",
            gridTemplateColumns: "50% 50%"
          }}
        >
          <div style={{ gridColumnStart: "1", padding: "3px" }}>
            <Callout title="Dailies" />
          </div>
          <div style={{ gridColumnStart: "2", padding: "3px" }}>
            <Callout title="To-Dos" />
          </div>
        </div>
      </div>
    );
  }
}
