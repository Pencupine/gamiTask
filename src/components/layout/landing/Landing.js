import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@blueprintjs/core';
import { ipcRenderer } from 'electron';

class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false
		};
	}
	// Delete this function and make a seperate sign up module............................................................................
	signUp() {
		ipcRenderer.send('openSignUp', true);
	}

	render() {
		// console.log(this.props);
		ipcRenderer.on('redirectToHome', (event, value) => {
			console.log('redirect To Home request : ', value);
			this.setState({ loggedIn: value });
		});

		return (
			<div className="">
				<div className="navBarPadding" />
				<div className="landingResize">
					<div className="landingImage" />
					<div className="landingOverlay" />
					<div style={{ position: 'relative' }}>
						<div className="col-md-1" />
						<div className="col-md-10 text-center">
							<div id="landingPadding" />
							<h1>GamiTask For Windows</h1>
							<p className=""> "Gamify Your Task Management and Note Taking!!!" - Pencupine</p>
							<hr />
							<div>
								<Link to="/home">
									<Button
										intent={'primary'}
										onClick={() => {
											console.log('Continue Offline');
										}}
									>
										<div className="col-md-12">Continue Offline</div>
									</Button>
								</Link>
							</div>
							{this.state.loggedIn ? null : (
								<div>
									<hr />
									<br />
									Go Online and Back Up
									<div
										className="row md-4 auto"
										style={{
											marginTop: '10px',
											marginBottom: '10px'
										}}
									>
										<Link to="/login">
											<Button
												intent={'primary'}
												onClick={() => {
													console.log('Log Request');
												}}
											>
												<div className="col-md-12">Log In</div>
											</Button>
										</Link>
									</div>
									<div className="row text-center">OR</div>
									<div className="row md-4 auto" style={{ marginTop: '10px', marginBottom: '10px' }}>
										{/* <Link to="/signup"> */}

										<Button
											intent={'primary'}
											onClick={this.signUp}
											style={{ paddingLeft: '5px', paddingRight: '5px' }}
										>
											<div className="col-md-12">Sign Up</div>
										</Button>
									</div>
								</div>
							)}
							{/* </Link> */}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Landing;
