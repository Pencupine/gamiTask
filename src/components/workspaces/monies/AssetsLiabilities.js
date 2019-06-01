import React, { Component } from "react";
import { Callout } from "@blueprintjs/core";

export default class AssetsLiabilities extends Component {
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
        <div className="row" style={{ padding: "10px" }}>
          <div className="col-md-6">
            <Callout title="Liabilites">What you owe!!!</Callout>
          </div>
          <div className="col-md-6">
            <Callout title="Assets" className="col-md-6">
              What people owe you!!!
            </Callout>
          </div>
        </div>
      </div>
    );
  }
}
