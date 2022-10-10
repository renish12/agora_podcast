// import React, {useRef, useState, useEffect} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableHighlight,
//   View,
// } from 'react-native';
// import {PermissionsAndroid, Platform} from 'react-native';
// import {
//   ClientRoleType,
//   createAgoraRtcEngine,
//   IRtcEngine,
//   ChannelProfileType,
// } from 'react-native-agora';

// export default function Voice() {
//   const appId = 'd913c526d6ff4d388b44982f6b2106e3';
//   const channelName = 'Project TT';
//   const token =
//     '007eJxTYEjR3ntPt4htUcXs6TenH/BnuTpVfqH78+qHhnmHS6fM23NOgcHU0sjcNNXcwMTczNAkzSIx0cTI0DTVwMwQyE01srRsO2afzCbhmLxwaTwLIwMEgvhcDAFF+VmpySUKISEMDAA2uiGY';
//   const uid = 0;

//   const agoraEngineRef = useRef(IRtcEngine); // Agora engine instance
//   const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
//   const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
//   const [message, setMessage] = useState(''); // Message to the user

//   useEffect(() => {
//     setupVoiceSDKEngine();
//   });

//   const setupVoiceSDKEngine = async () => {
//     try {
//       await getPermission();
//       agoraEngineRef.current = createAgoraRtcEngine();
//       const agoraEngine = agoraEngineRef.current;

//       agoraEngine.registerEventHandler({
//         onJoinChannelSuccess: () => {
//           showMessage('Successfully joined the channel ' + channelName);
//           setIsJoined(true);
//         },
//         onUserJoined: (_connection, Uid) => {
//           console.log(_connection,'----1----');
//           console.log(Uid,'=====----1----');
//           showMessage('Remote user joined with uid ' + Uid);
//           setRemoteUid(Uid);
//         },
//         onUserOffline: (_connection, Uid) => {
//           showMessage('Remote user left the channel. uid: ' + Uid);
//           setRemoteUid(0);
//         },
//       });
//       agoraEngine.initialize({
//         appId: appId,
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const getPermission = async () => {
//     if (Platform.OS === 'android') {
//       await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//       ]);
//     }
//   };

//   function showMessage(msg) {
//     setMessage(msg);
//   }

//   const join = async () => {
//     if (isJoined) {
//       return;
//     }
//     try {
//       console.log(123456);
//       agoraEngineRef.current?.setChannelProfile(
//         ChannelProfileType.ChannelProfileCommunication,
//       );
//       agoraEngineRef.current?.joinChannel(token, channelName, uid, {
//         clientRoleType: ClientRoleType.ClientRoleBroadcaster,
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const leave = () => {
//     try {
//       agoraEngineRef.current?.leaveChannel();
//       setRemoteUid(0);
//       setIsJoined(false);
//       showMessage('You left the channel');
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.main}>
//       <Text style={styles.head}>Agora Voice Calling Quickstart</Text>
//       {/* <View style={styles.btnContainer}>
//         <Text onPress={()=>join()} style={styles.button}>
//           Join
//         </Text>
//         <Text onPress={leave} style={styles.button}>
//           Leave
//         </Text>
//       </View> */}
//       <TouchableHighlight onPress={join} style={styles.button}>
//         <Text style={styles.buttons}>Join</Text>
//       </TouchableHighlight>
//       <TouchableHighlight onPress={leave} style={styles.button}>
//         <Text style={styles.buttons}>Leave</Text>
//       </TouchableHighlight>
//       <ScrollView
//         style={styles.scroll}
//         contentContainerStyle={styles.scrollContainer}>
//         {isJoined ? (
//           <Text>Local user uid: {uid}</Text>
//         ) : (
//           <Text>Join a channel</Text>
//         )}
//         {isJoined && remoteUid !== 0 ? (
//           <Text>Remote user uid: {remoteUid}</Text>
//         ) : (
//           <Text>Waiting for a remote user to join</Text>
//         )}
//         <Text>{message}</Text>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
// const styles = StyleSheet.create({
//   button: {
//     fontWeight: 'bold',
//     color: '#ffffff',
//     backgroundColor: '#0055cc',
//     marginBottom: 5,
//     marginTop: 5,
//     height: 50,
//     width: 250,
//     justifyContent: 'center',
//   },
//   buttons: {
//     fontWeight: 'bold',
//     color: '#ffffff',
//     alignSelf: 'center',
//   },
//   main: {flex: 1, alignItems: 'center'},
//   scroll: {flex: 1, backgroundColor: '#ddeeff', width: '100%'},
//   scrollContainer: {alignItems: 'center'},
//   videoView: {width: '90%', height: 200},
//   btnContainer: {flexDirection: 'row', justifyContent: 'center'},
//   head: {fontSize: 20},
// });

import React, {Component} from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RtcEngine, {ClientRole, ChannelProfile} from 'react-native-agora';
// import requestCameraAndAudioPermission from './App/components/Permission';
import requestCameraAndAudioPermission from '../components/Permission';
import styles from '../components/Style';
import RtmEngine from 'agora-react-native-rtm';
import {AgoraButton} from '../components/ui';

interface Props {}

/**
 * @property appId Agora App ID
 * @property token Token for the channel;
 * @property isHost Boolean value to select between broadcaster and audience
 * @property channelName Channel Name for the current session
 * @property joinSucceed State variable for storing success
 * @property rtcUid local user's UID on joining the RTC channel
 * @property peerIds Array for storing connected peers
 * @property myUsername local user's name to login to RTM
 * @property Array to store usernames mapped to RTC UIDs
 */

interface State {
  appId: string;
  token: string | null;
  isHost: boolean;
  channelName: string;
  joinSucceed: boolean;
  rtcUid: number;
  peerIds: number[];
  myUsername: string;
  usernames: {[uid: string]: string};
  userAccount: string;
  localUserData: object[];
  enableLocalAudio: boolean;
}

export default class Voice extends Component<null, State> {
  _rtcEngine?: RtcEngine;
  _rtmEngine?: RtmEngine;

  constructor(props) {
    super(props);
    this.state = {
      appId: '7503580ffd094fb4b609f7788083ef04',
      token:
        '007eJxTYFjmMm/eoamztM24zkU8d11/OI73q5vpQbEau5lW3lNf3v+twGBuamBsamGQlpZiYGmSlmSSZGZgmWZubmFhYGGcmmZgMmeRc7LMF5fkurUPGBihEMTnZQgoys9KTS5RcEzPL0pkYAAAx14k/A==',
      isHost: true,
      channelName: 'Project Agora',
      joinSucceed: false,
      rtcUid: parseInt((new Date().getTime() + '').slice(4, 13), 10),
      peerIds: [],
      myUsername: '',
      usernames: {},
      userAccount: '',
      localUserData: [],
      enableLocalAudio: false,
    };
    if (Platform.OS === 'android') {
      // Request required permissions from Android
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }
  }

  componentDidMount() {
    this.initRTC();
  }

  componentWillUnmount() {
    this._rtcEngine?.destroy();
  }

  /**
   * @name initRTC
   * @description Function to initialize the Rtc Engine, attach event listeners and actions
   */
  initRTC = async () => {
    const {appId, isHost} = this.state;
    this._rtcEngine = await RtcEngine.create(appId);
    // await this._rtcEngine.disableVideo();
    await this._rtcEngine.setChannelProfile(ChannelProfile.LiveBroadcasting);

    await this._rtcEngine.setClientRole(
      isHost ? ClientRole.Broadcaster : ClientRole.Audience,
    );

    this._rtcEngine.addListener('UserJoined', (uid, elapsed) => {
      console.log('11');

      console.log('UserJoined', uid, elapsed);
      // Get current peer IDs
      const {peerIds} = this.state;
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        this.setState({
          // Add peer ID to state array
          peerIds: [...peerIds, uid],
        });
      }
    });

    this._rtcEngine.addListener('UserOffline', (uid, reason) => {
      console.log('12');

      console.log('UserOffline', uid, reason);
      const {peerIds} = this.state;
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter(id => id !== uid),
      });
    });

    // If Local user joins RTC channel
    this._rtcEngine.addListener(
      'JoinChannelSuccess',
      (channel, uid, elapsed) => {
        console.log('13');
        console.log('JoinChannelSuccess', channel, uid, elapsed);
        var xx = {
          channel: channel,
          uid: uid,
          elapsed: elapsed,
        };
        this.setState({
          localUserData: [...this.state.localUserData, xx],
          joinSucceed: true,
          rtcUid: uid,
        });
      },
    );
  };

  /**
   * @name toggleRole
   * @description Function to toggle the roll between broadcaster and audience
   */
  toggleRole = async () => {
    console.log(this.state.isHost, '11111111');
    console.log(ClientRole.Audience, '11111111-----');
    console.log(ClientRole.Broadcaster, '-----11111111');

    this._rtcEngine?.setClientRole(
      !this.state.isHost ? ClientRole.Broadcaster : ClientRole.Audience,
    );
    this.setState(ps => {
      return {isHost: !ps.isHost};
    });
  };

  /**
   * @name startCall
   * @description Function to start the call
   */
  startCall = async () => {
    const {myUsername, token, channelName, rtcUid, userAccount} = this.state;
    if (myUsername) {
      // Join RTC Channel using null token and channel name
      try {
        await this._rtcEngine?.joinChannel(
          token,
          channelName,
          userAccount,
          rtcUid,
        );
        //  await this._rtcEngine?.joinChannelWithUserAccount(
        //    token,
        //    channelName,
        //    userAccount,
        //  )
      } catch (error) {
        console.log(error);
      }
    }
  };

  /**
   * @name endCall
   * @description Function to end the call
   */
  endCall = async () => {
    let {channelName, rtcUid} = this.state;
    await this._rtcEngine?.leaveChannel();
    await this._rtmEngine
      ?.sendMessageByChannelId(channelName, rtcUid + ':!leave')
      .catch(e => console.log(e));
    this.setState({peerIds: [], joinSucceed: false, usernames: {}});
    await this._rtmEngine?.logout().catch(e => console.log(e));
  };

  enableLocalAudio = () => {
    this._rtcEngine?.enableLocalAudio(true);
    this.setState({enableLocalAudio: true});
  };

  /**
   * Step 3-1-2 (Optional): disableLocalAudio
   */
  disableLocalAudio = () => {
    this._rtcEngine?.enableLocalAudio(false);
    this.setState({enableLocalAudio: false});
  };

  render() {
    const {
      joinSucceed,
      isHost,
      channelName,
      myUsername,
      peerIds,
      usernames,
      enableLocalAudio,
    } = this.state;
    return (
      <View style={styles.max}>
        <View style={styles.spacer}>
          <Text style={styles.roleText}>
            You're{' '}
            <Text style={styles.roleTextBold}>
              {isHost ? 'a broadcaster' : 'the audience'}
            </Text>
          </Text>
          <Text style={styles.roleText}>
            {joinSucceed
              ? "You're connected to " + channelName
              : "You're disconnected - start call"}
          </Text>
        </View>
        {this._renderUsers()}
        {joinSucceed ? (
          <></>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder={'Name'}
              onChangeText={t => {
                this.setState({myUsername: t});
              }}
              value={myUsername}
            />
            {!myUsername ? (
              <Text style={styles.errorText}>Name can't be blank</Text>
            ) : null}
          </>
        )}
        <View style={{flexDirection: 'column', height: 120}}>
          <View style={styles.buttonHolder}>
            <TouchableOpacity onPress={this.toggleRole} style={styles.button}>
              <Text style={styles.buttonText}> Toggle Role </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.startCall} style={styles.button}>
              <Text style={styles.buttonText}> Start Call </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.endCall} style={styles.button}>
              <Text style={styles.buttonText}> End Call </Text>
            </TouchableOpacity>
          </View>
          <View style={{height: 80}} />
          <AgoraButton
            buttonStyle={{backgroundColor: '#38373A', marginHorizontal: 25}}
            title={`${enableLocalAudio ? 'Disable' : 'Enable'} Microphone`}
            onPress={
              enableLocalAudio ? this.disableLocalAudio : this.enableLocalAudio
            }
          />
          <View style={{height: 5}} />
        </View>
      </View>
    );
  }

  _renderUsers = () => {
    const {joinSucceed, peerIds, isHost, usernames, myUsername, localUserData} =
      this.state;
    return joinSucceed ? (
      <View style={styles.fullView}>
        <Text style={{fontWeight: 'bold'}}>{localUserData[0].uid}</Text>
        <ScrollView>
          {peerIds.map((value, index) => {
            return <Text key={index}>{value}</Text>;
            // return <Text key={index}>{usernames[value + '']}</Text>;
          })}
        </ScrollView>
      </View>
    ) : null;
  };
}
