import React, { Component } from "react";

import TagObj from "../../../dataObjects/tags/TagObj";
import TagTree from "./TagTree";
import { Icon } from "@blueprintjs/core";

export default class TagGalObj extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expandChild: false
		};

		this.expandChildList = this.expandChildList.bind(this);
	}

	expandChildList() {
		this.setState({
			expandChild: !this.state.expandChild
		});
	}

	render() {
		var { tagObject } = this.props;
		return (
			<div>
				<div>
					<div style={{ padding: "5px" }} className="row">
						<div className="col" style={{ float: "left" }}>
							<TagObj
								title={tagObject.title}
								tagStyle={{
									active: true,
									round: true,
									intent: "none",
									interactive: true,
									minimal: false
								}}
								metaData={{
									objID: tagObject.tagID,
									parentID: null
								}}
								actions={{
									onclick: () => {
										console.log("TagClick");
									}
								}}
							/>
						</div>
						<div className="col" style={{ float: "left" }}>
							{tagObject.subTags.length === 0 ? null : (
								<div onClick={this.expandChildList}>
									{this.state.expandChild === true ? (
										<Icon icon="chevron-up" style={{ color: "gainsboro" }} />
									) : (
										<Icon icon="chevron-down" style={{ color: "gainsboro" }} />
									)}
								</div>
							)}
						</div>
					</div>
					{this.state.expandChild === true ? (
						<div>
							<ul style={{ listStyleType: "none", marginLeft: "15px", paddingLeft: "0px" }}>
								{tagObject.subTags.length === 0 ? null : <TagTree tagsArray={tagObject.subTags} />}
							</ul>
						</div>
					) : null}
					{tagObject.priority === 1 ? <br /> : null}
				</div>
			</div>
		);
	}
}
