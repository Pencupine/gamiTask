import React, { Component } from 'react';
import { Icon } from '@blueprintjs/core';

export default class AddElement extends Component {
	render() {
		return (
			<div>
				<button className="bp3-button bp3-minimal  non-dragable" style={{ marginTop: '3px' }}>
					<Icon icon="add" iconSize={20} />
				</button>
				<button className="bp3-button bp3-minimal non-dragable" style={{ marginTop: '3px' }}>
					<Icon icon="new-text-box" iconSize={20} />
				</button>
				<button className="bp3-button bp3-minimal  non-dragable" style={{ marginTop: '3px' }}>
					<Icon icon="th" iconSize={20} />
				</button>
			</div>
		);
	}
}
