import * as React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLargeTitle: true,
            headerSearchBarOptions: {
                placeHolder: "Search",
            }
        });
    }, [navigation]);
    return (
        <ScrollView contentContainerStyle={styles.contianer}>
            <Text style={styles.text}>Home</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contianer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 32,
        fontWeight: "bold"
    }
});