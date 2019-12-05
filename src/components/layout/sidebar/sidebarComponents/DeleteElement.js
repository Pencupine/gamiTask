import React, { Component } from 'react';
import { Icon } from '@blueprintjs/core';

export default class DeleteElement extends Component {
	render() {
		return (
			<div>
				<button className="bp3-button bp3-minimal  non-dragable" style={{ marginTop: '3px' }}>
					<Icon icon="delete" iconSize={20} />
				</button>
			</div>
		);
	}
}
