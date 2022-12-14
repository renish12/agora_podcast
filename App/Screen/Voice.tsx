import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RtcEngine, { ClientRole, ChannelProfile } from 'react-native-agora';
import requestCameraAndAudioPermission from '../components/Permission';
import styles from '../components/Style';
import { AgoraButton } from '../components/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import config from '../config/agora.config';
import RNFS from 'react-native-fs';

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
  hostName: string;
  token: string | null;
  isHost: boolean;
  channelName: string;
  joinSucceed: boolean;
  rtcUid: number;
  peerIds: number[];
  myUsername: string;
  usernames: { [uid: string]: string };
  userAccount: string;
  localUserData: object[];
  userData: object[];
  enableLocalAudio: boolean;
  storagePath: string;
  maxDurationMs: number;
  startRecoding: boolean;
  openMicrophone: boolean;
}

export default class Voice extends Component<null, State> {
  _rtcEngine?: RtcEngine;

  constructor({ props, route }) {
    super(props);
    this.state = {
      appId: config.appId,
      hostName: '',
      token: config.token,
      isHost: true,
      channelName: 'Agora 19102022',
      joinSucceed: false,
      rtcUid: parseInt((new Date().getTime() + '').slice(4, 13), 10),
      peerIds: [],
      myUsername: '',
      usernames: {},
      userAccount: 'fhnkldfj',
      localUserData: [],
      userData: [],
      enableLocalAudio: false,
      storagePath: `${Platform.OS === 'android'
        ? RNFS.ExternalDirectoryPath
        : RNFS.DocumentDirectoryPath
        }`,
      maxDurationMs: 1200000000000000,
      startRecoding: false,
      openMicrophone: true,
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
    // this.getPodcastDetails();
  }

  componentWillUnmount() {
    this._rtcEngine?.destroy();
  }

  // getPodcastDetails = async () => {
  //   const formData = new FormData();
  //   const request = {
  //     podcast_id: this.props.route.params.podCast_id,
  //   };
  //   Object.keys(request).forEach(key => {
  //     formData.append(key, request[key]);
  //   });
  //   console.log(formData, '1234567*89');
  //   var headers = {UserId: 42, Token: 'JgjMg6A5cAT-bGg0jiC1AA3JtQuEHEQ1I'};
  //   await fetch(
  //     'http://88.208.196.241/Development/api/version_2_0/podcast_details',
  //     {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'multipart/form-data',
  //         ...headers,
  //       },
  //       body: formData, //------------------- Req Data -------------------
  //     },
  //   )
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       this.setState({
  //         token:
  //           '00640c99dc510124badbaff653ccc5dd555IAAt5tndZ/uxz4DdWR6rOMlG5kC77Ipxnr6GauoqmsJSCVkCkNaIsCQyIgAyhQAAQodPYwQAAQDSQ05jAwDSQ05jAgDSQ05jBADSQ05j',
  //         channelName: 'N30M0BTC',
  //         // token: responseJson.data.ChannelToken,
  //         // channelName: responseJson.data.podcast_name,
  //         // hostName: responseJson.data.podcast_user_name,
  //       });
  //       console.log(responseJson.data, 'API Response');
  //       this.initRTC();
  //     })
  //     .catch(error => {
  //       console.log(error, '===');
  //     });
  //   this.setState({
  //     // token: this.props.route.params.type
  //   });
  // };

  /**
   * @name initRTC
   * @description Function to initialize the Rtc Engine, attach event listeners and actions
   */
  initRTC = async () => {
    const { appId, isHost } = this.state;
    this._rtcEngine = await RtcEngine.create(appId);
    await this._rtcEngine.setChannelProfile(ChannelProfile.LiveBroadcasting);
    await this._rtcEngine.setClientRole(
      isHost ? ClientRole.Broadcaster : ClientRole.Audience,
    );

    // If remot user joins RTC channel(Other user)
    this._rtcEngine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined-----------------------------------', uid, elapsed);
      // Get current peer IDs
      const { peerIds } = this.state;
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        this._rtcEngine?.getUserInfoByUid(uid).then(userInfo => {
          this.setState({
            userData: [...this.state.userData, userInfo],
          });
        });

        this.setState({
          // Add peer ID to state array
          peerIds: [...peerIds, uid],
        });
      }
    });

    // If user leave RTC channel
    this._rtcEngine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      const { peerIds, userData } = this.state;
      this._rtcEngine?.getUserInfoByUid(uid).then(userInfo => {
        this.setState({
          userData: userData.filter(userInfo => userInfo !== userInfo),
        });
      });
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter(id => id !== uid),
        // userData: userData.filter(id => id !== uid),
      });
    });

    // If Local user joins RTC channel(Local user means self-user)
    this._rtcEngine.addListener(
      'JoinChannelSuccess',
      (channel, uid, elapsed) => {
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

    this._rtcEngine.addListener('Error', errorCode => {
      console.log(errorCode, '---ERROR CODE---');
    });
  };

  /**
   * @name toggleRole
   * @description Function to toggle the roll between broadcaster and audience
   */
  __ToggleRole = async () => {
    this._rtcEngine?.setClientRole(
      !this.state.isHost ? ClientRole.Broadcaster : ClientRole.Audience,
    );
    this.setState(ps => {
      return { isHost: !ps.isHost };
    });
  };

  /**
   * @name startCall
   * @description Function to start the call
   */
  __StartCall = async (userType: string) => {
    const { myUsername, appId, token, channelName, rtcUid } = this.state;
    if (myUsername) {
      // Join RTC Channel using null token and channel name
      this.setState({
        userData: [],
      });
      try {
        var userNameDetailss =
          'https:##source.unsplash.com#random#500x500?sig=99';
        var userDetails = `myUsername:${myUsername},userRole:${userType},image:${userNameDetailss}`;

        // await this._rtcEngine
        //   ?.registerLocalUserAccount('53820971c19048ff9f9cd0ba9e5cf83a', userDetails)
        //   .then(result => {});

        if (Platform.OS === "android") {
          await this._rtcEngine?.joinChannel(
            token,
            channelName,
            null,
            46
          );
        } else {
          await this._rtcEngine?.joinChannel(
            token,
            channelName,
            null,
            42
          );
        }
        // For Local Static Data of the Agora console
        // await this._rtcEngine?.joinChannelWithUserAccount(
        //    token,
        //    channelName,
        //    userDetails,
        // );
      } catch (error) {
        console.log(error, 'REGISTER-LOCAL-USER-ACCOUNT');
      }
    }
  };

  /**
   * @name endCall
   * @description Function to end the call
   */
  __EndCall = async () => {
    await this._rtcEngine?.leaveChannel();
    this.setState({
      userData: [],
      peerIds: [],
      joinSucceed: false,
      usernames: {},
    });
    await this._rtcEngine?.stopAudioRecording();
    this.setState({ startRecoding: false });
  };

  __StartRecording = async () => {
    const { rtcUid, storagePath } = this.state;
    this.setState({ startRecoding: true });
    try {
      this._rtcEngine
        ?.startAudioRecordingWithConfig({
          filePath: `${storagePath}/${rtcUid}.mp3`,
          recordingQuality: 2,
          recordingPosition: 0,
          recordingSampleRate: 32000,
          recordingChannel: 2,
        })
        .then(result => {
          console.log(result, 'START-AUDIO-RECORDING-WITH-CONFIG');
        });
      console.log(`${storagePath}/${rtcUid}.mp3`, 'AUDIO-FILE-PATH');
    } catch (error) {
      console.log(error);
    }
  };

  __StopRecording = async () => {
    try {
      await this._rtcEngine?.stopAudioRecording().then(result => { });
    } catch (error) {
      console.log(error);
    }
    this.setState({ startRecoding: false });
  };

  __SwitchMicrophone = () => {
    const { openMicrophone } = this.state;
    this._rtcEngine
      ?.enableLocalAudio(!openMicrophone)
      .then(() => {
        this.setState({ openMicrophone: !openMicrophone });
      })
      .catch(err => {
        console.log('enableLocalAudio', err);
      });
  };

  _onChangePlaybackVolume = (value: number) => {
    this._rtcEngine?.adjustPlaybackSignalVolume(value * 400);
  };

  _renderUsers = () => {
    const { joinSucceed, myUsername, userData } = this.state;
    return joinSucceed ? (
      <View style={styles.fullView}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 22,
            alignSelf: 'center',
          }}>
          Connected User-Id
        </Text>
        <View
          style={{
            height: 5,
            backgroundColor: '#000000',
            marginHorizontal: 15,
            borderRadius: 5,
          }}
        />
        <View
          style={{
            height: 30,
            width: '90%',
            backgroundColor: '#028FCE',
            marginHorizontal: 20,
            marginTop: 5,
            justifyContent: 'center',
            borderRadius: 25,
          }}>
          <Text
            style={{ fontWeight: 'bold', textAlign: 'center', color: '#ffffff' }}>
            {myUsername}
          </Text>
        </View>
        <ScrollView>
          {userData.map((value, index) => {
            if (value?.userAccount != null || value?.userAccount != undefined) {
              var xxx = value?.userAccount.split(/[,\:_]/);
              var x = `${xxx[5]}:${xxx[6]}`;
            }
            return (
              <View
                key={index.toString()}
                style={{
                  height: 30,
                  width: '90%',
                  backgroundColor: 'gray',
                  marginHorizontal: 20,
                  marginTop: 5,
                  justifyContent: 'center',
                  borderRadius: 25,
                }}>
                <Text key={index} style={{ textAlign: 'center' }}>
                  {value?.userAccount != null ? `${xxx[1]} ${xxx[3]}` : 'Guest'}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    ) : null;
  };

  render() {
    const {
      joinSucceed,
      channelName,
      myUsername,
      startRecoding,
      openMicrophone,
    } = this.state;
    return (
      <View style={styles.max}>
        <SafeAreaView style={{ marginBottom: 0 }} />
        <View style={styles.spacer}>
          <Text style={styles.roleText}>
            {this.state.hostName + ' '}
            <Text style={styles.roleTextBold}>is Host of the channel</Text>
          </Text>
          <Text style={styles.roleText}>
            {joinSucceed
              ? "You're connected to " + channelName
              : "You're disconnected - Join call"}
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
                this.setState({ myUsername: t });
              }}
              value={myUsername}
            />
            {!myUsername ? (
              <Text style={styles.errorText}>Name can't be blank</Text>
            ) : null}
          </>
        )}
        <View style={{ flexDirection: 'column', height: 120, marginTop: 20 }}>
          <View style={styles.buttonHolder}>
            <TouchableOpacity onPress={this.__EndCall} style={styles.button}>
              <Text style={styles.buttonText}> End Call </Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 20 }} />
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 25,
              justifyContent: 'space-between',
            }}>
            <AgoraButton
              buttonStyle={{ backgroundColor: '#38373A', paddingHorizontal: 32 }}
              title={`Join As a Host`}
              onPress={() => this.__StartCall('Host')}
            />
            <AgoraButton
              buttonStyle={{ backgroundColor: '#38373A', paddingHorizontal: 22 }}
              title={`Join As a Listener`}
              onPress={() => this.__StartCall('Listener')}
            />
          </View>
          <View style={{ height: 5 }} />
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 25,
              justifyContent: 'space-between',
            }}>
            <AgoraButton
              buttonStyle={{ backgroundColor: '#38373A', paddingHorizontal: 30 }}
              title={`Microphone ${openMicrophone ? 'on' : 'off'}`}
              onPress={this.__SwitchMicrophone}
            />
            <AgoraButton
              buttonStyle={{ backgroundColor: '#38373A', paddingHorizontal: 30 }}
              title={`${startRecoding ? 'Stop' : 'Start'} Recording`}
              onPress={
                startRecoding ? this.__StopRecording : this.__StartRecording
              }
            />
          </View>
          <View style={{ height: 5 }} />
        </View>
      </View>
    );
  }
}
.