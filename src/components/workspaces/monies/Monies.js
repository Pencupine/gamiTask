import React, { Component } from "react";
import TableElement from "./TableElement";
import EarningSpending from "./EarningSpending";
import MoneyCard3 from "./MoneyCard3";
import AssetsLiabilities from "./AssetsLiabilities";
import TempEntryJson from "./TempEntryJson";

export default class Monies extends Component {
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
              backgroundColor: "#28335E",
              display: "grid",
              gridTemplateColumns: "40% 30% 30%",
              gridTemplateRows: "20% 60% 20%"
            }}
          >
            <div
              style={{
                gridColumn: "1",
                gridRow: "1",
                padding: "5px"
              }}
            >
              <AssetsLiabilities />
            </div>
            <div
              style={{
                gridColumnStart: "2",
                gridColumnEnd: "3",
                gridRow: "1",
                padding: "5px"
              }}
            >
              <EarningSpending />
            </div>
            <div
              style={{
                gridColumnStart: "3",
                gridColumnEnd: "4",
                gridRow: "1",
                padding: "5px"
              }}
            >
              <EarningSpending />
            </div>
            <div
              style={{
                gridRowStart: "2",
                gridRowEnd: "4",
                gridColumnStart: "1",
                gridColumnEnd: "3",
                backgroundColor: "#3B3B70",
                padding: "5px"
              }}
            >
              <TableElement />
            </div>
            <div
              style={{
                gridRowStart: "2",
                gridRowEnd: "3",
                gridColumn: "3",
                backgroundColor: "#41798E",
                padding: "5px"
              }}
            >
              <TempEntryJson />
            </div>
            <div
              style={{
                gridRowStart: "3",
                gridRowEnd: "4",
                gridColumn: "3",
                backgroundColor: "#7CBAA3",
                padding: "5px"
              }}
            >
              <MoneyCard3 />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
