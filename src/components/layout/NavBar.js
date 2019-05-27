import React, { Component } from "react";
import { Button, Position, Tooltip } from "@blueprintjs/core";

class NavBar extends Component {
  render() {
    return (
      <div className="navBar fixedToTop dragable">
        <nav className="bp3-navbar bp3-dark .modifier">
          <div className="bp3-navbar-group bp3-align-left">
            <button className="bp3-button bp3-minimal bp3-icon-user non-dragable" />
            {/* <div className="bp3-navbar-heading"></div> */}
            <Tooltip content="Home" position={Position.BOTTOM}>
              <button
                className="bp3-button bp3-minimal bp3-icon-home non-dragable"
                href="/"
              />
            </Tooltip>
            <span className="bp3-navbar-divider" />
          </div>

          <div className="bp3-navbar-group bp3-align-right">
            <input
              className="bp3-input bp3-align-left non-dragable"
              placeholder="Search tags..."
              type="text"
            />
            <span className="bp3-navbar-divider" />
            <button className="bp3-button bp3-minimal bp3-icon-notifications non-dragable" />
            <button className="bp3-button bp3-minimal bp3-icon-cog non-dragable" />
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
