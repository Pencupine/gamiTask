import React, { Component } from "react";

import ToDoLists from "./todoList/ToDoLists";
import TopPanel from "./topPanel/TopPanel";

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
              gridTemplateRows: "27.5% 72.5%"
            }}
          >
            <div
              style={{
                maxHeight: "100%",
                gridRow: "1",
                gridColumnStart: "1",
                gridColumnEnd: "3",
                overflow: "hidden"
              }}
            >
              <TopPanel />
            </div>
            <div
              style={{
                maxHeight: "100%",
                gridRow: "2",
                gridColumnStart: "1",
                gridColumnEnd: "3",
                backgroundColor: "#3B3B70",
                overflow: "hidden"
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
