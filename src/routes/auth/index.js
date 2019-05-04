import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Button,
  TextInput,
  Image
} from "react-native";
import firebase from "react-native-firebase";
const successImageUri =
  "https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png";
export default class AuthScreen extends React.Component {
  constructor() {
    super();
    this.unsubscriber = null;
    this.state = {
      email: "leo@gmail.com",
      pwd: "123456",
      isAuthenticated: false,
      user: null,
      message: "",
      codeInput: "",
      phoneNumber: "+84367123250",
      confirmResult: null
    };
  }

  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: "",
          codeInput: "",
          phoneNumber: "+84367123250",
          confirmResult: null
        });
      }
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

  _register = async () => {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.pwd);
    alert("Register success");
  };

  _onLogin = async () => {
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.pwd);
    alert("Signin success");
  };

  _onLogout = () => {
    firebase.auth().signOut();
  };

  _confirmCode = () => {
    const { codeInput, confirmResult } = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult
        .confirm(codeInput)
        .then(user => {
          this.setState({ message: "Code Confirmed!" });
        })
        .catch(error =>
          this.setState({ message: `Code Confirm Error: ${error.message}` })
        );
    }
  };

  _onRegisterPhone = () => {
    const { phoneNumber } = this.state;
    this.setState({ message: "Sending code ..." });

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(confirmResult =>
        this.setState({ confirmResult, message: "Code has been sent!" })
      )
      .catch(error =>
        this.setState({
          message: `Sign In With Phone Number Error: ${error.message}`
        })
      );
  };

  renderPhoneNumberInput() {
    const { phoneNumber } = this.state;

    return (
      <View style={{ padding: 25 }}>
        <Text>Enter phone number:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ phoneNumber: value })}
          placeholder={"Phone number ... "}
          value={phoneNumber}
        />
        <Button title="Sign In" color="green" onPress={this._onRegisterPhone} />
      </View>
    );
  }

  renderMessage() {
    const { message } = this.state;

    if (!message.length) return null;

    return (
      <Text style={{ padding: 5, backgroundColor: "#000", color: "#fff" }}>
        {message}
      </Text>
    );
  }

  renderVerificationCodeInput() {
    const { codeInput } = this.state;

    return (
      <View style={{ marginTop: 25, padding: 25 }}>
        <Text>Enter verification code below:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ codeInput: value })}
          placeholder={"Code ... "}
          value={codeInput}
        />
        <Button
          title="Confirm Code"
          color="#841584"
          onPress={this._confirmCode}
        />
      </View>
    );
  }
  render() {
    const { user, confirmResult } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {!user && !confirmResult && this.renderPhoneNumberInput()}

        {this.renderMessage()}

        {!user && confirmResult && this.renderVerificationCodeInput()}
        {user && (
          <View>
            <Text>Welcome to my awesome app {user.email}!</Text>
            <Button title="Logout" onPress={this._onLogout} />
          </View>
        )}
        {user && (
          <View
            style={{
              padding: 15,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#77dd77",
              flex: 1
            }}
          >
            <Image
              source={{ uri: successImageUri }}
              style={{ width: 100, height: 100, marginBottom: 25 }}
            />
            <Text style={{ fontSize: 25 }}>Signed In!</Text>
            <Text>{JSON.stringify(user)}</Text>
            <Button title="Sign Out" color="red" onPress={this.signOut} />
          </View>
        )}
        <Button title="Register with email" onPress={this._register} />
        <Button title="Login with email" onPress={this._onLogin} />
        <Button title="Register with phone" onPress={this._onRegisterPhone} />
      </SafeAreaView>
    );
  }
}
