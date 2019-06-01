import React, { Component } from "react";
import { Icon, Checkbox, Button } from "@blueprintjs/core";

export default class TaskCheckboxGroup extends Component {
  constructor(props) {
    super(props);

    this.handleEnabledChange = this.handleEnabledChange.bind(this);
  }

  handleEnabledChange() {
    // this.setState({ isEnabled: !this.state.isEnabled });
    this.props.handleFunction();
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <Checkbox
            minimal="true"
            checked={this.props.checked}
            onChange={this.handleEnabledChange}
          >
            {/* {this.state.isEnabled ? (
              <Icon icon="confirm" />
            ) : (
              <Icon icon="circle" />
            )} */}
          </Checkbox>
        </div>
      </div>
    );
  }
}
