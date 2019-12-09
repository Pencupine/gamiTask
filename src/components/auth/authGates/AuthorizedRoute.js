import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { ipcRenderer } from 'electron';

import store from '../../../store/store';
import cacheStorage from '../../../services/storage/cache.service';
import authService from '../../../services/auth/auth.service';
import checkAuthFromToken from '../../../services/auth/ui.auth.service';

import Spinner from '../../commonUtils/Spinner';

import { PURGE } from 'redux-persist';

class AuthorizedRoute extends Component {
	constructor(props) {
		super(props);

		this.state = {
			render: <Spinner />
		};
	}

	componentWillMount() {
		const checkAuth = checkAuthFromToken();
		checkAuth.then(authState => {
			if (authState) {
				this.setState({
					render: <Redirect to="/home" />
				});
			} else {
				this.setState({
					render: <div>{this.props.children}</div>
				});
			}
		});
	}
	render() {
		ipcRenderer.on('redirectToHome', (event, authState) => {
			if (authState) {
				this.setState({
					render: <div>{this.props.children}</div>
				});
			} else {
				this.setState({
					render: <Redirect to="/" />
				});
			}
		});
		return <div>{this.state.render}</div>;
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
