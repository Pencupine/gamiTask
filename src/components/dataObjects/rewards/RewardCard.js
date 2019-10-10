import React, { Component } from "react";

import { Callout, Icon } from "@blueprintjs/core";

export default class RewardCard extends Component {
  render() {
    return (
      <div>
        <Callout>
          <Icon icon="video" /> Movie
        </Callout>
      </div>
    );
  }
}
