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
        querySnapshot.forEach((doc) => {
            if (doc.id === item.title) {
                let index = (dir === 'Yes') ? 1 : 0;
                let choicesArr = doc.data().choices;
                choicesArr[index].numVotes += 1;
                choicesArr[index].cashVotes += amount;

                let arr = doc.data().participants;
                arr.push(username);
                const d = {
                    ...doc.data(),
                    choices: choicesArr,
                    participants: arr,
                };
                setDoc(doc(db, "users", username), data).then(() => {
                    console.log(arr);
                });
                return;
            }
        });
    })
  };

  React.useEffect(() => {
    const q = query(collection(db, 'bets'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const arr = [];
        snapshot.forEach((doc) => {
            const temp = doc.data();
            const d = {

            }
            arr.push(d);
        });
    });
    return () => unsubscribe();
  }, []);

  const pressYes = () => {
    setDir('Yes');
  };
  const pressNo = () => {
    setDir('No');
  };


  return (
    <View style={styles.container}>
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