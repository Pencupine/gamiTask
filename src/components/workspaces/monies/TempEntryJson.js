import React, { Component } from "react";

export default class TempEntryJson extends Component {
  render() {
    return (
      <div
        className="card bp3-dark"
        style={{
          backgroundColor: "#314451",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.6)",
          transition: "0.3s",
          borderRadius: "5px",
          height: "100%"
        }}
      >
        <div style={{ padding: "10px" }}>
          <h4>Temp Entry Form</h4>
        </div>
      </div>
    );
  }
}
