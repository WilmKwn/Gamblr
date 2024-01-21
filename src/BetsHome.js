import * as React from 'react';
import { Dimensions, Image, TouchableOpacity, FlatList, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useGlobal } from './Globals';

export default function StockBet({route}) {
    const {data} = route?.params.data;

    const {state, dispath} = useGlobal();

    const [bets, setBets] = React.useState([]);

    const betsData = [
        {title: "bet1", count: 0, total: 0, yesOrNo: false},
        {title: "bet2", count: 0, total: 0, yesOrNo: false},
        {title: "bet3", count: 0, total: 0, yesOrNo: false},
        {title: "bet4", count: 0, total: 0, yesOrNo: false},
    ]

    const navigation = useNavigation();

    React.useEffect(() => {
        setBets(betsData);
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
        <View style={{ flex: 1 }}>
            <FlatList
                data={bets}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigateToDetail(item)}>
                        <View style={styles.listItem}>
                            <Text style={styles.text}>{item.title}</Text>
                            <Text style={styles.countTotalText}>
                                Count: {item.count}, Total: {item.total}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                ListHeaderComponent={
                    <View style={styles.container}>
                    </View>
                }
            />
            <TouchableOpacity onPress={() => {navigateToCreate()}}>
                <Image
                    source={require('../images/plus_logo.png')}
                    style={{
                        position: 'absolute',
                        bottom: 50,
                        right: 20,
                        width: 50,
                        height: 50,
                    }}
                />
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 10,
        paddingLeft: 10,
    },
    text: {
        fontSize: 32,
        fontWeight: "bold",
    },
    countTotalText: {
        fontSize: 16,
        color: '#555',
    },
    searchInput: {
        fontSize: 18,
        padding: 8,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
    }
});