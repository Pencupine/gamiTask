import React, { Component } from "react";

import { Callout } from "@blueprintjs/core";
import RewardCard from "../../../../dataObjects/rewards/RewardCard";

export default class RewardsPanel extends Component {
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
          <div
            style={{ padding: "5px", paddingLeft: "5px", paddingRight: "5px" }}
          >
            <h5>Rewards</h5>
            <Callout style={{ padding: "5px" }}>
              <div
                style={{
                  display: "flex",
                  alignContent: "flex-start",
                  flexWrap: "wrap",
                  height: "20%",
                  overflow: "auto"
                }}
              >
                <div style={{ width: "33.33%", padding: "2px" }}>
                  <RewardCard />
                </div>
                <div style={{ width: "33.33%", padding: "2px" }}>
                  <RewardCard />
                </div>
                <div style={{ width: "33.33%", padding: "2px" }}>
                  <RewardCard />
                </div>
                <div style={{ width: "33.33%", padding: "2px" }}>
                  <RewardCard />
                </div>
                <div style={{ width: "33.33%", padding: "2px" }}>
                  <RewardCard />
                </div>
                <div style={{ width: "33.33%", padding: "2px" }}>
                  <RewardCard />
                </div>
                <div style={{ width: "33.33%", padding: "2px" }}>
                  <RewardCard />
                </div>
                <div style={{ width: "33.33%", padding: "2px" }}>
                  <RewardCard />
                </div>
                <div style={{ width: "33.33%", padding: "2px" }}>
                  <RewardCard />
                </div>
              </div>
            </Callout>
          </div>
        </div>
      </div>
    );
  }
}
