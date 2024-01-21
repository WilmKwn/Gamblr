import React, { useEffect, useState } from 'react';
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

  const [whoWon, setWhoWon] = useState(false);

  const [check, setCheck] = useState([false, false]);

  useEffect(() => {
    getDocs(collection(db, 'bets')).then((querySnapshot) => {
        querySnapshot.forEach((docc) => {
            if (docc.id === item.title) {
                setCheck([username===docc.data().creator, !docc.data().active]);
            }
        });
    });
  }, []);

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
    });

    ggetDocs(collection(db, 'users')).then((querySnapshot) => {
      querySnapshot.forEach((docc) => {
          if (docc.id === username) {
              let currentBets = docc.data().activeBets;
              
              // Find the index of the existing bet (if it exists) in the array
              const existingBetIndex = currentBets.findIndex(bet => bet.title === item.title);
  
              if (existingBetIndex !== -1) {
                  // Modify the existing bet's details
                  currentBets[existingBetIndex] = {
                      title: item.title,
                      amount: amount,
                      type: (dir === 'Yes'),
                  };
              } else {
                  // If the bet doesn't exist, push a new one
                  currentBets.push({
                      title: item.title,
                      amount: amount,
                      type: (dir === 'Yes'),
                  });
              }
  
              const d = {
                  ...docc.data(),
                  activeBets: currentBets,
              };
  
              setDoc(doc(db, "users", username), d).then(() => {
                  console.log(currentBets);
              });
          }
      });
  });
  
    getDocs(collection(db, 'users')).then((querySnapshot) => {
        querySnapshot.forEach((docc) => {
            if (docc.id === username) {
                let currentBets = docc.data().activeBets;
                currentBets.push({title: item.title, amount: amount, type: (dir==='Yes')});
                const d = {
                    ...docc.data(),
                    activeBets: currentBets,
                    balance: docc.data().balance-amount,
                };
                setDoc(doc(db, "users", username), d).then(() => {
                    console.log(currentBets);
                });
            }
        });
    });
  };

  const pressYes = () => {
    setDir('Yes');
  };
  const pressNo = () => {
    setDir('No');
  };

  const pressWhoYes = () => {
    setWhoWon(true);
  }
  const pressWhoNo = () => {
    setWhoWon(false);
  }
  const pressFinalize = () => {
    getDocs(collection(db, 'bets')).then((querySnapshot) => {
        querySnapshot.forEach((docc) => {
            if (docc.id === item.title) {
                let leftAmount = docc.data().choices[0].cashAmount;
                let rightAmount = docc.data().choices[1].cashAmount;
                let total = leftAmount + rightAmount;

                let participants = docc.data().participants;

                participants.forEach((p) => {

                    getDocs(collection(db, 'users')).then((querySnapshot) => {
                        querySnapshot.forEach((docc) => {
                            if (docc.id === p) {
                                let myBets = docc.data().activeBets;
                                myBets.forEach((bet) => {
                                    console.log(bet.title, " ", item.title);
                                    if (bet.title === item.title) {
                                        let myAmount = bet.amount;
                                        let type = bet.type;

                                        let weight = 0;
                                        if (type) {
                                            // yes
                                            weight = myAmount / rightAmount;
                                        } else {
                                            // no
                                            weight = myAmount / leftAmount;
                                        }

                                        let newBalance = docc.data().balance + (weight*total);
                                        if (type !== whoWon) {
                                            newBalance = docc.data().balance;
                                        }
                                        const d = {
                                            ...docc.data(),
                                            balance: newBalance,
                                        }
                                        setDoc(doc(db, "users", p), d).then(() => {
                                            console.log("finalized");
                                        });
                                    }
                                });
                            }
                        });
                    });

                });

            }
        });
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{item.title.split('-')[0]}</Text>
      
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
        <Text style={styles.finalizeButtonText}>Submit</Text>
      </TouchableOpacity>

      <View style={styles.horizontalLine} />

    { check[0] && check[1] && (
        <View>
            <Text style={styles.finalizeBetTitle}>Finalize Bet</Text>

            <View style={styles.finalizeOptionsContainer}>
            <TouchableOpacity onPress={pressWhoYes} style={styles.finalizeOptionBox}>
                <Text style={styles.finalizeOptionText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pressWhoNo} style={styles.finalizeOptionBox}>
                <Text style={styles.finalizeOptionText}>No</Text>
            </TouchableOpacity>
            </View>
        
            <TouchableOpacity style={styles.finalizeButton} onPress={pressFinalize}>
            <Text style={styles.finalizeButtonText}>Submit Finalization</Text>
            </TouchableOpacity>
        </View>
    )}

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
    color: 'white'
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
  },
  finalizeBetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  finalizeOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  finalizeOptionBox: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    flex: 0.48,
    alignItems: 'center',
  },
  finalizeOptionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  finalizeButton: {
    backgroundColor: 'blue',
    padding: 15,
    alignItems: 'center',
  },
  finalizeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BetDetail;