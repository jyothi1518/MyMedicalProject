import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const AddPatient = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { addPatientToList } = route.params || {}; // Extract the function from params

  const [formData, setFormData] = useState({
    patientID: '',
    patientname: '',
    Age: '',
    Gender: '',
    casepatient: '',
    contactnumber: '',
  });

  const handleBack = () => {
    console.log("Navigating back...");
    navigation.goBack();
  };

  const handleSave = () => {
    if (!formData.patientID || !formData.patientname || !formData.Age || !formData.Gender || !formData.casepatient || !formData.contactnumber) {
      Alert.alert('Error', 'Please provide all the information.');
      return;
    }

    fetch('http://192.168.181.243/demo/addpatient.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success === false) {
          Alert.alert('Error', data.message);
        } else {
          Alert.alert('Success', 'Registration successful');
          console.log("Patient added successfully");
          if (addPatientToList) {
            addPatientToList(formData); // Add the new patient to the list
          }
          handleBack(); // Navigate back after adding the patient
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
        <Text style={styles.SaveText}>Add Patient</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Patient ID"
            onChangeText={text => setFormData({ ...formData, patientID: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Patient Name"
            onChangeText={text => setFormData({ ...formData, patientname: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Age"
            onChangeText={text => setFormData({ ...formData, Age: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Gender"
            onChangeText={text => setFormData({ ...formData, Gender: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Case"
            onChangeText={text => setFormData({ ...formData, casepatient: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Contact Number"
            onChangeText={text => setFormData({ ...formData, contactnumber: text })}
          />
        </View>
        <TouchableOpacity style={styles.save} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
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
  SaveText: {
    fontSize: windowWidth * 0.06,
    fontWeight: '700',
    color: 'white',
    marginBottom: windowHeight * 0.02,
    top: -windowHeight * 0.010,
    left: -windowWidth * 0.17,
  },  
  backArrowContainer: {
    position: 'absolute',
    top: windowHeight * 0.07,
    left: windowWidth * 0.03,
    padding: windowWidth * 0.03,
    zIndex: 2,
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
  save: {
    width: windowWidth * 0.35,
    height: windowHeight * 0.05,
    borderRadius: windowWidth * 0.1,
    backgroundColor: 'rgba(61, 109, 204, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowHeight * 0.05,
    elevation: 20,
  },
  saveText: {
    color: 'white',
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
  },
});

export default AddPatient;
