import React, { Component } from "react";
import {
  Icon,
  Tag
} from "@blueprintjs/core";

import { ipcRenderer } from "electron";

export default class TagObj extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <div>
        <Tag
          key={this.props.title}
          active={this.props.tagStyle.active}
          round={this.props.tagStyle.round}
          intent={this.props.tagStyle.intent}
          interactive={this.props.tagStyle.interactive}
          onClick={this.props.actions.onclick}
          minimal={this.props.tagStyle.minimal}
          // onRemove={this.props.actions.onRemove}
        >
          {this.props.title}
        </Tag>
      </div>
    );
  }
}
