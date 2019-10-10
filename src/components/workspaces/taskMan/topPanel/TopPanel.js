import React, { Component } from "react";
import ProgressCircles from "./progressCircles/ProgressCircles";
import ProgressBars from "./progressBars/ProgressBars";
import RewardsPanel from "./rewardsPanel/RewardsPanel";

export default class TopPanel extends Component {
  render() {
    return (
      <div
        className="row"
        style={{
          display: "grid",
          gridTemplateColumns: "17% 83%"
        }}
      >
        <div
          style={{
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
              <RewardsPanel />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
