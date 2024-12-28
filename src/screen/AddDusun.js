import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddDusun = ({navigation}) => {
  const [namaDusun, setNamaDusun] = useState('');

  const handlerAdd = () => {
    if (namaDusun != '') {
      AsyncStorage.getItem('token').then(value => {
        return fetch('https://dev-disambi.sandboxindonesia.id/api/dusun/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
          body: JSON.stringify({
            name: namaDusun,
          }),
        })
          .then(response => response.json())
          .then(json => {
            console.log('response', json);
            if (json?.response?.code >= 200 && json?.response?.code <= 299) {
              Alert.alert('Anda berhasil menambahkan dusun');
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
          placeholder="Masukkan nama dusun"
          placeholderTextColor={'gray'}
          style={{color: 'black'}}
          value={namaDusun}
          onChangeText={setNamaDusun}
        />
      </View>
      <TouchableOpacity onPress={handlerAdd}>
        <View
          style={{
            width: 310,
            height: 40,
            backgroundColor: 'teal',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontWeight: '600'}}>Add</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AddDusun;
