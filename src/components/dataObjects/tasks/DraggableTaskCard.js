import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

export default class DraggableTaskCard extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.taskID} index={this.props.index}>
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <TaskCard taskCardData={this.props.task} />
          </div>
        )}
      </Draggable>
    );
  }
}
