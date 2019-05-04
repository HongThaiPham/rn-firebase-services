import React, { Component } from "react";
import { Router } from "react-native-router-flux";
import scenes from "./routes/scenes";
export default class AppContainer extends Component {
  render() {
    return <Router scenes={scenes} />;
  }
}
