import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { ipcRenderer } from 'electron';

import store from '../../../store/store';
import cacheStorage from '../../../services/storage/cache.service';
import authService from '../../../services/auth/auth.service';
import { checkAuthFromToken } from '../../../services/auth/ui.auth.service';
import { authUser } from '../../../store/actions/authActions';

import Spinner from '../../commonUtils/Spinner';
import Landing from '../../layout/landing/Landing';

import { PURGE } from 'redux-persist';

class AuthorizedRoute extends Component {
	constructor(props) {
		super(props);

		this.state = {
			render: <Spinner />
		};
	}

	componentWillMount() {
		if (this.props.auth.isAuthenticated) {
			const checkAuth = checkAuthFromToken();
			checkAuth.then(authState => {
				console.log(authState);
				if (authState) {
					this.setState({
						render: <div>{this.props.children}</div>
					});
				} else {
					this.setState({
						render: (
							<div>
								<Landing />
							</div>
						)
					});
				}
			});
		} else {
			this.setState({
				render: (
					<div>
						<Landing />
					</div>
				)
			});
		}
	}
	render() {
		if (!this.props.auth.isAuthenticated) return <Redirect to="/" />;
		else return <div>{this.state.render}</div>;
	}
}

AuthorizedRoute.propTypes = {
	auth: propTypes.object.isRequired,
	authUser: propTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { authUser })(AuthorizedRoute);
