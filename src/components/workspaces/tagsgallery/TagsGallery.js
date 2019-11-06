import React, { Component } from "react";
import { ipcRenderer } from "electron";

import AllTagsList from "./allTagsList/allTagsList";
import { getAllTags } from '../../dataObjects/tags/tagsHandler';

export default class TagsGallery extends Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount(){
    if(await getAllTags()) console.log('Wowo');
  }

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
              gridTemplateRows: "10% 70% 20%"
            }}
          >
            <div
              style={{
                gridColumn: "1",
                gridRow: "1",
                padding: "5px"
              }}
            />
            <div
              style={{
                gridColumnStart: "2",
                gridColumnEnd: "3",
                gridRow: "1",
                padding: "5px"
              }}
            />
            <div
              style={{
                gridColumnStart: "3",
                gridColumnEnd: "4",
                gridRow: "1",
                padding: "5px"
              }}
            />
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
              <AllTagsList />
            </div>
            <div
              style={{
                gridRowStart: "2",
                gridRowEnd: "3",
                gridColumn: "3",
                backgroundColor: "#41798E",
                padding: "5px"
              }}
            />
            <div
              style={{
                gridRowStart: "3",
                gridRowEnd: "4",
                gridColumn: "3",
                backgroundColor: "#7CBAA3",
                padding: "5px"
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
