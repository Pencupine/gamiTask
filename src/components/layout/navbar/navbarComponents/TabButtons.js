import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Icon, Position, Tooltip } from '@blueprintjs/core';

import tabButtonsStructure from './tabButtonsStructure';

class TabButtons extends Component {
	render() {
		const Tabs = tabButtonsStructure.map(
			(obj, key) =>
				obj.elementType === 'tab' ? (
					<div key={key}>
						<TabButton tab={obj} />
					</div>
				) : (
					<span key={key} className="bp3-navbar-divider" />
				)
		);
		return Tabs;
	}
}

export default withRouter(TabButtons);

class TabButton extends Component {
	render() {
		return (
			<Tooltip hoverOpenDelay={500} content={this.props.tab.content} position={Position.BOTTOM}>
				<Link
					to={this.props.tab.link}
					style={{
						textDecoration: 'none',
						marginBottom: '2px',
						marginLeft: '5px'
					}}
				>
					<button className="bp3-button bp3-minimal non-dragable">
						{this.props.tab.color === 'none' ? (
							<Icon icon={this.props.tab.icon} />
						) : (
							<Icon icon={this.props.tab.icon} color={this.props.tab.color} />
						)}
					</button>
				</Link>
			</Tooltip>
		);
	}
}
