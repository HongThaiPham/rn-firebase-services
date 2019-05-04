import React from "react";
import { Actions, Scene } from "react-native-router-flux";

import Home from "./home";
import AuthScreen from "./auth";
const scenes = Actions.create(
  <Scene key="root">
    <Scene key="home" component={Home} title="Home" initial />
    <Scene key="auth" component={AuthScreen} title="Auth" />
  </Scene>
);

export default scenes;
