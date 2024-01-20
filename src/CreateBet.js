import React, { useState } from 'react';
import { Switch, Text, View, TextInput, Button, StyleSheet } from 'react-native';

const CreateBet = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stockName, setStockName] = useState('');
  const [stockPrice, setStockPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState(false);

  const handleButtonPress = () => {
    console.log('Button pressed!');
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Stock Name:', stockName);
    console.log('Stock Price:', stockPrice);
    console.log('Amount:', amount);
  };

  const toggleSwitch = () => {
    setType((prev) => !prev);
  };

  return (
    <View style={styles.container}>
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
      <Text style={styles.header}>Stock (optional)</Text>
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
      <Text style={styles.header}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />
      <View style={styles.toggleContainer} flexDirection="row">
        <Text style={styles.header}>{stockName=="" ? 'YES' : 'OVER'}</Text>
        <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={type ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={type}
        />
        <Text style={styles.header}>{stockName=="" ? 'NO' : 'UNDER'}</Text>
      </View>
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