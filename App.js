import React from 'react';
import { View, Text, StyleSheet, LogBox } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import BetsHome from "./src/BetsHome";
import BetDetail from './src/BetDetail';
import Profile from './src/Profile';
import Login from "./src/Login";
import CreateBet from "./src/CreateBet";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="LOGIN">
      <Tab.Screen name="BETS HOME" component={BetsHome} />
      <Stack.Screen name="LOGIN" component={Login} />
      <Stack.Screen name="BET DETAIL" component={BetDetail} />
      <Stack.Screen name="PROFILE" component={Profile} />
      <Stack.Screen name="CREATE" component={CreateBet} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}