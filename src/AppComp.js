import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './components/layout/Landing';
import NavBar from './components/layout/NavBar';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import Settings from './components/settings/Settings';
import SideBar from './components/layout/SideBar';
import Home from './components/workspaces/home/Home';
import TaskMan from './components/workspaces/taskMan/TaskMan';
import Notes from './components/workspaces/notes/Notes';
import Calender from './components/workspaces/calender/Calender';
import Monies from './components/workspaces/monies/Monies';
import TagsGallery from './components/workspaces/tagsgallery/TagsGallery';
import Archives from './components/workspaces/archives/Archives';

import Counter from './components/workspaces/counters/Counter';

export default class AppComp extends Component {
	constructor(props) {
		super(props);
		this.state = { menuOpen: false };

		this.toggleSideBar = this.toggleSideBar.bind(this);
	}

	toggleSideBar() {
		this.setState({ menuOpen: !this.state.menuOpen });
		console.log('Now Menu is' + this.state.menuOpen);
	}

	render() {
		return (
			<div className="AppComp">
				<Router>
					<NavBar toggleSideBar={this.toggleSideBar} />

					<div
						style={{
							display: 'grid',
							gridTemplateColumns: this.state.menuOpen ? '20% 80%' : '3.75% 96.25%'
						}}
					>
						<div style={{ gridColumnStart: '1' }}>
							<SideBar menuOpen={this.state.menuOpen} />
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
