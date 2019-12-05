import React, { Component } from 'react';
import { Icon, Position, Tooltip } from '@blueprintjs/core';

import history from '../../../../utils/history';
class NavigationButtons extends Component {
	goForward() {
		history.goForward();
	}
	goBackward() {
		history.goBack();
	}
	render() {
		return (
			<div>
				<Tooltip hoverOpenDelay={500} content="Go Back" position={Position.BOTTOM}>
					<button className="bp3-button bp3-minimal non-dragable" onClick={this.goBackward}>
						<Icon icon="chevron-left" />
					</button>
				</Tooltip>
				<Tooltip hoverOpenDelay={500} content="Go Front" position={Position.BOTTOM}>
					<button className="bp3-button bp3-minimal non-dragable" onClick={this.goForward}>
						<Icon icon="chevron-right" />
					</button>
				</Tooltip>
			</div>
		);
	}
}

export default NavigationButtons;
