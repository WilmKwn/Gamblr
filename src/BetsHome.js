import * as React from 'react';
import { Dimensions, Image, TouchableOpacity, FlatList, View, Text, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { initializeApp} from 'firebase/app';
import { getFirestore, updateDoc } from "firebase/firestore";
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

  function confirmDate(year, month, date, hour, minute, amPm) {
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
    return false;
}


function updateActive() {

    getDocs(collection(db, 'bets')).then((querySnapshot) => {

        querySnapshot.forEach((docc) => {
            // updating active
            const endDate = docc.data().endDate;
            const active = confirmDate(endDate.slice(0, 2), endDate.slice(2, 4), endDate.slice(4, 6), endDate.slice(6, 8), endDate.slice(8, 10), endDate.slice(10, 12));

            const d = {
                ...docc.data(),
                active: active,
                merge: true,
            }
            setDoc(doc(db, 'bets', docc.id), d);

        });
    });
}


export default function StockBet() {

    const {state, dispath} = useGlobal();

    const [bets, setBets] = React.useState([]);
    const [inactiveBets, setInactiveBets] = React.useState([]);

    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
          // Code to run when the screen gains focus (navigated to or back)
          // This is where you can trigger a reload
          updateActive();
    
          return () => {
            // Code to run when the screen loses focus (navigated away)
          };
        }, [])
    );

    React.useEffect(() => {

        //updateActive();
        
        const q = query(collection(db, 'bets'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const arr = [];
            const inactive = [];
            snapshot.forEach((doc) => {
                const temp = doc.data();
                const d = {
                    title: doc.id,
                    leftNum: temp.choices[0].numVotes,
                    leftAmount: temp.choices[0].cashVotes,
                    rightNum: temp.choices[1].numVotes,
                    rightAmount: temp.choices[1].cashVotes,
                    timeLeft: temp.endDate,
                }
                if (temp.active) {
                    arr.push(d);
                } else {
                    inactive.push(d);
                }
            });

            arr.sort((a,b) => (a.leftAmount+a.rightAmount) - (b.leftAmount+b.rightAmount))
            setBets(arr);
            setInactiveBets(inactive);
        });
        return () => unsubscribe();
    }, []);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLargeTitle: false,
            headerSearchBarOptions: {
                placeHolder: "Search",
                onChangeText: (event) => {
                    handleFilters(event.nativeEvent.text);
                }
            },
            headerRight: () => (
                <TouchableOpacity onPress={() => {navigateToProfile()}}>
                    <Image
                        source={require('../images/profile_icon.png')}
                        style={{ width: 24, height: 24, marginRight: 10 }}
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    function handleFilters(searchText) {
        setBets(betsData.filter((bet) => bet.title.toUpperCase().includes(searchText.toUpperCase())));
    }

    const navigateToDetail = (item) => {
        navigation.navigate('BET DETAIL', {item});
    }
    const navigateToProfile = () => {
        navigation.navigate('PROFILE');
    }
    const navigateToCreate = () => {
        navigation.navigate('CREATE');
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={bets}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigateToDetail(item)}>
                    <View style={styles.listItem}>
                        <Text style={styles.title}>{item.title.split('-')[0]}</Text>
                        <View style={styles.countContainer}>
                        <Text style={styles.countText}># NO: {item.leftNum}</Text>
                        <Text style={styles.countText}># YES: {item.rightNum}</Text>
                        </View>
                        <View style={styles.amountContainer}>
                        <Text style={styles.amountText}>Amount: {item.leftAmount}</Text>
                        <Text style={styles.amountText}>Amount: {item.rightAmount}</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                )}
                ListHeaderComponent={
                    <View style={styles.headerContainer}>
                    {/* Your header content goes here */}
                    </View>
                }
            />
            <FlatList
                data={inactiveBets}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigateToDetail(item)}>
                    <View style={styles.listItemInactive}>
                        <Text style={styles.title}>{item.title.split('-')[0]}</Text>
                        <View style={styles.countContainer}>
                        <Text style={styles.countText}># NO: {item.leftNum}</Text>
                        <Text style={styles.countText}># YES: {item.rightNum}</Text>
                        </View>
                        <View style={styles.amountContainer}>
                        <Text style={styles.amountText}>Amount: {item.leftAmount}</Text>
                        <Text style={styles.amountText}>Amount: {item.rightAmount}</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                )}
                ListHeaderComponent={
                    <View style={styles.headerContainer}>
                    {/* Your header content goes here */}
                    </View>
                }
            />
            <TouchableOpacity onPress={() => navigateToCreate()} style={styles.createButton}>
            <Image
                source={require('../images/plus_logo.png')}
                style={styles.createButtonIcon}
            />
            </TouchableOpacity>
        </View>
    );
};
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
    // Header styles go here
    },
    listItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 10,
        paddingLeft: 10,
    },
    listItemInactive: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 10,
        paddingLeft: 10,
        backgroundColor: 'lightgray',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    countContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    countText: {
        fontSize: 16,
        color: '#555',
    },
    amountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    amountText: {
        fontSize: 16,
        color: '#555',
    },
    createButton: {
        position: 'absolute',
        bottom: 50,
        right: 20,
        backgroundColor: '#007BFF',
        borderRadius: 25,
        padding: 10,
    },
    createButtonIcon: {
        width: 30,
        height: 30,
    },
});