import React, { Component } from 'react';

import getTagsStructure from '../../../dataObjects/tags/getTagsStructure';

import { ipcRenderer } from 'electron';
import TagsList from './TagsList';

export default class AllTagsList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            tagStructure: this.getDefaultTagStructure()
        };
    }

    getDefaultTagStructure() {
        return {
            tags: {},
            columns: {
              "0": {
                id: "0",
                title: "Todo",
                taskIDs: []
              },
              "1": {
                id: "1",
                title: "Doing",
                taskIDs: []
              },
              "2": {
                id: "2",
                title: "Done",
                taskIDs: []
              }
            },
            columnOrder: ["0", "1", "2"]
          };
    }

    render() {
      var tags;
      var premiumTags;
      var tagsStructure;
      ipcRenderer.on('allTags', (event, data) => {
        console.log(data);
        tags = data.tags;
        premiumTags = data.premiumTags;
        tagsStructure = getTagsStructure(tags, premiumTags);
        console.log(tagsStructure);
      });

      return (
          <div>
            <TagsList tagsStructure={tagsStructure}/>
          </div>
      )
    }
}
