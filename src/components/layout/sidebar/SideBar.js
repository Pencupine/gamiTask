import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import TreeComp from '../../menu/TreeComp';
import ObjectTools from './sidebarComponents/ObjectTools';
import AddElement from './sidebarComponents/AddElement';
import EditElement from './sidebarComponents/EditElement';
import DeleteElement from './sidebarComponents/DeleteElement';

class SideBar extends Component {
	render() {
		return (
			<div>
				<div className="navBarPadding" />
				<div className="sidebar" style={{ backgroundColor: '#381F46', height: '93.90vh' }}>
					{/* <div className="row"> */}
					<div className="row">
						<div
							className="col-md-1 text-center"
							style={{
								height: '93.90vh',
								width: '65px',
								backgroundColor: '#2D1B36'
							}}
						>
							<div style={{ width: '40px', paddingLeft: '8px' }}>
								<div className="navBarPadding" />
								<ObjectTools />
								<hr
									style={{
										paddingLeft: '33px',
										color: '#657a8b',
										opacity: '0.4'
									}}
								/>
								<AddElement />
								<hr
									style={{
										paddingLeft: '33px',
										color: '#657a8b',
										opacity: '0.4'
									}}
								/>
								<EditElement />
								<hr
									style={{
										paddingLeft: '33px',
										color: '#657a8b',
										opacity: '0.4'
									}}
								/>
								<DeleteElement />
							</div>
						</div>
						<div className="col">{this.props.viewSideMenu ? <TreeComp /> : ' '}</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	viewSideMenu: state.viewState.viewSideMenu
});

SideBar.propTypes = {
	viewSideMenu: propTypes.bool.isRequired
};

export default connect(mapStateToProps)(SideBar);
