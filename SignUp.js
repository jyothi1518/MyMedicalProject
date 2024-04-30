import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    username: '',
    doctorName: '',
    age: '',
    gender: '',
    department: '',
    contactNumber: '',
    password: ''
  });

  const handleBack = () => {
    console.log("Navigating back...");
    navigation.goBack();
  };

  const handleSignup = () => {
    if (!formData.username || !formData.password || !formData.doctorName || !formData.age || !formData.gender || !formData.department || !formData.contactNumber) {
      Alert.alert('Error', 'Please provide all the information.');
      return;
    }

    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => {
        if (key === 'age' || key === 'contactNumber') {
          return value !== '' ? [key, value] : [key, null];
        }
        return value !== '';
      })
    );

    fetch('http://192.168.181.243/demo/sign.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filteredFormData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success === false) {
          Alert.alert('Error', data.message);
        } else {
          Alert.alert('Success', 'Registration successful');
          console.log("User signed up successfully");
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.blueContainer}>
        <TouchableOpacity style={styles.backArrowContainer} onPress={handleBack}>
          <Icon name="arrow-back" size={windowWidth * 0.08} color="white" />
        </TouchableOpacity>
        <FontAwesomeIcon name="user" size={windowWidth * 0.08} color="white" style={styles.userIcon} />
        <Text style={styles.signupText}>Signup</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Doctor ID"
            onChangeText={text => setFormData({ ...formData, username: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Doctor Name"
            onChangeText={text => setFormData({ ...formData, doctorName: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Age"
            onChangeText={text => setFormData({ ...formData, age: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Gender"
            onChangeText={text => setFormData({ ...formData, gender: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Department"
            onChangeText={text => setFormData({ ...formData, department: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Contact Number"
            onChangeText={text => setFormData({ ...formData, contactNumber: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => setFormData({ ...formData, password: text })}
          />
        </View>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Signup</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6EEFF',
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: windowHeight * 0.15,
    paddingBottom: windowHeight * 0.05,
  },
  blueContainer: {
    width: '100%',
    backgroundColor: 'rgba(61, 109, 204, 1)',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    height: windowHeight * 0.15, 
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  signupText: {
    fontSize: windowWidth * 0.06,
    fontWeight: '700',
    color: 'white',
    marginBottom: windowHeight * 0.02,
    top: -windowHeight * 0.010,
    left: -windowWidth * 0.12,
  },  
  backArrowContainer: {
    position: 'absolute',
    top: windowHeight * 0.07,
    left: windowWidth * 0.03,
    padding: windowWidth * 0.03,
    zIndex: 2,
  },  
  userIcon: {
    position: 'absolute',
    top: windowHeight * 0.082,
    right: windowWidth * 0.76,
  },
  inputContainer: {
    alignItems: 'center',
    marginTop: windowHeight * 0.1, // Adjusted marginTop to position inputContainer below the blue container
  },
  textInput: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.05,
    borderRadius: windowWidth * 0.02,
    borderWidth: 1,
    backgroundColor: 'rgba(253, 245, 245, 1)',
    borderColor: 'rgba(0, 0, 0, 1)',
    marginTop: windowHeight * 0.015,
    marginBottom: windowHeight * 0.01,
    paddingLeft: windowWidth * 0.04,
    opacity: 0.5,
  },
  signupButton: {
    width: windowWidth * 0.35,
    height: windowHeight * 0.05,
    borderRadius: windowWidth * 0.1,
    backgroundColor: 'rgba(61, 109, 204, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowHeight * 0.05,
    elevation: 20,
  },
  signupButtonText: {
    color: 'white',
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
