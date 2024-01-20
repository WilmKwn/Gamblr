import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, TextInput, TouchableOpacity, Dimensions, Alert } from 'react-native';

import {SDK_VERSION, initializeApp} from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, setDoc, doc } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDtRpSuYg-E2fsKiQyrp2VlAy6Ahgc5zNc",
  authDomain: "gamblr-b2653.firebaseapp.com",
  projectId: "gamblr-b2653",
  storageBucket: "gamblr-b2653.appspot.com",
  messagingSenderId: "46861839",
  appId: "1:46861839:web:314a8c0d9dad6b211d9d7a",
  measurementId: "G-T7RM76C2QB"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = async() => {
    if (username !== "" && password !== "") {
        if (isLogin) {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                if (doc.id === username && doc.data().password === password) {
                    navigation.replace('BETS HOME');
                }
            });
            Alert.alert("WRONG username or password");
        } else {
            const querySnapshot = await getDocs(collection(db, "users"));
            let found = false;
            querySnapshot.forEach((doc) => {
                if (doc.id === username) {
                    Alert.alert("Username already exists");
                    found = true;
                }
            });
            if (!found) {
                const data = {
                    password: password,
                    balance: 20,
                    moneyLosses: 0,
                    moneyWins: 0,
                    numLosses: 0,
                    numWins: 0,
                    profilePic: null,
                    activeBets: [],
                };
                await setDoc(doc(db, "users", username), data);
                navigation.replace('BETS HOME');
            }
        }
    }
  }

  const toggleSwitch = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Signup'}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isLogin ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isLogin}
      />
      <TextInput
        value={username}
        onChangeText={(username) => setUsername(username)}
        placeholder={'Username'}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder={'Password'}
        secureTextEntry={true}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Signup'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Dimensions.get('window').height/3,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Login;