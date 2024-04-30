import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TextInput, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = () => {
  const navigation = useNavigation();
  const doctorIcon = require('./assets/logo.jpg');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginApiUrl = 'http://192.168.181.243/demo/project.php';

  const handleLogin = () => {
    fetch(loginApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        navigation.navigate('Dashboard', { username: username }); // Pass username to Dashboard
      } else {
        alert(data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.overlay}>
          <Icon name="user" size={30} color="#3D6DCC" />
        </View>
        <View style={styles.contentContainer}>
          <Image source={doctorIcon} style={styles.icon} />
          <Text style={styles.title}>Doctor Login</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Doctor ID"
          placeholderTextColor="#A9A9A9"
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={[styles.textInput, styles.passwordInput]}
          placeholder="password"
          placeholderTextColor="#A9A9A9"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.createAccountText}>Don't have an account?</Text>
      <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('SignupScreen')}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E6EEFF',
    alignItems: 'center',
  },
  topContainer: {
    backgroundColor: '#3D6DCC',
    height: windowHeight * 0.2,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    width: windowWidth * 0.14,
    height: windowWidth * 0.14,
    top: windowHeight * 0.114,
    right: windowWidth * 0.1,
    backgroundColor: '#E6EEFF',
    borderRadius: windowWidth * 0.1,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    marginRight: windowWidth * 0.3,
    marginTop: windowHeight * 0.1,
  },
  icon: {
    width: windowWidth * 0.12,
    height: windowWidth * 0.12,
    marginRight: windowWidth * 0.10,
    marginTop: windowHeight * 0.1,
    borderRadius: windowWidth * 0.01,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.05,
    borderRadius: windowWidth * 0.05 * 0.3,
    backgroundColor: 'white',
    paddingHorizontal: windowWidth * 0.02,
    marginTop: windowHeight * 0.1,
    borderWidth: 1,
    borderColor: '#A9A9A9',
  },
  passwordInput: {
    marginTop: windowHeight * 0.04,
    borderWidth: 1,
    borderColor: '#A9A9A9',
    borderRadius: windowWidth * 0.05 * 0.3,
  },
  loginButton: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.05,
    backgroundColor: '#3D6DCC',
    borderRadius: windowHeight * 0.05 * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: windowHeight * 0.08,
    elevation: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
  },
  createAccountText: {
    marginTop: windowHeight * 0.1,
    fontSize: windowWidth * 0.03,
    fontWeight: '400',
    color: 'black',
    textAlign: 'center',
  },
  signupButton: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.03,
    backgroundColor: 'transparent',
    borderRadius: windowHeight * 0.03 * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: windowHeight * 0.02,
  },
  signupButtonText: {
    color: 'black',
    fontSize: windowWidth * 0.04,
    fontWeight: '700',
    lineHeight: windowHeight * 0.03,
    textAlign: 'right',
  },
});

export default LoginScreen;
