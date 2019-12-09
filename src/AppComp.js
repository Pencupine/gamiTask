import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import propType from 'prop-types';

import Landing from './components/layout/landing/Landing';
import NavBar from './components/layout/navbar/NavBar';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import Settings from './components/settings/Settings';
import SideBar from './components/layout/sidebar/SideBar';
import Home from './components/workspaces/home/Home';
import TaskMan from './components/workspaces/taskMan/TaskMan';
import Notes from './components/workspaces/notes/Notes';
import Calender from './components/workspaces/calender/Calender';
import Monies from './components/workspaces/monies/Monies';
import TagsGallery from './components/workspaces/tagsgallery/TagsGallery';
import Archives from './components/workspaces/archives/Archives';
import Counter from './components/workspaces/counters/Counter';

import AuthorizedRoute from './components/auth/authGates/AuthorizedRoute';
import UnauthorizedRoute from './components/auth/authGates/UnauthorizedRoute';

class AppComp extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props.viewSideMenu);
		return (
			<div className="AppComp">
				<Router>
					<NavBar />

					<div
						style={{
							display: 'grid',
							gridTemplateColumns: this.props.viewSideMenu ? '20% 80%' : '3.75% 96.25%'
						}}
					>
						<div style={{ gridColumnStart: '1' }}>
							<SideBar />
						</div>
						{/* ALL UNAUTHORIZED ROUTES */}
						<div style={{ gridColumnStart: '2' }}>
							<Switch>
								<UnauthorizedRoute>
									<Route exact path="/" component={Landing} />
								</UnauthorizedRoute>
							</Switch>
							<Switch>
								<UnauthorizedRoute>
									<Route exact path="/login">
										<LogIn />
									</Route>
								</UnauthorizedRoute>
							</Switch>
							<Switch>
								<Route exact path="/signup">
									<UnauthorizedRoute>
										<SignUp />
									</UnauthorizedRoute>
								</Route>
							</Switch>

							{/* ALL AUTHORIZED ROUTES */}
							<Switch>
								<Route exact path="/home">
									<AuthorizedRoute>
										<Home />
									</AuthorizedRoute>
								</Route>
							</Switch>
							<Switch>
								<Route exact path="/settings">
									<AuthorizedRoute>
										<Settings />
									</AuthorizedRoute>
								</Route>
							</Switch>
							<Switch>
								<Route exact path="/taskman">
									<AuthorizedRoute>
										<TaskMan />
									</AuthorizedRoute>
								</Route>
							</Switch>
							<Switch>
								<Route exact path="/notes">
									<AuthorizedRoute>
										<Notes />
									</AuthorizedRoute>
								</Route>
							</Switch>
							<Switch>
								<Route exact path="/calender">
									<AuthorizedRoute>
										<Calender />
									</AuthorizedRoute>
								</Route>
							</Switch>
							<Switch>
								<Route exact path="/monies">
									<AuthorizedRoute>
										<Monies />
									</AuthorizedRoute>
								</Route>
							</Switch>
							<Switch>
								<Route exact path="/tagsGallery">
									<AuthorizedRoute>
										<TagsGallery />
									</AuthorizedRoute>
								</Route>
							</Switch>
							<Switch>
								<Route exact path="/archives">
									<AuthorizedRoute>
										<Archives />
									</AuthorizedRoute>
								</Route>
							</Switch>
							<Switch>
								<Route exact path="/counter">
									<AuthorizedRoute>
										<Counter />
									</AuthorizedRoute>
								</Route>
							</Switch>
						</div>
					</div>
				</Router>
			</div>
		);
	}
}

AppComp.propType = {
	viewSideMenu: propType.bool.isRequired
};

const mapStateToProps = state => ({
	viewSideMenu: state.viewState.viewSideMenu
});

export default connect(mapStateToProps)(AppComp);
