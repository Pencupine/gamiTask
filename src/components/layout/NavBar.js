import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Icon, Position, Tooltip, Intent, Tab, Tabs } from '@blueprintjs/core';

import history from '../../utils/history';

const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menuOpen: false,
			fullscreen: false,
			minimized: false
		};
		this.closeMenu = this.closeMenu.bind(this);
		this.openMenu = this.openMenu.bind(this);
		this.maximizeWindow = this.maximizeWindow.bind(this);
		this.unmaximizeWindow = this.unmaximizeWindow.bind(this);
		this.minimizeWindow = this.minimizeWindow.bind(this);
		// this.restoreWindow = this.restoreWindow.bind(this);
	}

	goForward() {
		history.goForward();
	}
	goBackward() {
		history.goBack();
	}

	closeMenu() {
		this.setState({ menuOpen: false });
		this.props.toggleSideBar();
	}
	openMenu() {
		this.setState({ menuOpen: true });
		this.props.toggleSideBar();
	}
	minimizeWindow() {
		this.setState({ minimized: !this.state.minimized });
		ipcRenderer.send('minimizeWindow', this.state.minimized);
	}
	maximizeWindow() {
		this.setState({ fullscreen: !this.state.fullscreen });
		ipcRenderer.send('maximizeWindow', this.state.fullscreen);
	}
	// restoreWindow() {
	//   this.setState({ fullscreen: !this.state.fullscreen });
	//   ipcRenderer.send("restoreWindow", this.state.fullscreen);
	// }
	unmaximizeWindow() {
		this.setState({ fullscreen: !this.state.fullscreen });
		ipcRenderer.send('unmaximizeWindow', this.state.fullscreen);
	}
	closeWindow() {
		const val = true;
		ipcRenderer.send('closeWindow', val);
	}
	render() {
		ipcRenderer.on('redirectToHome', (event, value) => {
			console.log('Redirecting to home');
		});
		return (
			<div className="navBar fixedToTop dragable">
				<nav className="bp3-navbar bp3-dark .modifier">
					<div className="bp3-navbar-group bp3-align-left">
						{this.state.menuOpen ? (
							<button className="bp3-button bp3-minimal non-dragable" onClick={this.closeMenu}>
								<Icon icon="menu-closed" />
							</button>
						) : (
							<button className="bp3-button bp3-minimal non-dragable" onClick={this.openMenu}>
								<Icon icon="menu-open" />
							</button>
						)}
						<span className="bp3-navbar-divider" />

						{/* <div className="bp3-navbar-heading"></div> */}
						<Tooltip hoverOpenDelay={500} content="Home" position={Position.BOTTOM}>
							<Link
								to="/home"
								style={{
									textDecoration: 'none',
									marginBottom: '2px',
									marginLeft: '5px'
								}}
							>
								<button className="bp3-button bp3-minimal non-dragable">
									<Icon icon="home" />
								</button>
							</Link>
						</Tooltip>
						<span className="bp3-navbar-divider" />
						<Tooltip hoverOpenDelay={500} content="Tasks" position={Position.BOTTOM}>
							<Link
								to="/taskman"
								style={{
									textDecoration: 'none',
									marginBottom: '2px'
								}}
							>
								<button className="bp3-button bp3-minimal non-dragable bp3-intent-success">
									<Icon icon="tick-circle" intent={Intent.SUCCESS} />
								</button>
							</Link>
						</Tooltip>
						<Tooltip hoverOpenDelay={500} content="Notes" position={Position.BOTTOM}>
							<Link
								to="/notes"
								style={{
									textDecoration: 'none',
									marginBottom: '2px'
								}}
							>
								<button className="bp3-button bp3-minimal non-dragable bp3-intent-primary">
									<Icon icon="control" />
								</button>
							</Link>
						</Tooltip>
						<Tooltip hoverOpenDelay={500} content="Money" position={Position.BOTTOM}>
							<Link
								to="/monies"
								style={{
									textDecoration: 'none',
									marginBottom: '2px'
								}}
							>
								<button className="bp3-button bp3-minimal non-dragable bp3-intent-danger">
									<Icon icon="bank-account" />
								</button>
							</Link>
						</Tooltip>
						<span className="bp3-navbar-divider" />
						<Tooltip hoverOpenDelay={500} content="Calender" position={Position.BOTTOM}>
							<Link
								to="/calender"
								style={{
									textDecoration: 'none',
									marginBottom: '2px'
								}}
							>
								<button className="bp3-button bp3-minimal non-dragable">
									<Icon icon="calendar" color="#AD99FF" />
								</button>
							</Link>
						</Tooltip>
						<Tooltip hoverOpenDelay={500} content="Tags" position={Position.BOTTOM}>
							<Link
								to="/tagsGallery"
								style={{
									textDecoration: 'none',
									marginBottom: '2px'
								}}
							>
								<button className="bp3-button bp3-minimal non-dragable">
									<Icon icon="tag" color="#D1F26D" />
								</button>
							</Link>
						</Tooltip>
						<Tooltip hoverOpenDelay={500} content="Archives" position={Position.BOTTOM}>
							<Link
								to="/archives"
								style={{
									textDecoration: 'none',
									marginBottom: '2px'
								}}
							>
								<button className="bp3-button bp3-minimal non-dragable">
									<Icon icon="cube" color="#008075" />
								</button>
							</Link>
						</Tooltip>
						<Tooltip hoverOpenDelay={500} content="Archives" position={Position.BOTTOM}>
							<Link
								to="/counter"
								style={{
									textDecoration: 'none',
									marginBottom: '2px'
								}}
							>
								<button className="bp3-button bp3-minimal non-dragable">
									<Icon icon="double-caret-vertical" color="#96622D" />
								</button>
							</Link>
						</Tooltip>

						<span className="bp3-navbar-divider" />
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
						<span className="bp3-navbar-divider" />
					</div>

					<div className="bp3-navbar-group bp3-align-right">
						<input
							className="bp3-input bp3-align-left non-dragable"
							placeholder="Search tags..."
							type="text"
						/>
						<span className="bp3-navbar-divider" />
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
						<button className="bp3-button bp3-minimal non-dragable">
							<Icon icon="user" />
						</button>
						<span className="bp3-navbar-divider" />
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
						<button
							className="bp3-button bp3-minimal bp3-intent-danger non-dragable"
							onClick={this.closeWindow}
						>
							<Icon icon="cross" />
						</button>
					</div>
				</nav>
			</div>
		);
	}
}

export default withRouter(NavBar);
