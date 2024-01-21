import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

import {initializeApp} from 'firebase/app';
import { getFirestore, updateDoc } from "firebase/firestore";
import { doc, getDoc, collection, getDocs } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDtRpSuYg-E2fsKiQyrp2VlAy6Ahgc5zNc",
  authDomain: "gamblr-b2653.firebaseapp.com",
  projectId: "gamblr-b2653",
  storageBucket: "gamblr-b2653.appspot.com",
  messagingSenderId: "46861839",
  appId: "1:46861839:web:314a8c0d9dad6b211d9d7a",
  measurementId: "G-T7RM76C2QB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const Profile = ({ navigation, usernameInput }) => {

  // Implement logic to cash out here using the value of `moneyAmount`.
  const docRef = doc(db, "users", usernameInput);
  getDoc(docRef).then((docSnap) => {

  const user = {
    name: docSnap.data().name,
    balance: docSnap.data().balance,
    // name: username,
    // balance: currentBalance,
  };

});

  const [moneyAmount, setMoneyAmount] = useState('');

  const handleAddMoney = () => {

    // Implement logic to cash out here using the value of `moneyAmount`.
    const docRef = doc(db, "users", usernameInput);

    // Assuming moneyAmount is a string input, parse it to a floating-point number
    const inputMoney = parseFloat(moneyAmount);

    getDoc(docRef).then((docSnap) => {

        if (isNaN(inputMoney)) {
            // Handle the case where moneyAmount is not a valid number
            console.log("Invalid moneyAmount input. Please enter a valid number.");
        } else {
            // console.log("moneyAmount is", moneyAmount);

                // Update the balance only if moneyAmount is a valid number and there are sufficient funds
                updateDoc(docRef, {
                    balance: docSnap.data().balance + inputMoney
                }).then(() => {
                    console.log("Balance updated successfully.");
                });
            
        }
    });

  };

  const handleCashOut = () => {
    // Implement logic to cash out here using the value of `moneyAmount`.
    const docRef = doc(db, "users", usernameInput);

    // Assuming moneyAmount is a string input, parse it to a floating-point number
    const inputMoney = parseFloat(moneyAmount);

    getDoc(docRef).then((docSnap) => {

        if (isNaN(inputMoney)) {
            // Handle the case where moneyAmount is not a valid number
            console.log("Invalid moneyAmount input. Please enter a valid number.");
        } else {
            // console.log("moneyAmount is", moneyAmount);

            if (docSnap.data().balance - inputMoney < 0) {
                // Handle insufficient funds
                console.log("Insufficient funds");
            } else {
                // Update the balance only if moneyAmount is a valid number and there are sufficient funds
                updateDoc(docRef, {
                    balance: docSnap.data().balance - inputMoney
                }).then(() => {
                    console.log("Balance updated successfully.");
                });
            }
        }
    });
  };

  const handleSignOut = () => {

    // Implement logic to sign out here.

    navigation.replace('LOGIN');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../images/profile_icon.png')}
        style={styles.profileImage}
      />
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.balanceText}>Balance: ${user.balance}</Text>
      <TextInput
        style={styles.input}
        value={moneyAmount}
        onChangeText={(text) => {
          setMoneyAmount(text);
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddMoney}>
          <Text style={styles.buttonText}>Add Money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cashOutButton} onPress={handleCashOut}>
          <Text style={styles.buttonText}>Cash Out</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 50,
    marginBottom: 20,
  },
  userName: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 32,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20, // Add margin here to create space between buttons and "Sign Out"
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  cashOutButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signOutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '80%',
  },
});

export default Profile;
