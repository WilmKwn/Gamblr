import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';

const CreateBet = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stockName, setStockName] = useState('');
  const [stockPrice, setStockPrice] = useState('');
  const [amount, setAmount] = useState('');

  const handleButtonPress = () => {
    console.log('Button pressed!');
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Stock Name:', stockName);
    console.log('Stock Price:', stockPrice);
    console.log('Amount:', amount);
  };

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Create Stock Bet</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Stock Name"
        value={stockName}
        onChangeText={(text) => setStockName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Stock Price"
        value={stockPrice}
        onChangeText={(text) => setStockPrice(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />
      <Button title="Submit" onPress={handleButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
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
  },
});

export default CreateBet;