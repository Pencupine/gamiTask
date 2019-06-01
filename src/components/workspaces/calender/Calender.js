import React, { Component } from "react";
import CalenderCard from "./CalenderCard";
import RightCard from "./RightCard";

export default class Calender extends Component {
  render() {
    return (
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
              backgroundColor: "#28335E"
              // display: "grid",
              // gridTemplateColumns: "70% 30%"
            }}
          >
            <div
              className="col-md-10"
              style={{
                //   // gridRow: "1",
                //   gridColumnStart: "1",
                //   gridColumnEnd: "2",
                padding: "5px",
                height: "100%"
              }}
            >
              <CalenderCard />
            </div>
            <div
              className="col-md-2"
              style={{
                //   // gridRow: "2",
                //   gridColumn: "2",
                backgroundColor: "#3B3B70",
                padding: "5px",
                height: "100%"
              }}
            >
              <RightCard />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
