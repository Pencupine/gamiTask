import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Icon,
  Intent,
  Card,
  FormGroup,
  InputGroup,
  Elevation
} from "@blueprintjs/core";

class LogIn extends Component {
  googleLogInFunction() {}

  facebookLogInFunction() {}
  render() {
    const Style = {
      backgroundColor: "#41798E",
      color: "white",
      width: "100%",
      height: "100vh"
    };

    return (
      <div className="SignUp" style={Style}>
        <div className="container">
          <div className="navBarPadding" />
          <div className="navBarPadding" />
          <div className="row">
            <div className="col-md-3" />
            <Card
              className="bp3-dark col-md-6 text-center"
              elevation={Elevation.FOUR}
            >
              <div className="row text-center nav">
                <Link
                  to="/"
                  className="bp3-navbar-group bp3-align-left"
                  style={{ paddingLeft: "10px" }}
                >
                  <Button icon="arrow-left" />
                </Link>

                {/* <Link
                  to="/"
                  className="bp3-navbar-group bp3-align-right"
                  style={{ paddingRight: "10px" }}
                >
                  <Button icon="arrow-right" />
                </Link> */}
              </div>

              <div className="row">
                <div className="col-md-1" />
                <div className="col-md-10">
                  <h1>Log In</h1>
                  <hr />
                  <div className="row">
                    <div className="text-center">
                      <FormGroup
                        label="Please Enter Email ID and Choose Password"
                        labelFor="text-input"
                      >
                        <br />
                        <div className="row text-center">
                          <div className="col-md-2" />
                          <div className="col-md-8">
                            <InputGroup
                              id="text-input"
                              type="email"
                              placeholder="Email"
                            />
                          </div>
                          <div className="col-md-2" />
                        </div>
                        <br />
                        <div className="row">
                          <div className="col-md-2" />
                          <div className="col-md-8">
                            <InputGroup
                              id="text-input"
                              type="password"
                              placeholder="Password"
                            />
                          </div>
                        </div>
                        <br />
                        <div className="row">
                          <div className="col-md-2" />
                          <div className="col-md-8">
                            <InputGroup
                              id="text-input"
                              type="password"
                              placeholder="Re-type Password"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-2" />
                          <div className="col-md-8" />
                        </div>
                      </FormGroup>
                    </div>
                    <div
                      className="row text-center"
                      style={{ paddingLeft: "24px", paddingRight: "24px" }}
                    >
                      <div className="col-md-2" />
                      <Button className="col-md-8">
                        <div>Log In</div>
                      </Button>
                    </div>
                  </div>
                  {/* <div className="text-center auto row">
                    <div className="col-md-2" />
                    <Button
                      className="col-md-8"
                      onClick={this.googleSignUpFunction}
                    >
                      <div className="row">
                        <div className="text-center col-md-2">
                          <img
                        src="data:image/png;base64,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"
                        width="20px"
                      />
                        </div>
                        <div className="col-md-10">Log In</div>
                      </div>
                    </Button>
                  </div> */}
                  <hr />
                  <div className="text-cent"> OR </div>
                  <br />
                  <div className="text-center auto row">
                    <div className="col-md-2" />
                    <Button className="col-md-8">
                      <div className="row">
                        <div className="text-center col-md-2">
                          <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARoSURBVFhH3VjbThNRFJ0n4x8YP0hjfEFFLQ8qRlDUxEQxmhiBtkDUYrQgqHgl+mC8gQoRKFoaFSPFAkYNXtAgVvChirRIacF2e1Y9SC+7nRlmfHElK5l0ztl79Vz2ZZT/FrtOv7AU1XrvbXY88Vuq3DPryjvjeWXtBOK5oKo7jHfbnd67JQ0D6+W0f4u9jc+XF9d6WzdWuqOWSjftrB+gA1eHyXprjI62Bqjm/o8E8YzfDl4ZppL6fhLjwSj+0KFrL5dJc+ahsGlkKVYiv6IzXuzso/Ibn+l4x6Rm1rRPJuYUiblYXSH0DmxK88awu2FgNbar8PhTqmz5ygrQw8qWcSqs6aGCas/07sYXq6SbxWHnKV/1ugpXvLTpLevMCGETtuFDutOHorq+i+ttXWS9+YV1YAYrhO18axdtr/OdlW61Af8K4szYUjXam8cJvjSvJM4clr7ipp81qJXOriBdeBSiq0+n6NLjEJ0Xz3UPguxY+MoXPlXPJG6WRVyI/U3vWENa2Do4Tf7vcxSLE4tm3092Xunlt2Sp7p7OebsRSnBbOQNqPNE5SW/GZ6WM7MgmENzi6EEoapFyUoEAKrY2tthz5/0YkRJyI5dAhCCx1TE2mG872duGIMxNVOOZ7iD9ikkFKsglECxyegkZR8pagEhFEb0ZYp7uobB0n4rIbJyefYiQ63X4L895QqyNeZZf/0wijUakrD/YdWZwA/IlUhI3SY1DWc7etd7cq8URGqCl5OxAnpQngrJYUiR1boIW+ifmpKQFBEK/2LFauENoSbksKItQlXCDtRBi0jE0NsuO1UJo2eToGZXyFAX1nO32GDtYCzmBg6NRdqwWIr2iQJHyFGWtKIGOtn1jB2uh2QKPtAVEWeaKSXmKkne4QxzOCXawFpot0HF/gtaIylzK0yewZ3iGZkT4SGacSWuIi+njwKYnU6zdZGYI1LPFvRozRjbUiiKCs5vMjC3Wc0mMCAyGY6zNdGZcEj1hxojAkcAcazOdB668Tw0zegK1EYH9n7RdHARq0T02S3n6Uh0K0fqHqfw2lVkpvPRHM8Y5XbzNZCZSnf1haqoDjBQLZoaZMqEBd0LKWgC2GX0rN0mNZgrcdtJLKJylrAUkClYRblA0chNz0SyBNtFAoWjO+vUh0fGLppqbnItmCMTZ24ySv7bvlpSTCTQsBVXuMBoYzkg2miGw9NKbRNNktb5eIuXwQOunt+00KhC+4HPP6VcrpYzcmG/c0VRzBtNpRKDuxn0exXW+RnyW0LKSixWIsJZvdVHJqf4G6VYfdjQM2tHxq51JvQJxIfaJMwfbIoPZpLvFQUT0FTi8aKqzbbkegfbmr4nbWlDt+Qnb0o0x4HajiUFTjUCK1jA5LaoJxFhkCMyFDYQS0z5gJgMBFBkHqQi5G0kdVZDv/QSFpqM0J6pUMCie232BxDtxvv58AhZzMDdrEDYbSOZYVZRFWx2e2Y02V3xtWQeBFntXfMsxTxTvMCYj8f8/UJTfOIsEdFrfhL8AAAAASUVORK5CYII="
                            width="20px"
                          />
                        </div>
                        <div className="col-md-10">Log In With Facebook</div>
                      </div>
                    </Button>
                  </div>
                  <hr />
                  <div className="row text-center">
                    Already have an Account?
                  </div>
                  <br />
                  <div className="text-center auto row">
                    <div className="col-md-3" />
                    <Link to="/signup">
                      <Button className="col-md-6">
                        <div className="row">
                          <div className="text-center col-md-2">
                            <Icon
                              icon="new-person"
                              intent={Intent.PRIMARY}
                              iconSize={20}
                            />
                          </div>
                          <div className="col-md-10">Sign Up New Account</div>
                        </div>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;
