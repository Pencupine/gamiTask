import React, { Component } from "react";

import { Card, ProgressBar } from "@blueprintjs/core";

export default class ProgressBars extends Component {
  render() {
    return (
      <div style={{ height: "100%", padding: "10px" }}>
        <div
          className="card bp3-dark"
          style={{
            backgroundColor: "#314451",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.6)",
            transition: "0.3s",
            borderRadius: "5px",
            margin: "5px"
          }}
        >
          <div style={{ padding: "10px" }}>
            <div style={{ padding: "5px" }}>
              <h6>HP</h6>
              <ProgressBar value={0.25} />
            </div>
            <div style={{ padding: "5px" }}>
              <h6>XP</h6>
              <ProgressBar value={0.25} />
            </div>
            <div style={{ padding: "5px" }}>
              <h6>Tasks</h6>
              <ProgressBar value={0.25} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
