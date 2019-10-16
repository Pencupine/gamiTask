import React, { Component } from "react";

import { Spinner, Intent } from "@blueprintjs/core";

export default class ProgressCircles extends Component {
  render() {
    return (
      <div>
        <div style={{ position: "relative", paddingLeft: "5%" }}>
          <div style={{ position: "absolute", padding: "15px" }}>
            <Spinner value="0.2" size={180} intent={Intent.PRIMARY} />
          </div>
          <div style={{ position: "absolute", padding: "25px" }}>
            <Spinner value="0.4" size={160} intent={Intent.DANGER} />
          </div>
          <div style={{ position: "absolute", padding: "35px" }}>
            <Spinner value="0.6" size={140} intent={Intent.SUCCESS} />
          </div>
          {/* <div style={{ position: "absolute", padding: "45px" }}>
            <Spinner value="0.8" size={120} intent={Intent.WARNING} />
          </div>
          <div style={{ position: "absolute", padding: "55px" }}>
            <Spinner value="1.0" size={100} intent={Intent.NONE} />
          </div> */}
        </div>
      </div>
    );
  }
}
