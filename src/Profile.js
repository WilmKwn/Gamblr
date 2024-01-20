import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Profile = ({ navigation }) => {
  const user = {
    name: 'John Doe',
    balance: 500,
  };

  const handleAddMoney = () => {

  };
  const handleCashOut = () => {

  };
  const handleSignOut = () => {
    navigation.replace('LOGIN');
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../images/profile_icon.png')}
        style={styles.profileImage}
      />
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.balanceText}>Balance: ${user.balance}</Text>
      <TouchableOpacity style={styles.button} onPress={handleAddMoney}>
        <Text style={styles.buttonText}>Add Money</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCashOut}>
        <Text style={styles.buttonText}>Cash Out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
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
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;