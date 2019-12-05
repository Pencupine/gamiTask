import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Icon, Position, Tooltip } from '@blueprintjs/core';

class ModButtons extends Component {
	render() {
		return (
			<div>
				<button className="bp3-button bp3-minimal non-dragable">
					<Icon icon="notifications" />
				</button>
				<Tooltip hoverOpenDelay={500} content="Settings" position={Position.BOTTOM}>
					<Link to="/settings" style={{ textDecoration: 'none' }}>
						<button className="bp3-button bp3-minimal non-dragable">
							<Icon icon="settings" />
						</button>
					</Link>
				</Tooltip>
				<button
					className="bp3-button bp3-minimal non-dragable"
					onClick={() => {
						ipcRenderer.send('signOutFromNav', null);
						console.log('Sign Out');
					}}
				>
					<Icon icon="user" />
				</button>
			</div>
		);
	}
}

export default withRouter(ModButtons);
