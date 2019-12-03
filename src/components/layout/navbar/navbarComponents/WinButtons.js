import React, { Component } from 'react';
import { Icon } from '@blueprintjs/core';

const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

export default class WinButtons extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fullscreen: false,
			minimized: false
		};

		this.maximizeWindow = this.maximizeWindow.bind(this);
		this.unmaximizeWindow = this.unmaximizeWindow.bind(this);
		this.minimizeWindow = this.minimizeWindow.bind(this);
	}

	minimizeWindow() {
		this.setState({ minimized: !this.state.minimized });
		ipcRenderer.send('minimizeWindow', this.state.minimized);
	}
	maximizeWindow() {
		console.log('unshrink');
		this.setState({ fullscreen: !this.state.fullscreen });
		ipcRenderer.send('maximizeWindow', this.state.fullscreen);
	}
	unmaximizeWindow() {
		console.log('shrink');
		this.setState({ fullscreen: !this.state.fullscreen });
		ipcRenderer.send('unmaximizeWindow', this.state.fullscreen);
	}
	closeWindow() {
		const val = true;
		ipcRenderer.send('closeWindow', val);
	}

	render() {
		return (
			<div>
				<button className="bp3-button bp3-minimal non-dragable" onClick={this.minimizeWindow}>
					<Icon icon="minus" />
				</button>
				{this.state.fullscreen ? (
					<button className="bp3-button bp3-minimal non-dragable" onClick={this.unmaximizeWindow}>
						<Icon icon="applications" />
					</button>
				) : (
					<button className="bp3-button bp3-minimal non-dragable" onClick={this.maximizeWindow}>
						<Icon icon="application" />
					</button>
				)}
				<button className="bp3-button bp3-minimal bp3-intent-danger non-dragable" onClick={this.closeWindow}>
					<Icon icon="cross" />
				</button>
			</div>
		);
	}
}
