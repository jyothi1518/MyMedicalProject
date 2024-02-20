import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Dashboard from './dashboard';
import SignUp from './SignUp';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = () => {
    const loginApiUrl = 'http://192.168.163.243/medical/project.php';

    fetch(loginApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Login Response:', data);
        if (data.status === 'success') {
          showAlert('Login successful!');
          setLoggedIn(true);
        } else {
          showAlert('Login failed. Please try again.');
        }
      })
      .catch(error => {
        console.error('Login Error:', error);
        showAlert('Login failed. Please try again.');
      });
  };

  const handleSignUp = () => {
    setShowSignup(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleForgotPassword = () => {
    // Placeholder for forgot password logic
    console.log('Forgot Password clicked');
  };

  const handleSignup = (signupUsername, signupPassword, email) => {
    // Placeholder for signup logic
    console.log('Signup clicked');
    setShowSignup(false);
    // You can implement signup API call or any other logic here
  };

  const handleNavigationBack = () => {
    setShowSignup(false); // Hide SignUp component
  };

  const showAlert = message => {
    Alert.alert('Status', message);
  };

  if (isLoggedIn) {
    return <Dashboard username={username} handleLogout={handleLogout} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check Your Brain</Text>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={require('./assets/brain1.png')} // Replace with your local image path
        />
      </View>
      {!showSignup && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>
      )}
      {showSignup && (
        <SignUp handleSignup={handleSignup} handleNavigationBack={handleNavigationBack} />
      )}
      {!showSignup && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
      {!showSignup && (
        <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6EEFF', // Light blue background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Black color for the title
    marginBottom: 20,
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 300, // Set width of input boxes
    borderColor: '#333', // Dark border color
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#3D6DCC', // Dark blue button color
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    elevation: 3, // Add some elevation for 3D effect
    flex: 1,
    marginRight: 5,
  },
  signupButton: {
    backgroundColor: '#3D6DCC', // Dark blue button color
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 3, // Add some elevation for 3D effect
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '300',
    textAlign: 'center',
    padding: '10px 02px',
  },
  forgotPassword: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  forgotPasswordText: {
    color: '#333',
    textDecorationLine: 'underline',
  },
});

export default App;
