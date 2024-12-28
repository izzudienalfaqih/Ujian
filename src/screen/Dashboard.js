import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = ({navigation}) => {
  const [dataDusun, setDataDusun] = useState([]);

  const actionDusun = () => {
    AsyncStorage.getItem('token').then(value => {
      return fetch('https://dev-disambi.sandboxindonesia.id/api/dusun/', {
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
            setDataDusun(json?.data);
          } else if (json?.response?.code == 400) {
            Alert.alert(json?.message);
          }
        })
        .catch(error => {
          console.log(error.message);
        });
    });
  };

  const deleteDusun = id => {
    AsyncStorage.getItem('token').then(value => {
      return fetch(`https://dev-disambi.sandboxindonesia.id/api/dusun/${id}/`, {
        method: 'DELETE',
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
            Alert.alert('Anda telah berhasil menghapus');
            actionDusun();
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
    actionDusun();
    deleteDusun();
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <View
          style={{
            width: 310,
            height: 40,
            backgroundColor: 'teal',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 15,
          }}>
          <Text style={{color: 'white', fontWeight: '600'}}>Profile</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AddDusun')}>
        <View
          style={{
            width: 310,
            height: 40,
            backgroundColor: 'teal',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5,
          }}>
          <Text style={{color: 'white', fontWeight: '600'}}>Add Dusun</Text>
        </View>
      </TouchableOpacity>
      {dataDusun.map((value, key) => {
        return (
          <TouchableOpacity
            key={key}
            onPress={() => navigation.navigate('EditDusun', {item: value})}>
            <View
              style={{
                width: 310,
                height: 40,
                backgroundColor: 'white',
                borderRadius: 10,
                justifyContent: 'space-between',
                margin: 5,
                flexDirection: 'row',
                padding: 10,
              }}>
              <Text>{value?.name}</Text>
              <Text
                style={{fontSize: 19, fontWeight: '700', color: 'red'}}
                onPress={() => deleteDusun(value?.id)}>
                x
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Dashboard;
