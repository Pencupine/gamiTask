import React, { Component } from "react";
import { Callout } from "@blueprintjs/core";
import { Droppable } from "react-beautiful-dnd";

import NewKanbanCard from "../todoList/kanbanList/NewKanbanCard";
import NewTaskCard from "../todoList/dailiesList/NewTaskCard";
import DraggableTaskCard from "../../../dataObjects/tasks/DraggableTaskCard";

export default class Column extends Component {
  render() {
    console.log(this.props);
    // console.log("Column");

    var droppableStyle = {
      width: this.props.taskType == 0 ? "100%" : "33.33%",
      paddingRight: "5px"
    };

    return (
      <div style={droppableStyle}>
        <Callout title={this.props.column.title}>
          <div>
            <Droppable droppableId={this.props.column.id}>
              {provided => (
                <ul
                  style={{
                    listStyleType: "none",
                    listStylePosition: "inside",
                    padding: "0",
                    margin: "0",
                    maxBlockSize: "54vh",
                    overflow: "auto",
                    minHeight: "10px"
                  }}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {this.props.tasks.map((task, index) => {
                    return (
                      <li key={task.taskID}>
                        <DraggableTaskCard task={task} index={index} />
                      </li>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
          {this.props.taskType == 0 ? (
            <NewTaskCard />
          ) : (
            <NewKanbanCard kanbanType={parseInt(this.props.column.id)} />
          )}
        </Callout>
      </div>
    );
  }
}
