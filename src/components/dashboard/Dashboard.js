import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Elevation } from "@blueprintjs/core";

export default class Dashboard extends Component {
  render() {
    return (
      <div
        style={{
          height: "100vh",
          backgroundColor: "#3B3B70"
        }}
      >
        <div className="navBarPadding" />
        <div className="container-fluid">
          <div
            className="row"
            style={{
              height: "93.75vh"
            }}
          >
            <div
              className="col-md-3"
              style={{
                padding: "7.5px",
                height: "100%"
              }}
            >
              <Card
                // className="bp3-dark"
                elevation={Elevation.TWO}
                style={{ height: "100%" }}
              >
                <h1>TimeLine</h1>
              </Card>
            </div>
            <div
              className="col-md-9"
              style={{ height: "100%", backgroundColor: "#41798E" }}
            >
              <div className="row" style={{ height: "35%" }}>
                <div
                  className="col-md-4"
                  style={{
                    padding: "7.5px",
                    height: "100%",
                    backgroundColor: "#7CBAA3"
                  }}
                >
                  <Card
                    // className="bp3-dark"
                    elevation={Elevation.TWO}
                    style={{ height: "100%" }}
                  >
                    <h1>Tasks</h1>
                  </Card>
                </div>
                <div
                  className="col-md-8"
                  style={{
                    padding: "7.5px",
                    height: "100%",
                    backgroundColor: "#C4F2BF"
                  }}
                >
                  <Card
                    // className="bp3-dark"
                    elevation={Elevation.TWO}
                    style={{ height: "100%" }}
                  >
                    <h1>Notice Board</h1>
                  </Card>
                </div>
              </div>
              <div
                className="row"
                style={{
                  padding: "7.5px",
                  height: "65%"
                }}
              >
                {" "}
                <Card
                  // className="bp3-dark"
                  elevation={Elevation.TWO}
                  style={{ height: "100%" }}
                >
                  <h1>Note</h1>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
