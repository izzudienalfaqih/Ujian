import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const actionLogin = () => {
    return fetch('https://dev-disambi.sandboxindonesia.id/api/auth/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(json => {
        console.log(json?.response?.code);
        if (json?.response?.code == 200) {
          AsyncStorage.setItem('token', json?.data?.access_token);
          navigation.navigate('Dashboard');
        } else if (json?.response?.code == 400) {
          Alert.alert(json?.message);
        }
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <View
        style={{
          width: '85%',
          height: 40,
          borderWidth: 0.5,
          borderRadius: 10,
          margin: 10,
        }}>
        <TextInput
          placeholder="Masukkan username"
          placeholderTextColor={'gray'}
          style={{color: 'black'}}
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View
        style={{
          width: '85%',
          height: 40,
          borderWidth: 0.5,
          borderRadius: 10,
          margin: 10,
        }}>
        <TextInput
          placeholder="Masukkan password"
          placeholderTextColor={'gray'}
          style={{color: 'black'}}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity onPress={actionLogin}>
        <View
          style={{
            width: 310,
            height: 40,
            backgroundColor: 'teal',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontWeight: '600'}}>Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
