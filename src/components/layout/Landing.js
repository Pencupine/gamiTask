import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "@blueprintjs/core";

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props);
    return (
      <div className="landing">
        <div className="navBarPadding" />
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div id="landingPadding" />
              <h1>GamiTask For Windows</h1>
              <p className="">
                {" "}
                "Gamify Your Task Management and Note Taking!!!" - Pencupine
              </p>
              <hr />
              <div>
                <Link to="/home">
                  <Button
                    intent={"primary"}
                    onClick={() => {
                      console.log("Continue Offline");
                      // this.props.toggleNavBar();
                    }}
                  >
                    <div className="col-md-12">Continue Offline</div>
                  </Button>
                </Link>
              </div>
              <hr />
              <br />
              Go Online and Back Up
              <div
                className="row md-4 auto"
                style={{
                  marginTop: "10px",
                  marginBottom: "10px"
                }}
              >
                <Link to="/login">
                  <Button
                    intent={"primary"}
                    onClick={() => {
                      console.log("Log Request");
                    }}
                  >
                    <div className="col-md-12">Log In</div>
                  </Button>
                </Link>
              </div>
              <div className="row text-center">OR</div>
              <div
                className="row md-4 auto"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                <Link to="/signup">
                  <Button
                    intent={"primary"}
                    onClick={() => {
                      console.log("Log Request");
                    }}
                    style={{ paddingLeft: "5px", paddingRight: "5px" }}
                  >
                    <div className="col-md-12">Sign Up</div>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
