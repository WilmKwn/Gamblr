import React from 'react';
import { AsyncStorage, View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import BetsHome from "./src/BetsHome";
import BetDetail from './src/BetDetail';
import Profile from './src/Profile';
import Login from "./src/Login";
import CreateBet from "./src/CreateBet";

import {initializeApp} from 'firebase/app';

// const firebaseConfig = {
//   apiKey: "AIzaSyDtRpSuYg-E2fsKiQyrp2VlAy6Ahgc5zNc",
//   authDomain: "gamblr-b2653.firebaseapp.com",
//   projectId: "gamblr-b2653",
//   storageBucket: "gamblr-b2653.appspot.com",
//   messagingSenderId: "46861839",
//   appId: "1:46861839:web:314a8c0d9dad6b211d9d7a",
//   measurementId: "G-T7RM76C2QB"
// };
// const app = initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BetsHomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="STOCK BETS">
        {() => <BetsHome data="Data for Tab 1" />}
      </Tab.Screen>
      <Tab.Screen name="CUSTOM BETS">
        {() => <BetsHome data="Data for Tab 2" />}
      </Tab.Screen>
      <Tab.Screen name="MY BETS">
        {() => <BetsHome data="Data for Tab 2" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="LOGIN">
      <Stack.Screen name="LOGIN" component={Login} />
      <Stack.Screen name="BETS HOME" component={BetsHomeTabs} />
      <Stack.Screen name="BET DETAIL" component={BetDetail} />
      <Stack.Screen name="PROFILE" component={Profile} />
      <Stack.Screen name="CREATE" component={CreateBet} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}