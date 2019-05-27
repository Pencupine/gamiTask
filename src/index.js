import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

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

window.onload = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};
