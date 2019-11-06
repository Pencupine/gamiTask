import React, { Component } from 'react';

import TagObj from "../../../dataObjects/tags/TagObj";

export default class TagsList extends Component {
    render() {
        return (
            <div>
                <TagObj
              title={"Today"}
              tagStyle={
                {
                  active: true,
                  round: true,
                  intent: "none",
                  interactive: true,
                  minimal: false
                }
              }
              metaData={
                {
                  objID: 'something',
                  parentID: null
                }
              }
              actions={
                {
                  onclick: ()=>{
                      console.log("TagClick");
                  }
                }
              }
            >
            </TagObj>
            </div>
        )
    }
}
