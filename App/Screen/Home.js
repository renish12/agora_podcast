import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createPodcastChannel} from '../action';

export default function Home() {
  const navigation = useNavigation();
  const [channelName, setChannelName] = useState('');

  const joinLive = async () => {
    const formData = new FormData();
    const request = {
      post_id: 1088,
      podcast_name: `${channelName}`,
      podcast_date: '2022-09-26 09:54:55',
      record_status: 'is_on',
      live_status: 'is_live',
    };

    Object.keys(request).forEach(key => {
      formData.append(key, request[key]);
    });
console.log(formData);

    // var headers = {UserId: 1, Token: 'KegRh1XVTyD-bGgc25aICEVj70LrF0B1y'};
    // await fetch(
    //   'http://88.208.196.241/Development/api/version_2_0/create_podcast',
    //   {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'multipart/form-data',
    //       ...headers,
    //     },
    //     // body: formData,  //------------------- Request Data -------------------
    //   },
    // )
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     console.log(responseJson, '=');
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // navigation.navigate('Live', {type: 'join', channel: joinChannel});
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
    <HomeScreen
      createLive={createLive}
      joinChannel={channelName}
      setChannelName={setChannelName}
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

function HomeScreen({createLive, channelName, setChannelName, joinLive}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Livestream App</Text>
      <View style={styles.createContainer}>
        <TouchableOpacity style={styles.button} onPress={() => createLive()}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.joinContainer}>
        <TextInput
          value={channelName}
          onChangeText={setChannelName}
          placeholder="Enter Livestream Id"
          style={styles.joinChannelInput}
        />
        <TouchableOpacity
          onPress={() => joinLive()}
          // disabled={channelName === ''}
          style={[
            styles.button,
            {
              backgroundColor: channelName === '' ? '#555555' : '#78b0ff',
            },
          ]}>
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
