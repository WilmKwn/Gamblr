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

import { GlobalProvider } from './src/Globals';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BetsHomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="STOCK BETS">
        {() => <BetsHome route={{ params: { data: 'stock' } }} />}
      </Tab.Screen>
      <Tab.Screen name="CUSTOM BETS">
        {() => <BetsHome route={{ params: { data: 'custom' } }} />}
      </Tab.Screen>
      <Tab.Screen name="MY BETS">
        {() => <BetsHome route={{ params: { data: 'mine' } }} />}
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
    <GlobalProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </GlobalProvider>
  )
}