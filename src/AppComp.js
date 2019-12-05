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

class AppComp extends Component {
	constructor(props) {
		super(props);
	}

	render() {
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
						<Route exact path="/" component={Landing} />
						<div style={{ gridColumnStart: '2' }}>
							<Route exact path="/login" component={LogIn} />
							<Route exact path="/signup" component={SignUp} />
							<Route path="/home" component={Home} />
							<Route exact path="/settings" component={Settings} />
							<Route exact path="/taskman" component={TaskMan} />
							<Route exact path="/notes" component={Notes} />
							<Route exact path="/calender" component={Calender} />
							<Route exact path="/monies" component={Monies} />
							<Route exact path="/tagsGallery" component={TagsGallery} />
							<Route exact path="/archives" component={Archives} />
							<Route exact path="/counter" component={Counter} />
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
