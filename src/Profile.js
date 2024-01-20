import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

import {initializeApp} from 'firebase/app';
import { getFirestore } from "firebase/firestore";
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

const Profile = ({ navigation }) => {

  // const userDocRef = firestore().collection('users').doc(username);
  // var currentBalance;

  //  // Get the current user data and update the balance
  //  userDocRef
  //  .get()
  //  .then((docSnapshot) => {
  //    if (docSnapshot.exists) {
  //      const userData = docSnapshot.data();
  //      currentBalance = userData.balance || 0; // Default to 0 if balance doesn't exist
       
  //    } else {
  //      console.log('User document does not exist');
  //    }
  //  })
  //  .catch((error) => {
  //    console.error('Error fetching user document: ', error);
  //  });

  // update replacign user informatoin
  const user = {
    name: "John Doe",
    balance: 500
    // name: username,
    // balance: currentBalance,
  };

  const [moneyAmount, setMoneyAmount] = useState('(Money Amount)');

  const handleAddMoney = () => {
    // Implement logic to add money here using the value of `moneyAmount`.

  //   // Reference to the Firestore collection ("users") and document by user ID
  // const userDocRef = firestore().collection('users').doc(username);

  // // Get the current user data and update the balance
  // userDocRef
  //   .get()
  //   .then((docSnapshot) => {
  //     if (docSnapshot.exists) {
  //       const userData = docSnapshot.data();
  //       const currentBalance = userData.balance || 0; // Default to 0 if balance doesn't exist

  //       // Parse moneyAmount to a number (assuming it's a string)
  //       const moneyToAdd = parseFloat(moneyAmount);

  //       if (!isNaN(moneyToAdd)) {
  //         const newBalance = currentBalance + moneyToAdd;

  //         // Update the user's balance in Firestore
  //         userDocRef
  //           .update({
  //             balance: newBalance,
  //           })
  //           .then(() => {
  //             console.log('Balance updated successfully');

  //             // Optionally, you can update the local state to reflect the change
  //             // setUser({ ...user, balance: newBalance });

  //           })
  //           .catch((error) => {
  //             console.error('Error updating balance: ', error);
  //           });
  //       } else {
  //         console.error('Invalid moneyAmount format');
  //       }
  //     } else {
  //       console.log('User document does not exist');
  //     }
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching user document: ', error);
  //   });


  };

   const handleCashOut = async () => {
    // Implement logic to cash out here using the value of `moneyAmount`.

    //  const querySnapshot = await getDocs(collection(db, "users"));

    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`);
    //   console.log(doc.data().balance);
    // });

    const docRef = doc(db, "users", "username");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("balance is ", docSnap.data().balance);

    }

     // grabbing the pre info
    //  const docRef = doc(db, "users", "username");
    //  const docSnap = await getDoc(docRef);
    //  console.log("balance before ", docSnap.data());

     // doing the change into database
     // await updateDoc(docRef, {
     //   balance: docSnap.data().balance - moneyAmount
     // });

     // // printing change
     // docRef = doc(db, "users", "username");
     // docSnap = await getDoc(docRef);
     // onsole.log("balance now ", docSnap.data().balance);

    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`);
    // });

  //   // Reference to the Firestore collection ("users") and document by user ID
  // const userDocRef = firestore().collection('users').doc("username");

  // // Get the current user data and update the balance
  // userDocRef
  //   .get()
  //   .then((docSnapshot) => {
  //     if (docSnapshot.exists) {
  //       const userData = docSnapshot.data();
  //       const currentBalance = userData.balance || 0; // Default to 0 if balance doesn't exist

  //       // Parse moneyAmount to a number (assuming it's a string)
  //       const moneyToAdd = parseFloat(moneyAmount);

  //       // checking for valid input
  //       if (!isNaN(moneyToAdd)) {
  //         const newBalance = currentBalance - moneyToAdd;

  //         // checking for insufficient funds
  //         if (newBalance < 0) {
  //           console.error('Insufficient funds');
  //           return;
  //         }

  //         // Update the user's balance in Firestore
  //         userDocRef
  //           .update({
  //             balance: newBalance,
  //           })
  //           .then(() => {
  //             console.log('Balance updated successfully');
              
  //             // Optionally, you can update the local state to reflect the change
  //             // setUser({ ...user, balance: newBalance });

  //           })
  //           .catch((error) => {
  //             console.error('Error updating balance: ', error);
  //           });
  //       } else {
  //         console.error('Invalid moneyAmount format');
  //       }
  //     } else {
  //       console.log('User document does not exist');
  //     }
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching user document: ', error);
  //   });

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
        onChangeText={(text) => setMoneyAmount(text)}
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
