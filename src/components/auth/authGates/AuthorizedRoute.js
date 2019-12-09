import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import store from '../../../store/store';
import cacheStorage from '../../../services/storage/cache.service';
import authService from '../../../services/auth/auth.service';

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
		// if (!this.props.auth.isAuthenticated) {
		const getToken = cacheStorage.getData('idToken');
		getToken.then(data => {
			console.log('AUTH GATE :: FOUND DATA :', data.idToken);
			if (data.idToken !== undefined) {
				const validateToken = authService.checkTokenState(data.idToken);
				validateToken.then(res => {
					if (res) {
						this.setState({
							render: <div>{this.props.children}</div>
						});
					} else {
						store.dispatch({
							type: PURGE
						});
						this.setState({
							render: <Redirect to="/" />
						});
					}
				});
			} else {
				this.setState({
					render: <Redirect to="/" />
				});
			}
		});
		// } else {
		// 	window.location.href = '/';
		// }
	}
	render() {
		return <div>{this.state.render}</div>;
	}
}

AuthorizedRoute.propTypes = {
	auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(AuthorizedRoute);
