import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import store from '../../../store/store';
import cacheStorage from '../../../services/storage/cache.service';
import authService from '../../../services/auth/auth.service';
import { checkAuthFromToken } from '../../../services/auth/ui.auth.service';

import Spinner from '../../commonUtils/Spinner';
import Home from '../../workspaces/home/Home';

import { PURGE } from 'redux-persist';
import { ipcRenderer } from 'electron';
import { authUser } from '../../../store/actions/authActions';
import { Redirect } from 'react-router-dom';

class UnauthorizedRoute extends Component {
	constructor(props) {
		super(props);

		this.state = {
			render: <Spinner />
		};
	}

	componentWillMount() {
		if (!this.props.auth.isAuthenticated) {
			const checkAuth = checkAuthFromToken();
			checkAuth.then(authState => {
				console.log(authState);
				if (authState) {
					this.setState({
						render: (
							<div>
								<Home />
							</div>
						)
					});
				} else {
					this.setState({
						render: <div>{this.props.children}</div>
					});
				}
			});
		} else {
			this.setState({
				render: (
					<div>
						<Home />
					</div>
				)
			});
		}
	}
	render() {
		if (this.props.auth.isAuthenticated) return <Redirect to="/home" />;
		else return <div>{this.state.render}</div>;
	}
}

UnauthorizedRoute.propTypes = {
	auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(UnauthorizedRoute);
