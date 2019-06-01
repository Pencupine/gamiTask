import React, { Component } from "react";

export default class CalenderCard extends Component {
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
        <div
          style={{
            display: "grid",
            gridTemplateRows: "10% 90%",
            gridTemplateColumns: "10% 80% 10%",
            padding: "10px",
            height: "100%"
          }}
        >
          <div
            style={{
              gridRowStart: "1",
              gridRowEnd: "2",
              gridColumnStart: "1",
              gridColumnEnd: "4"
            }}
          >
            {/* <div
              className="card"
              style={{
                backgroundColor: "#314451",
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.6)",
                transition: "0.3s",
                borderRadius: "5px"
              }}
            > */}
            asdfghjgfdghjk
            {/* </div> */}
          </div>
          <div
            style={{
              gridRowStart: "2",
              gridRowEnd: "3",
              gridColumnStart: "1",
              gridColumnEnd: "2"
            }}
          >
            Go Left
          </div>
          <div
            style={{
              gridRowStart: "2",
              gridRowEnd: "3",
              gridColumnStart: "2",
              gridColumnEnd: "3"
            }}
          >
            Calender
          </div>
          <div
            style={{
              gridRowStart: "2",
              gridRowEnd: "3",
              gridColumnStart: "3",
              gridColumnEnd: "4"
            }}
          >
            Go Right
          </div>
        </div>
      </div>
    );
  }
}
