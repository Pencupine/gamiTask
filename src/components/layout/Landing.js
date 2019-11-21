import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@blueprintjs/core';
import { ipcRenderer } from 'electron';
import electronStorage from 'electron-json-storage';

async function tokenCheck() {
  return new Promise(resolve => {
    electronStorage.has('idToken', (error, hasKey) => {
      if (error) console.log(error);

      resolve(hasKey);
    });
  });
}

class Landing extends Component {
  constructor(props) {
    super(props);
  }
  // Delete this function and make a seperate sign up module............................................................................
  signUp() {
    ipcRenderer.send('openSignUp', true);
  }

  render() {
    // console.log(this.props);
    return (
      <div className="">
        <div className="navBarPadding" />
        <div className="landingResize">
          <div className="landingImage" />
          <div className="landingOverlay" />
          <div style={{ position: 'relative' }}>
            <div className="col-md-1" />
            <div className="col-md-10 text-center">
              <div id="landingPadding" />
              <h1>GamiTask For Windows</h1>
              <p className="">
                {' '}
                "Gamify Your Task Management and Note Taking!!!" - Pencupine
              </p>
              <hr />
              <div>
                <Link to="/home">
                  <Button
                    intent={'primary'}
                    onClick={() => {
                      console.log('Continue Offline');
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
                  marginTop: '10px',
                  marginBottom: '10px'
                }}
              >
                <Link to="/login">
                  <Button
                    intent={'primary'}
                    onClick={() => {
                      console.log('Log Request');
                    }}
                  >
                    <div className="col-md-12">Log In</div>
                  </Button>
                </Link>
              </div>
              <div className="row text-center">OR</div>
              <div
                className="row md-4 auto"
                style={{ marginTop: '10px', marginBottom: '10px' }}
              >
                {/* <Link to="/signup"> */}
                {tokenCheck() ? null : (
                  <Button
                    intent={'primary'}
                    onClick={this.signUp}
                    style={{ paddingLeft: '5px', paddingRight: '5px' }}
                  >
                    <div className="col-md-12">Sign Up</div>
                  </Button>
                )}
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
