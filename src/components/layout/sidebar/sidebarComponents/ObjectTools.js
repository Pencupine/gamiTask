import React, { Component } from 'react';
import { Icon } from '@blueprintjs/core';

export default class ObjectTools extends Component {
	render() {
		return (
			<div>
				<button className="bp3-button bp3-minimal bp3-intent-primary non-dragable" style={{ marginTop: '3px' }}>
					<Icon icon="new-object" iconSize={20} />
				</button>
				<button className="bp3-button bp3-minimal bp3-intent-primary non-dragable" style={{ marginTop: '3px' }}>
					<Icon icon="new-link" iconSize={20} />
				</button>
				<button
					className="bp3-button bp3-minimal bp3-intent-primary  non-dragable"
					style={{ marginTop: '3px' }}
				>
					<Icon icon="document" iconSize={20} />
				</button>
			</div>
		);
	}
}
