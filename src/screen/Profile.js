import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [user, setUser] = useState(null);

  const actionProfile = () => {
    AsyncStorage.getItem('token').then(value => {
      return fetch('https://dev-disambi.sandboxindonesia.id/api/auth/me/', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + value,
        },
      })
        .then(response => response.json())
        .then(json => {
          console.log('response', json);
          if (json?.response?.code == 200) {
            setUser(json?.data);
          } else if (json?.response?.code == 400) {
            Alert.alert(json?.message);
          }
        })
        .catch(error => {
          console.log(error.message);
        });
    });
  };

  useEffect(() => {
    actionProfile();
  }, []);
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <View>
        <Image
          source={{uri: user?.photo_url}}
          style={{
            borderWidth: 0.9,
            width: 100,
            height: 100,
            borderRadius: 100,
            margin: 20,
          }}
        />
      </View>
      <Text style={{fontWeight: '600', fontSize: 18}}>{user?.username}</Text>
      <Text style={{color: 'gray'}}>{user?.RoleName}</Text>
      <Text style={{marginTop: 20}}>
        {user?.tempat_lahir + ', ' + user?.tanggal_lahir}
      </Text>
      <Text>{user?.alamat}</Text>
    </View>
  );
};

export default Profile;
