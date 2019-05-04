import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import firebase from "react-native-firebase";
export default class AuthScreen extends React.Component {
  constructor() {
    super();
    this.unsubscriber = null;
    this.state = {
      email: "leo@gmail.com",
      pwd: "123456",
      isAuthenticated: false,
      user: null
    };
  }

  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
      // alert("user auth success");
    });
    // TODO: You: Do firebase things
    // try {

    //   // -----------anonymous auth
    //   // const { user } = await firebase.auth().signInAnonymously();
    //   // this.setState({ isAuthenticated: true });
    //   // console.warn("User -> ", user.toJSON());
    // } catch (error) {
    //   console.error(error);
    // }

    // await firebase.analytics().logEvent('foo', { bar: '123'});
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  async _register() {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.pwd);
    alert("Register success");
  }

  async _onLogin() {
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.pwd);
    alert("Signin success");
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity onPress={this._register.bind(this)}>
          <Text>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._onLogin.bind(this)}>
          <Text>Login</Text>
        </TouchableOpacity>
        {this.state.user && (
          <Text>Welcome to my awesome app {this.state.user.email}!</Text>
        )}
      </SafeAreaView>
    );
  }
}
