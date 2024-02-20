import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo vector icons

const SignUp = ({ handleSignup, handleNavigationBack }) => {
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignupPress = () => {
    if (!signupUsername || !email || !signupPassword || !confirmPassword) {
      Alert.alert('Please enter all the information.');
      return;
    }
  
    if (!email.includes('@')) {
      Alert.alert('Please enter a valid email.');
      return;
    }
    
    if (signupPassword !== confirmPassword) {
      Alert.alert('Passwords do not match.');
      return;
    }
    // Make HTTP request for registration
    fetch('http://192.168.163.243/medical/project.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: signupUsername,
        password: signupPassword,
        email: email,
        register: true, // Indicate registration in the request
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Registration Response:', data);
        if (data.status === 'success') {
          Alert.alert('Registration successful!');
          handleSignup(); // Navigate back to login page
        } else {
          Alert.alert('Registration failed. Please try again.');
        }
      })
      .catch(error => {
        console.error('Registration Error:', error);
        Alert.alert('Registration failed. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.topLeftContainer} onPress={handleNavigationBack}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setSignupUsername(text)}
        value={signupUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setSignupPassword(text)}
        value={signupPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
      />
      <TouchableOpacity style={styles.signupButton} onPress={handleSignupPress}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: '#333',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  signupButton: {
    backgroundColor: '#3D6DCC', // Blue color for sign-up button
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    elevation: 3,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '300',
    textAlign: 'center',
  },
  topLeftContainer: {
    position: 'absolute',
    bottom:520,
    left: -10,
    zIndex: 1,
  },
});

export default SignUp;
