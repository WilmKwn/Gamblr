import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { initializeApp} from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, setDoc, doc, onSnapshot, query } from "firebase/firestore";

import { useGlobal } from './Globals';

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

const BetDetail = ({route}) => {
    const { item } = route.params;

    const {state, dispatch} = useGlobal();
    const username = state.username;

  const [amount, setAmount] = useState('');

  const [dir, setDir] = useState('');

  const handleButtonPress = () => {
    getDocs(collection(db, 'bets')).then((querySnapshot) => {
        querySnapshot.forEach((docc) => {
            if (docc.id === item.title) {
                let index = (dir === 'Yes') ? 1 : 0;
                let choicesArr = docc.data().choices;
                choicesArr[index].numVotes += 1;
                choicesArr[index].cashVotes += parseInt(amount);

                let arr = docc.data().participants;
                if (!arr.includes(username)) {
                    arr.push(username);
                }
                const d = {
                    ...docc.data(),
                    choices: choicesArr,
                    participants: arr,
                };
                setDoc(doc(db, "bets", item.title), d).then(() => {
                    console.log(arr);
                });
            }
        });
    })
    getDocs(collection(db, 'users')).then((querySnapshot) => {
        querySnapshot.forEach((docc) => {
            if (docc.id === username) {
                let currentBets = docc.data().activeBets;
                currentBets.push({title: item.title, amount: amount, type: (dir==='Yes')});
                const d = {
                    ...docc.data(),
                    activeBets: currentBets,
                };
                setDoc(doc(db, "users", username), d).then(() => {
                    console.log(currentBets);
                });
            }
        });
    })
  };

  const pressYes = () => {
    setDir('Yes');
  }
  const pressNo = () => {
    setDir('No');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{item.title.split('-')[0]}</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={pressYes} style={styles.button}>
          <Text>{'YES'}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={pressNo} style={styles.button}>
          <Text>{'NO'}</Text>
        </TouchableOpacity>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />
      
      <TouchableOpacity style={styles.mainButton} onPress={handleButtonPress}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    flex: 0.48, // Adjust as needed
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  mainButton: {
    backgroundColor: 'blue',
    padding: 15,
    alignItems: 'center',
  },
});

export default BetDetail;