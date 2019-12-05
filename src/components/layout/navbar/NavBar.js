import React, { Component } from 'react';

import WinButtons from './navbarComponents/WinButtons';
import SideMenuToggleButton from './navbarComponents/SideMenuToggleButton';
import TabButtons from './navbarComponents/TabButtons';
import ModButtons from './navbarComponents/ModButtons';
import SearchBar from './navbarComponents/SearchBar';
import NavigationButtons from './navbarComponents/NavigationButtons';

class NavBar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="navBar fixedToTop dragable">
				<nav className="bp3-navbar bp3-dark .modifier">
					<div className="bp3-navbar-group bp3-align-left">
						<SideMenuToggleButton />
						<span className="bp3-navbar-divider" />
						<TabButtons />
						<span className="bp3-navbar-divider" />
						<NavigationButtons />
						<span className="bp3-navbar-divider" />
					</div>

					<div className="bp3-navbar-group bp3-align-right">
						<SearchBar />
						<span className="bp3-navbar-divider" />
						<ModButtons />
						<span className="bp3-navbar-divider" />
						<WinButtons />
					</div>
				</nav>
			</div>
		);
	}
}

export default NavBar;
