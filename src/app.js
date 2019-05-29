import React, { Component } from "react";

import AppComp from "./AppComp";

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     showNav: false
  //   };
  //   this.toggleNavBar = this.toggleNavBar.bind(this);
  // }

  // toggleNavBar() {
  //   // event.preventDefault();
  //   this.setState({ showNav: true });
  // }

  render() {
    return <AppComp />;
  }
}

export default App;
