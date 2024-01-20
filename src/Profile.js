import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const Profile = ({ navigation }) => {
  const user = {
    name: 'John Doe',
    balance: 500,
  };

  const [moneyAmount, setMoneyAmount] = useState('(Money Amount)');

  const handleAddMoney = () => {
    // Implement logic to add money here using the value of `moneyAmount`.
  };

  const handleCashOut = () => {
    // Implement logic to cash out here using the value of `moneyAmount`.
  };

  const handleSignOut = () => {
    navigation.replace('LOGIN');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../images/profile_icon.png')}
        style={styles.profileImage}
      />
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.balanceText}>Balance: ${user.balance}</Text>
      <TextInput
        style={styles.input}
        value={moneyAmount}
        onChangeText={(text) => setMoneyAmount(text)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddMoney}>
          <Text style={styles.buttonText}>Add Money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cashOutButton} onPress={handleCashOut}>
          <Text style={styles.buttonText}>Cash Out</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 50,
    marginBottom: 20,
  },
  userName: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 32,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20, // Add margin here to create space between buttons and "Sign Out"
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  cashOutButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signOutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '80%',
  },
});

export default Profile;
