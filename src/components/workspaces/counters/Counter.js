import React, { Component } from "react";

export default class Counter extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            height: "100vh"
          }}
        >
          <div className="navBarPadding" />
          <div className="container-fluid">
            <div
              className="row"
              style={{
                height: "93.90vh",
                backgroundColor: "#28335E",
                display: "grid",
                gridTemplateColumns: "30% 30% 40%",
                gridTemplateRows: "20% 60% 20%"
              }}
            >
              Counters Page
            </div>
          </div>
        </div>
      </div>
    );
  }
}
