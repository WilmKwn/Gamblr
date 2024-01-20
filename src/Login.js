import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, TextInput, Button, Alert } from 'react-native';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = () => {
    if (username !== "" && password !== "") {
        if (isLogin) {
            // do login check
        } else {
            // do signup check
        }
        navigation.navigate("BETS HOME");
    }
  }

  const toggleSwitch = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <View style={styles.container}>
        <Text>{isLogin ? 'Signup' : 'Login'}</Text>
        <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isLogin ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isLogin}
        />
        <TextInput
            value={username}
            onChangeText={(username) => setUsername(username)}
            placeholder={'Username'}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        />
        <TextInput
            value={password}
            onChangeText={(password) => setPassword(password)}
            placeholder={'Password'}
            secureTextEntry={true}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        />
        <Button
            title={'Login'}
            onPress={handleLogin}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
    },
});  

export default Login;