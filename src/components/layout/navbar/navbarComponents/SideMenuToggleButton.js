import React, { Component } from 'react';
import { Icon } from '@blueprintjs/core';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { hideSideMenu, showSideMenu } from '../../../../store/actions/viewActions';

class SideMenuToggleButton extends Component {
	constructor(props) {
		super(props);

		this.closeMenu = this.closeMenu.bind(this);
		this.openMenu = this.openMenu.bind(this);
	}

	closeMenu() {
		this.props.hideSideMenu();
	}
	openMenu() {
		this.props.showSideMenu();
	}
	render() {
		return (
			<div>
				{this.props.viewSideMenu ? (
					<button className="bp3-button bp3-minimal non-dragable" onClick={this.closeMenu}>
						<Icon icon="menu-closed" />
					</button>
				) : (
					<button className="bp3-button bp3-minimal non-dragable" onClick={this.openMenu}>
						<Icon icon="menu-open" />
					</button>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	viewSideMenu: state.viewState.viewSideMenu
});

SideMenuToggleButton.propTypes = {
	viewSideMenu: propTypes.bool.isRequired,
	showSideMenu: propTypes.func.isRequired,
	hideSideMenu: propTypes.func.isRequired
};

export default connect(mapStateToProps, { showSideMenu, hideSideMenu })(SideMenuToggleButton);
