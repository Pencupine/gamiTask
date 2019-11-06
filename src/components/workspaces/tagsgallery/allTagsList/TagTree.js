import React, { Component } from "react";

import TagGalObj from "./TagGalObj";

export default class TagTree extends Component {
	render() {
		var { tagsArray } = this.props;
		if (tagsArray.length === 0) return null;
		return tagsArray.map((tagObject) => (
			<li key={tagObject.tagID}>
				<TagGalObj tagObject={tagObject} />
			</li>
		));
	}
}
