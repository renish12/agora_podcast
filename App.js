import React, { Component } from "react";
import { NativeModules } from "react-native";
import MainStack from "./App/navigations/MainStack";
// import store from "./utils/store";
// import { Provider } from "react-redux";
// import SettingsProvider from "./utils/SettingsProvider";
export default class MainApp extends Component {
  // componentDidMount() {
  //   NativeModules.ShakeBugAndroid.shakeBugInit();
  // }
  render() {
    return (
      // <Provider store={store}>
      //   <SettingsProvider>
          <MainStack />
        // </SettingsProvider>
      // </Provider>
    );
  }
}
