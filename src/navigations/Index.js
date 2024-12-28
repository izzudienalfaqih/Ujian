import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Dashboard from '../screen/Dashboard';
import Profile from '../screen/Profile';
import AddDusun from '../screen/AddDusun';
import EditDusun from '../screen/EditDusun';
import {HeaderShownContext} from '@react-navigation/elements';
import Login from '../screen/Login';

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="AddDusun" component={AddDusun} />
        <Stack.Screen name="EditDusun" component={EditDusun} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
