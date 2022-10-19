import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createPodcastChannel} from '../action';
// import io from 'socket.io-client';

var io = require('socket.io-client/dist/socket.io');
// const socket = io();
// const socket = io(ENDPOINT, {
//   transports: ['websocket']
// });
export default function Home() {
  const navigation = useNavigation();
  const [channelName, setChannelName] = useState('');
  const [joinChannelName, setJoinChannelName] = useState('');

  useEffect(() => {
    // console.log(1);
    // // const socket = io("http://88.208.196.241:7001",{
    // //   maxHttpBufferSize: 100000000,
    // //   connectTimeout: 5000,
    // //   transports:['websocket','polling'],
    // //   pingInterval: 25 * 1000,
    // //   pingTimeout: 5000,
    // //   allowEIO3: true,
    // // })
    // // socket.on('connect', () => {
    // //   console.log(socket.connected); // true
    // // });
    // // const socket = io('http://88.208.196.241:7001');

    // const socket = io('http://192.168.5.112:3000');
    const socket = io('http://88.208.196.241:7001');
    // dispatch( updateSocket({socket}) );
    socket.on('received_message', asdf => {
      console.log('connected');
      console.log(asdf);
      setChannelName(asdf);
    });
    // socket.on('connect_error', err => {
    //   console.log(`------ connect_error due to ${err.message} -------`);
    // });
  }, []);

  const audioCaption = async () => {
    console.log(123);
    navigation.navigate('AudioCaption');
  };
  const joinChannel = async () => {
    navigation.navigate('Voice', {podCast_id: `${joinChannelName}`});
    console.log(123);
  };
  const createChannel = async () => {
    const formData = new FormData();
    const request = {
      post_id: 1088,
      podcast_name: `${channelName}`,
      podcast_date: '2022-09-26 09:54:55',
      record_status: 'is_on', //'is_on', 'is_off'
      live_status: 'is_live', //'is_live', 'is_schedule'
    };

    Object.keys(request).forEach(key => {
      formData.append(key, request[key]);
    });
    console.log(formData);

    var headers = {UserId: 42, Token: 'JgjMg6A5cAT-bGg0jiC1AA3JtQuEHEQ1I'};
    await fetch(
      'http://88.208.196.241/Development/api/version_2_0/create_podcast',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          ...headers,
        },
        body: formData, //------------------- Request Data -------------------
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        navigation.navigate('Voice', {
          podCast_id: responseJson.data.podcast_id,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const createLive = async () => {
    // console.log(uuid(), 'asasas');
    // setChannelName(prevState => {
    //   console.log(prevState, '+645');
    //   return '987';
    // });
    // navigation.navigate('PodcastScreen');
    navigation.navigate('Voice', {podCast_id: '19'});
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Livestream App</Text>
      <View style={styles.createContainer}>
        {/* <TouchableOpacity style={styles.button} onPress={() => createLive()}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity> */}
      </View>

      {/* <TouchableOpacity
        onPress={() => audioCaption()}
        style={{
          width: '100%',
          marginTop: 15,
          borderRadius: 8,
          paddingVertical: 10,
          alignItems: 'center',
          justifyContent: 'center',
            backgroundColor: '#555555',

        }}>
        <Text style={styles.buttonText}>Caption</Text>
      </TouchableOpacity> */}
      <View style={styles.joinContainer}>
        <TextInput
          value={channelName}
          onChangeText={setChannelName}
          placeholder="Enter Channel Name"
          style={styles.joinChannelInput}
        />
        <TouchableOpacity
          onPress={() => createChannel()}
          disabled={channelName === ''}
          style={{
            width: '100%',
            marginTop: 15,
            borderRadius: 8,
            paddingVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#555555',
            marginBottom: 10,
            // backgroundColor: channelName === '' ? '#555555' : '#78b0ff',
            opacity: channelName === '' ? 0.5 : 1,
          }}>
          <Text style={styles.buttonText}>Create Channel</Text>
        </TouchableOpacity>

        <TextInput
          value={joinChannelName}
          onChangeText={setJoinChannelName}
          placeholder="Enter Channel-Id"
          style={styles.joinChannelInput}
        />
        <TouchableOpacity
          onPress={() => joinChannel()}
          // disabled={channelName === ''}
          style={{
            width: '100%',
            marginTop: 15,
            borderRadius: 8,
            paddingVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#555555',
            opacity: joinChannelName === '' ? 0.5 : 1,
          }}>
          <Text style={styles.buttonText}>Join Channel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 50,
    color: '#333',
  },
  createContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    paddingTop: 50,
    borderTopWidth: 1,
    borderColor: '#22222255',
  },
  joinChannelInput: {
    backgroundColor: '#cccccc77',
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 20,
    fontSize: 17,
    // textAlign: 'center',
  },
  button: {
    width: '100%',
    marginTop: 15,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#78b0ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});
