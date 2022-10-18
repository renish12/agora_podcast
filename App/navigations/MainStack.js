// import React, { useEffect } from "react";
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../Screen/Home';
import Voice from '../Screen/Voice';
import AudioCaption from '../Screen/AudioCaption';
import JoinChannelAudio from '../Screen/Agora/BasicAudioAgora';

const Stack = createStackNavigator();
const MainStackNavigator = () => {
  // useEffect(() => {
  //   NativeModules.ShakeBugAndroid.shakeBugInit();
  // }, []);
  const options = {headerShown: false};

  return (
    <NavigationContainer>
      <Stack.Navigator
      // initialRouteName="Splash"
      // screenOptions={{
      //   gestureEnabled: false,
      //   left: null,
      // }}
      >
        <Stack.Screen name="Home" component={Home} options={options} />
        {/* <Stack.Screen name="Live" component={Live} options={options} />
        <Stack.Screen
          name="PodcastScreen"
          component={PodcastScreen}
          options={options}
        /> */}
        <Stack.Screen name="Voice" component={Voice} options={options} />
        <Stack.Screen
          name="JoinChannelAudio"
          component={JoinChannelAudio}
          options={options}
        />
        <Stack.Screen
          name="AudioCaption"
          component={AudioCaption}
          options={options}
        />
        {/* <Stack.Screen
          name="AgoraVoice"
          component={AgoraVoice}
          options={options}
        />
        <Stack.Screen
          name="MediaRecorder"
          component={MediaRecorder}
          options={options}
        />
        <Stack.Screen
          name="StreamMessage"
          component={StreamMessage}
          options={options}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainStackNavigator;
