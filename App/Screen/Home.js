import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';

export default function Home() {
  const navigation = useNavigation();
  const [joinChannel, setJoinChannel] = useState('');

  const joinLive = async () => {
    // console.log('asasas');
    navigation.navigate('Live', {type: 'join', channel: joinChannel});
  };

  const createLive = async () => {
    // console.log(uuid(), 'asasas');
    // setJoinChannel(prevState => {
    //   console.log(prevState, '+645');
    //   return '987';
    // });
    // navigation.navigate('PodcastScreen');
    navigation.navigate('Voice');
    // navigation.navigate('Live', {type: 'create', channel: 'Testing'});
    // navigation.navigate('Live', {type: 'create', channel: uuid()});
  };
  return (
    <HomeScreen
      createLive={createLive}
      joinChannel={joinChannel}
      setJoinChannel={setJoinChannel}
      joinLive={joinLive}
    />
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
    textAlign: 'center',
  },
  button: {
    width: '100%',
    marginTop: 15,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#78b0ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

function HomeScreen({createLive, joinChannel, setJoinChannel, joinLive}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Livestream App</Text>
      <View style={styles.createContainer}>
        <TouchableOpacity style={styles.button} onPress={() => createLive()}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.joinContainer}>
        <TextInput
          value={joinChannel}
          onChangeText={setJoinChannel}
          placeholder="Enter Livestream Id"
          style={styles.joinChannelInput}
        />
        <TouchableOpacity
          onPress={() => joinLive()}
          disabled={joinChannel === ''}
          style={[
            styles.button,
            {
              backgroundColor: joinChannel === '' ? '#555555' : '#78b0ff',
            },
          ]}>
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}
