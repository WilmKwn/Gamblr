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

const BetDetail = ({ route }) => {
  const { item } = route.params;

  const { state, dispatch } = useGlobal();
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
  };
  const pressNo = () => {
    setDir('No');
  };


  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <Text style={styles.headerText}>{item.title}</Text>
      <Text style={styles.descriptionText}>{item.description}</Text>

      <View style={styles.optionsContainer}>
        <View style={styles.optionBox}>
          <Text style={styles.optionText}>Yes</Text>
          <Text style={styles.voteCount}>{item.rightNum}</Text>
          <Text style={styles.cashAmount}>{item.rightAmount}</Text>
        </View>
        <View style={styles.optionBox}>
          <Text style={styles.optionText}>No</Text>
          <Text style={styles.voteCount}>{item.leftNum}</Text>
          <Text style={styles.cashAmount}>{item.leftAmount}</Text>
        </View>
      </View>

      <Text style={styles.pickOptionText}>Pick Option</Text>

=======
      <Text style={styles.headerText}>{item.title.split('-')[0]}</Text>
      
>>>>>>> e80dd71e6d453be3cfb7065897e326a3a08dcff4
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
    justifyContent: 'flex-start', // Align content at the top
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10, // Reduce margin
  },
  descriptionText: {
    fontSize: 20, // Adjust font size
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionBox: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    flex: 0.48, // Adjust as needed
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  voteCount: {
    fontSize: 16,
    marginBottom: 5, // Separate vote count and cash amount
  },
  cashAmount: {
    fontSize: 16,
  },
  pickOptionText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10, // Reduce margin
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