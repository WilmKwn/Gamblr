import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const BetDetail = ({route}) => {
    const { item } = route.params;

  const [amount, setAmount] = useState('');

  const handleButtonPress = () => {

  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{item.title}</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text>{item.yesOrNo ? 'YES' : 'OVER'}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button}>
          <Text>{item.yesOrNo ? 'NO' : 'UNDER'}</Text>
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
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    justifyContent: 'center',
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