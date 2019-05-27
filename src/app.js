import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
// import * as firebase from "firebase";

import Landing from "./components/layout/Landing";
import NavBar from "./components/layout/NavBar";
import LogIn from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";

// Firebase Set Up----------------------------------------------------
// var firebaseConfig = {
//   apiKey: "AIzaSyDBF8gzhskQhkIoxTrr0H1LMAhZOyqbhfE",
//   authDomain: "electron-react-firebase.firebaseapp.com",
//   databaseURL: "https://electron-react-firebase.firebaseio.com",
//   projectId: "electron-react-firebase",
//   storageBucket: "electron-react-firebase.appspot.com",
//   messagingSenderId: "565833849649",
//   appId: "1:565833849649:web:93ce6bf50b4623df"
// };

// const firebaseProject = firebase.initializeApp(firebaseConfig);
// --------------------------------XXX----------------------------------

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* <NavBar /> */}
          <Route exact path="/" component={Landing} />
          <div>
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
