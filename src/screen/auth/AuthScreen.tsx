import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

const AuthScreen = () => {
  const [authScreen, setAuthScreen] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginAuth = () => {
    try {
      auth().signInWithEmailAndPassword(email, password);
      Alert.alert('success', 'Login Success');
      setEmail('');
      setPassword('');
    } catch (e) {
      console.log(e);
    }
  };

  const registerAuth = () => {
    try {
      auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('success', 'Register Success');
      setEmail('');
      setPassword('');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <TextInput
          placeholder="Email"
          style={styles.inputContainer}
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          placeholder="Password"
          style={styles.inputContainer}
          onChangeText={text => setPassword(text)}
          value={password}
        />
        {authScreen === 'login' ? (
          <Button title="Login" onPress={loginAuth} />
        ) : (
          <Button title="Register" onPress={registerAuth} />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={() => setAuthScreen('register')} />
        <Button title="Login" onPress={() => setAuthScreen('login')} />
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 20,
    marginVertical: 20,
    // backgroundColor: 'lightgreen',
  },
  inputContainer: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
