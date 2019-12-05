import React, { Component } from 'react';

class SearchBar extends Component {
	render() {
		return (
			<div>
				<input className="bp3-input bp3-align-left non-dragable" placeholder="Search tags..." type="text" />
			</div>
		);
	}
}

export default SearchBar;
