import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './App/Screen/Home';
// import Live from './App/Screen/Live';
// import PodcastScreen from './App/Screen/PodcastScreen';
import Voice from './App/Screen/Voice';
import JoinChannelAudio from './App/Screen/Agora/BasicAudioAgora';
// import AgoraVoice from './App/Screen/Agora/AgoraVoice';
// import MediaRecorder from './App/Screen/Agora/Recorder';
// import StreamMessage from './App/Screen/Agora/StreamMessage';
// import Live from './screens/Live';

const Stack = createStackNavigator();

export default function App() {
  const options = {headerShown: false};
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={options} />
        {/* <Stack.Screen name="Live" component={Live} options={options} />
        <Stack.Screen
          name="PodcastScreen"
          component={PodcastScreen}
          options={options}
        /> */}
        <Stack.Screen
          name="Voice"
          component={Voice}
          options={options}
        />
        <Stack.Screen
          name="JoinChannelAudio"
          component={JoinChannelAudio}
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
}


// import React, {Component} from 'react';
// import {
//   Platform,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import RtcEngine, {ClientRole, ChannelProfile} from 'react-native-agora';
// import requestCameraAndAudioPermission from './App/components/Permission';
// import styles from './App/components/Style';
// import RtmEngine from 'agora-react-native-rtm';
// import {AgoraButton} from './App/components/ui';

// interface Props {}

// /**
//  * @property appId Agora App ID
//  * @property token Token for the channel;
//  * @property isHost Boolean value to select between broadcaster and audience
//  * @property channelName Channel Name for the current session
//  * @property joinSucceed State variable for storing success
//  * @property rtcUid local user's UID on joining the RTC channel
//  * @property peerIds Array for storing connected peers
//  * @property myUsername local user's name to login to RTM
//  * @property Array to store usernames mapped to RTC UIDs
//  */

// interface State {
//   appId: string;
//   token: string | null;
//   isHost: boolean;
//   channelName: string;
//   joinSucceed: boolean;
//   rtcUid: number;
//   peerIds: number[];
//   myUsername: string;
//   usernames: {[uid: string]: string};
//   userAccount: string;
//   localUserData: object[];
//   enableLocalAudio: boolean;
// }

// export default class App extends Component<null, State> {
//   _rtcEngine?: RtcEngine;
//   _rtmEngine?: RtmEngine;

//   constructor(props) {
//     super(props);
//     this.state = {
//       appId: 'd913c526d6ff4d388b44982f6b2106e3',
//       token:
//         '007eJxTYEjR3ntPt4htUcXs6TenH/BnuTpVfqH78+qHhnmHS6fM23NOgcHU0sjcNNXcwMTczNAkzSIx0cTI0DTVwMwQyE01srRsO2afzCbhmLxwaTwLIwMEgvhcDAFF+VmpySUKISEMDAA2uiGY',
//       isHost: true,
//       channelName: 'Project TT',
//       joinSucceed: false,
//       rtcUid: parseInt((new Date().getTime() + '').slice(4, 13), 10),
//       peerIds: [],
//       myUsername: '',
//       usernames: {},
//       userAccount: '',
//       localUserData: [],
//       enableLocalAudio: false,
//     };
//     if (Platform.OS === 'android') {
//       // Request required permissions from Android
//       requestCameraAndAudioPermission().then(() => {
//         console.log('requested!');
//       });
//     }
//   }

//   componentDidMount() {
//     this.initRTC();
//   }

//   componentWillUnmount() {
//     this._rtcEngine?.destroy();
//   }

//   /**
//    * @name initRTC
//    * @description Function to initialize the Rtc Engine, attach event listeners and actions
//    */
//   initRTC = async () => {
//     const {appId, isHost} = this.state;
//     this._rtcEngine = await RtcEngine.create(appId);
//     // await this._rtcEngine.disableVideo();
//     await this._rtcEngine.setChannelProfile(ChannelProfile.LiveBroadcasting);

//     await this._rtcEngine.setClientRole(
//       isHost ? ClientRole.Broadcaster : ClientRole.Audience,
//     );

//     this._rtcEngine.addListener('UserJoined', (uid, elapsed) => {
//       console.log('11');

//       console.log('UserJoined', uid, elapsed);
//       // Get current peer IDs
//       const {peerIds} = this.state;
//       // If new user
//       if (peerIds.indexOf(uid) === -1) {
//         this.setState({
//           // Add peer ID to state array
//           peerIds: [...peerIds, uid],
//         });
//       }
//     });

//     this._rtcEngine.addListener('UserOffline', (uid, reason) => {
//       console.log('12');

//       console.log('UserOffline', uid, reason);
//       const {peerIds} = this.state;
//       this.setState({
//         // Remove peer ID from state array
//         peerIds: peerIds.filter(id => id !== uid),
//       });
//     });

//     // If Local user joins RTC channel
//     this._rtcEngine.addListener(
//       'JoinChannelSuccess',
//       (channel, uid, elapsed) => {
//         console.log('13');
//         console.log('JoinChannelSuccess', channel, uid, elapsed);
//         var xx = {
//           channel: channel,
//           uid: uid,
//           elapsed: elapsed,
//         };
//         this.setState({
//           localUserData: [...this.state.localUserData, xx],
//           joinSucceed: true,
//           rtcUid: uid,
//         });
//       },
//     );
//   };

//   /**
//    * @name toggleRole
//    * @description Function to toggle the roll between broadcaster and audience
//    */
//   toggleRole = async () => {
//     console.log(this.state.isHost, '11111111');
//     console.log(ClientRole.Audience, '11111111-----');
//     console.log(ClientRole.Broadcaster, '-----11111111');

//     this._rtcEngine?.setClientRole(
//       !this.state.isHost ? ClientRole.Broadcaster : ClientRole.Audience,
//     );
//     this.setState(ps => {
//       return {isHost: !ps.isHost};
//     });
//   };

//   /**
//    * @name startCall
//    * @description Function to start the call
//    */
//   startCall = async () => {
//     const {myUsername, token, channelName, rtcUid, userAccount} = this.state;
//     if (myUsername) {
//       // Join RTC Channel using null token and channel name
//       try {
//         await this._rtcEngine?.joinChannel(
//           token,
//           channelName,
//           userAccount,
//           rtcUid,
//         );
//         //  await this._rtcEngine?.joinChannelWithUserAccount(
//         //    token,
//         //    channelName,
//         //    userAccount,
//         //  )
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   /**
//    * @name endCall
//    * @description Function to end the call
//    */
//   endCall = async () => {
//     let {channelName, rtcUid} = this.state;
//     await this._rtcEngine?.leaveChannel();
//     await this._rtmEngine
//       ?.sendMessageByChannelId(channelName, rtcUid + ':!leave')
//       .catch(e => console.log(e));
//     this.setState({peerIds: [], joinSucceed: false, usernames: {}});
//     await this._rtmEngine?.logout().catch(e => console.log(e));
//   };

//   enableLocalAudio = () => {
//     this._rtcEngine?.enableLocalAudio(true);
//     this.setState({enableLocalAudio: true});
//   };

//   /**
//    * Step 3-1-2 (Optional): disableLocalAudio
//    */
//   disableLocalAudio = () => {
//     this._rtcEngine?.enableLocalAudio(false);
//     this.setState({enableLocalAudio: false});
//   };

//   render() {
//     const {
//       joinSucceed,
//       isHost,
//       channelName,
//       myUsername,
//       peerIds,
//       usernames,
//       enableLocalAudio,
//     } = this.state;
//     return (
//       <View style={styles.max}>
//         <View style={styles.spacer}>
//           <Text style={styles.roleText}>
//             You're{' '}
//             <Text style={styles.roleTextBold}>
//               {isHost ? 'a broadcaster' : 'the audience'}
//             </Text>
//           </Text>
//           <Text style={styles.roleText}>
//             {joinSucceed
//               ? "You're connected to " + channelName
//               : "You're disconnected - start call"}
//           </Text>
//         </View>
//         {this._renderUsers()}
//         {joinSucceed ? (
//           <></>
//         ) : (
//           <>
//             <TextInput
//               style={styles.input}
//               placeholder={'Name'}
//               onChangeText={t => {
//                 this.setState({myUsername: t});
//               }}
//               value={myUsername}
//             />
//             {!myUsername ? (
//               <Text style={styles.errorText}>Name can't be blank</Text>
//             ) : null}
//           </>
//         )}
//         <View style={{flexDirection: 'column', height: 120}}>
//           <View style={styles.buttonHolder}>
//             <TouchableOpacity onPress={this.toggleRole} style={styles.button}>
//               <Text style={styles.buttonText}> Toggle Role </Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={this.startCall} style={styles.button}>
//               <Text style={styles.buttonText}> Start Call </Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={this.endCall} style={styles.button}>
//               <Text style={styles.buttonText}> End Call </Text>
//             </TouchableOpacity>
//           </View>
//           <View style={{height: 80}} />
//           <AgoraButton
//             buttonStyle={{backgroundColor: '#38373A', marginHorizontal: 25}}
//             title={`${enableLocalAudio ? 'Disable' : 'Enable'} Microphone`}
//             onPress={
//               enableLocalAudio ? this.disableLocalAudio : this.enableLocalAudio
//             }
//           />
//           <View style={{height: 5}} />
//         </View>
//       </View>
//     );
//   }

//   _renderUsers = () => {
//     const {joinSucceed, peerIds, isHost, usernames, myUsername, localUserData} =
//       this.state;
//     return joinSucceed ? (
//       <View style={styles.fullView}>
//         <Text style={{fontWeight: 'bold'}}>{localUserData[0].uid}</Text>
//         <ScrollView>
//           {peerIds.map((value, index) => {
//             return <Text key={index}>{value}</Text>;
//             // return <Text key={index}>{usernames[value + '']}</Text>;
//           })}
//         </ScrollView>
//       </View>
//     ) : null;
//   };
// }
