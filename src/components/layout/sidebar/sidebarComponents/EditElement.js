import React, { Component } from 'react';
import { Icon } from '@blueprintjs/core';

export default class EditElement extends Component {
	render() {
		return (
			<div>
				<button className="bp3-button bp3-minimal  non-dragable" style={{ marginTop: '3px' }}>
					<Icon icon="edit" iconSize={20} />
				</button>
				<button className="bp3-button bp3-minimal  non-dragable" style={{ marginTop: '3px' }}>
					<Icon icon="cut" iconSize={20} />
				</button>
				<button className="bp3-button bp3-minimal  non-dragable" style={{ marginTop: '3px' }}>
					<Icon icon="duplicate" iconSize={20} />
				</button>
				<button className="bp3-button bp3-minimal  non-dragable" style={{ marginTop: '3px' }}>
					<Icon icon="clipboard" iconSize={20} />
				</button>
			</div>
		);
	}
}
