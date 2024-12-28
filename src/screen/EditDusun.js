import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditDusun = ({navigation, route}) => {
  const item = route?.params?.item;
  const [namaDusun, setNamaDusun] = useState(item?.name);

  const handlerEdit = () => {
    if (namaDusun != '') {
      AsyncStorage.getItem('token').then(value => {
        return fetch(
          `https://dev-disambi.sandboxindonesia.id/api/dusun/${item?.id}/`,
          {
            method: 'PATCH',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + value,
            },
            body: JSON.stringify({
              name: namaDusun,
            }),
          },
        )
          .then(response => response.json())
          .then(json => {
            console.log('response', json);
            if (json?.response?.code >= 200 && json?.response?.code <= 299) {
              Alert.alert('Anda berhasil mengubah dusun');
              navigation.navigate('Dashboard');
            } else if (json?.response?.code >= 400) {
              Alert.alert(json?.message);
            }
          })
          .catch(error => {
            console.log(error.message);
          });
      });
    } else {
      Alert.alert('Anda belum memasukkan nama');
    }
  };

  return (
    <View style={{alignItems: 'center'}}>
      <View
        style={{
          width: '85%',
          height: 40,
          borderWidth: 0.5,
          borderRadius: 10,
          margin: 20,
          marginTop: 30,
        }}>
        <TextInput
          placeholder="Masukkan nama dusun yang baru"
          placeholderTextColor={'gray'}
          style={{color: 'black'}}
          value={namaDusun}
          onChangeText={setNamaDusun}
        />
      </View>
      <TouchableOpacity onPress={handlerEdit}>
        <View
          style={{
            width: 310,
            height: 40,
            backgroundColor: 'teal',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontWeight: '600'}}>Edit</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EditDusun;
