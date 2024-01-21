import * as React from 'react';
import { Dimensions, Image, TouchableOpacity, FlatList, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

export default function StockBet() {
    const {state, dispath} = useGlobal();

    const [bets, setBets] = React.useState([]);
    const [inactiveBets, setInactiveBets] = React.useState([]);

    const navigation = useNavigation();

    React.useEffect(() => {
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