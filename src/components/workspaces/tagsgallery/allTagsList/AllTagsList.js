import React, { Component } from "react";

import getTagsStructure from "../../../dataObjects/tags/getTagsStructure";

import { ipcRenderer } from "electron";
import TagTree from "./TagTree";
import { DragDropContext } from "react-beautiful-dnd";

class AllTagsList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tagsStructure: null
		};
	}

	onDragEnd() {
		console.log("Drag Event");
	}

	render() {
		var tags;
		var premiumTags;
		var tagsStructure;
		ipcRenderer.on("allTags", (event, data) => {
			tags = data.tags;
			premiumTags = data.premiumTags;
			tagsStructure = getTagsStructure(tags, premiumTags);
			this.setState({
				tagsStructure: tagsStructure
			});
		});

		return (
			<div>
				{this.state.tagsStructure !== null ? (
					<div>
						<DragDropContext onDragEnd={this.onDragEnd}>
							<ul style={{ listStyleType: "none" }}>
								<TagTree tagsArray={this.state.tagsStructure} />
							</ul>
						</DragDropContext>
					</div>
				) : null}
			</div>
		);
	}
}

export default AllTagsList;
