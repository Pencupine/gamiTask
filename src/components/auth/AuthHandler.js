import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import { connect } from 'react-redux';
import { authUser } from '../../store/actions/authActions';
import { getUserData } from '../../services/auth/auth.service';

class AuthHandler extends Component {
	render() {
		ipcRenderer.on('redirectToHome', (event, authState) => {
			const getData = getUserData();
			getData.then(userData => {
				if (userData === false) {
					userData = {};
				}
				this.props.authUser(userData);
			});
		});
		return <div />;
	}
}

export default connect(null, { authUser })(AuthHandler);
