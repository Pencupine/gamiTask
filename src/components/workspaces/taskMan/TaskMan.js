import React, { Component } from "react";

import ProgressCircles from "./ProgressCircles";
import ToDoLists from "./ToDoLists";
import ProgressBars from "./ProgressBars";
import Rewards from "./Rewards";

export default class TaskMan extends Component {
  render() {
    return (
      <div
        style={{
          height: "100vh"
          // backgroundColor: "#3B3B70"
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
              gridTemplateColumns: "17% 83%",
              gridTemplateRows: "27.5% 72.5%"
            }}
          >
            <div
              style={{
                gridRow: "1",
                gridColumn: "1"
              }}
            >
              <div
                style={{
                  height: "100%"
                }}
              >
                <ProgressCircles />
              </div>
            </div>
            <div
              style={{
                gridRow: "1",
                gridColumn: "2",
                height: "100%"
              }}
            >
              <div>
                <div className="col-md-6">
                  <div>
                    <ProgressBars />
                  </div>
                </div>
                <div
                  className="col-md-6"
                  style={{ height: "100%", backgroundColor: "" }}
                >
                  <Rewards />
                </div>
              </div>
            </div>
            <div
              style={{
                gridRow: "2",
                gridColumnStart: "1",
                gridColumnEnd: "3",
                backgroundColor: "#3B3B70"
              }}
            >
              <ToDoLists />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
