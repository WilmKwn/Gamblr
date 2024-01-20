import * as React from 'react';
import { Button, TouchableOpacity, FlatList, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const [bets, setBets] = React.useState([]);

    const betsData = [
        {title: "bet1"},
        {title: "bet2"},
        {title: "bet3"},
    ]

    const navigation = useNavigation();

    React.useEffect(() => {
        setBets(betsData);
    }, []);

    React.useEffect(() => {
        navigation.setOptions({
            headerLargeTitle: false,
            headerSearchBarOptions: {
                placeHolder: "Search",
                onChangeText: (event) => {
                    handleFilters(event.nativeEvent.text);
                }
            }
        });
    }, [navigation]);

    function handleFilters(searchText) {
        setBets(betsData.filter((bet) => bet.title.toUpperCase().includes(searchText.toUpperCase())));
    }

    const navigateToDetail = (title) => {
        navigation.navigate('BET DETAIL', {title});
    }

    return (
        <FlatList
            data={bets}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigateToDetail(item.title)}>
                    <View style={styles.listItem}>
                        <Text style={styles.text}>{item.title}</Text>
                    </View>
                </TouchableOpacity>
            )}
            ListHeaderComponent={
                <View style={styles.container}>
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 75,
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
    searchInput: {
        fontSize: 18,
        padding: 8,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
    }
});