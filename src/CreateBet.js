import React, { useState } from 'react';
import { Switch, Text, View, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

import { initializeApp } from "firebase/app";
import { doc, setDoc, getFirestore, getDoc, updateDoc, getDocs, collection } from "firebase/firestore";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

function getCurrentFormattedDate() {
  const currentDate = new Date();

  const year = currentDate.getFullYear().toString().slice(-2); // Get the last 2 digits of the year (YY)
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month (01 - 12)
  const date = String(currentDate.getDate()).padStart(2, '0'); // Date (01 - 31)
  const hours = String(currentDate.getHours()).padStart(2, '0'); // Hours (00 - 23)
  const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // Minutes (00 - 59)

  return year + month + date + hours + minutes;
}

function confirmDate(month, date, year, hour, minute, amPm) {
  const currentDate = new Date();

  const Cyear = parseInt(currentDate.getFullYear().toString().slice(-2)); // Get the last 2 digits of the year (YY)
  const Cmonth = parseInt(String(currentDate.getMonth() + 1).padStart(2, '0')); // Month (01 - 12)
  const Cdate = parseInt(String(currentDate.getDate()).padStart(2, '0')); // Date (01 - 31)
  const Chours = parseInt(String(currentDate.getHours()).padStart(2, '0')); // Hours (00 - 23)
  const Cminutes = parseInt(String(currentDate.getMinutes()).padStart(2, '0')); // Minutes (00 - 59)

  if (parseInt(year) > Cyear) {
    return true;
  } else if (parseInt(year) === Cyear) {
    if (parseInt(month) > Cmonth) {
      return true;
    } else if (parseInt(month) === Cmonth) {
      if (parseInt(date) > Cdate) {
        return true;
      } else if (parseInt(date) === Cdate) {
        if (amPm === 'AM' && hour === '12') {
          // Special case for 12:00 AM (midnight)
          return true;
        } else if (amPm === 'PM' && hour !== '12') {
          // Special case for 12:00 PM (noon)
          return true;
        } else if (parseInt(hour) > Chours) {
          return true;
        } else if (parseInt(hour) === Chours) {
          if (parseInt(minute) > Cminutes) {
            console.log("returning true");
            return true;
          }
        }
      }
    }
  }
console.log("returning false");
  return false;
}


const CreateBet = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [moneyWager, setMoneyWager] = useState('');
  const [month, setMonth] = useState('');
  const [date, setDate] = useState('');
  const [year, setYear] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [amPm, setAmPm] = useState('AM'); // Default value is AM

  const [type, setType] = useState(false);

  const {state, dispatch} = useGlobal();
  const userNameInput = state.username;

  const handleButtonPress = () => {

    const docRef = doc(db, "users", userNameInput);
    
    var userBalance;
    getDoc(docRef).then((docSnap) => {

      // console.log("CHECKING userBalance:", docSnap.data().balance);

      userBalance = docSnap.data().balance;

    });

    // console.log('Button pressed!');
    // console.log('Title:', title);
    // console.log('Description:', description);
    // console.log('Money Wagering $:', moneyWager);
    // console.log('End Date:', `${month} ${date}, ${year} ${hour}:${minute} ${amPm}`);

    if (title === '' || description === '' || moneyWager === '' || month === '' ||
           date === '' || year === '' || hour === '' || minute === '') {

      Alert.alert("Please fill out all fields.");
      return;

    }

    if (isNaN(parseInt(moneyWager)) || parseInt(moneyWager) < 0) {
      Alert.alert("Please enter a valid number for money wagering.");
      return;
    }

    // console.log("userBalance:", userBalance);
    // console.log("moneyWager:", moneyWager);

    if (parseInt(moneyWager) > userBalance) {
      Alert.alert("You do not have enough money to make this bet.");
      return;
    }

      // doing 24 hour time
      if (amPm === 'PM') {
        var temp = parseInt(hour) + 12;
        setHour(String(temp));
      }

      // checking if date is valid
      if (!confirmDate(month, date, year, hour, minute, amPm)) {
        Alert.alert("Please enter a valid date.");
        return;
      }

      // creating variables
      const endDate = year + month + date + hour + minute;
      const betName = title + "-" + endDate;
      const currentDate = getCurrentFormattedDate();
      const moneyWagerInt = parseInt(moneyWager);

      // creating bet based on type
      if (type) {

        setDoc(doc(db, "bets", betName), {
          active: true,
          creator: userNameInput, // Make sure you define userNameInput
          description: description,
          endDate: endDate,
          startDate: currentDate,
          participants: [userNameInput],
          choices: [
            {cashVotes: 0, numVotes: 0},
            {cashVotes: moneyWagerInt, numVotes: 1}
          ]

        });

      } else {
        setDoc(doc(db, "bets", betName), {
          active: true,
          creator: userNameInput, // Make sure you define userNameInput
          description: description,
          endDate: endDate,
          startDate: currentDate,
          participants: [userNameInput],
          choices: [
            {cashVotes: moneyWagerInt, numVotes: 1},
            {cashVotes: 0, numVotes: 0}
          ]

        });
        getDocs(collection(db, 'users')).then((querySnapshot) => {
            querySnapshot.forEach((docc) => {
                if (docc.id === userNameInput) {
                    let currentBets = docc.data().activeBets;
    
                    let found = false;
                    let newArr = [];
                    currentBets.forEach((bet) => {
                        if (bet.title === betName) {
                            found = true;
                            newArr.push({title: bet.title, amount: bet.amount+moneyWagerInt, type: bet.type});
                        } else {
                            newArr.push(bet);
                        }
                    });
    
                    if (!found) {
                        currentBets.push({title: betName, amount: moneyWagerInt, type: type});
                    }
                    const d = {
                        ...docc.data(),
                        activeBets: found ? newArr : currentBets,
                        balance: docc.data().balance-moneyWagerInt,
                    };
                    setDoc(doc(db, "users", userNameInput), d).then(() => {
                        //console.log(currentBets);
                    });
                }
            });
        });
        navigateToDetail()
      }
  };

  const navigateToDetail = () => {
    navigation.navigate('BETS HOME');
    }

  const toggleSwitch = () => {
    setType((prev) => !prev);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Bet</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      {/* Replace "Stock Optional" with "Money Wagering" */}
      <Text style={styles.header}>Money Wagering</Text>
      <TextInput
        style={styles.input}
        placeholder="Money Wagering"
        value={moneyWager}
        onChangeText={(text) => setMoneyWager(text)}
      />
      {/* Bold "End Date" Text */}
      <Text style={styles.header}>End Date</Text>
      {/* Separate input boxes for Month, Date, Year */}
      <View style={styles.dateInputContainer}>
        <TextInput
          style={styles.dateInput}
          placeholder="Month"
          value={month}
          onChangeText={(text) => setMonth(text)}
        />
        <TextInput
          style={styles.dateInput}
          placeholder="Date"
          value={date}
          onChangeText={(text) => setDate(text)}
        />
        <TextInput
          style={styles.dateInput}
          placeholder="Year"
          value={year}
          onChangeText={(text) => setYear(text)}
        />
      </View>
      {/* Separate input boxes for Hour, Minute, and AM/PM */}
      <View style={styles.timeInputContainer}>
        <TextInput
          style={styles.timeInput}
          placeholder="Hour"
          value={hour}
          onChangeText={(text) => setHour(text)}
        />
        <TextInput
          style={styles.timeInput}
          placeholder="Minute"
          value={minute}
          onChangeText={(text) => setMinute(text)}
        />
        <TouchableOpacity
          style={styles.amPmButton}
          onPress={() => setAmPm(amPm === 'AM' ? 'PM' : 'AM')}
        >
          <Text style={styles.amPmText}>{amPm}</Text>
        </TouchableOpacity>
      </View>
      {/* End Date Input */}
      <View style={styles.toggleContainer} flexDirection="row">
        <Text style={styles.header}>{moneyWager === "" ? 'NO' : 'NO'}</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={type ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={type}
        />
        <Text style={styles.header}>{moneyWager === "" ? 'YES' : 'YES'}</Text>
      </View>
      <Button title="Submit" onPress={handleButtonPress} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '80%',
  },
  dateInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    width: '80%',
  },
  dateInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  timeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    width: '80%',
  },
  timeInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  amPmButton: {
    width: 50,
    height: 40,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  amPmText: {
    color: 'white',
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
});

export default CreateBet;
