import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, StyleSheet, Text, ScrollView, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const DoctorEditProfile = ({ route }) => {
  const { username } = route.params;
  const navigation = useNavigation();

  const [doctor, setDoctor] = useState({
    username: '',
    doctorName: '',
    contactNumber: '',
    gender: '',
    age: '',
    department: '',
    password: ''
  });

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(`http://192.168.181.243/demo/edit.php?username=${username}`);
        const data = await response.json();
        setDoctor(data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    fetchDoctorDetails();
  }, [username]);

  const handleSubmit = async () => {
    if (Object.values(doctor).some(value => value === '')) {
      Alert.alert('Error', 'Please provide all the information');
      return;
    }

    try {
      const response = await fetch('http://192.168.181.243/demo/edit.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(doctor).toString(),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', data.message);
      } else {
        console.error('Error updating record:', data.message);
      }
    } catch (error) {
      console.error('Submission Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.blueContainer}>
        <Ionicons name="arrow-back" size={28} color="#fff" style={styles.backArrow} onPress={() => navigation.goBack()} />
        <Text style={styles.profileText}>Edit Profile</Text>
      </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: '#FFFFFF' }]}
          placeholder="Doctor ID"
          value={doctor.username}
          editable={false}
        />
        <TextInput
          style={[styles.input, { backgroundColor: '#FFFFFF' }]}
          placeholder="Doctor Name"
          value={doctor.doctorName}
          onChangeText={(text) => setDoctor({ ...doctor, doctorName: text })}
        />
        <TextInput
          style={[styles.input, { backgroundColor: '#FFFFFF' }]}
          placeholder="Age"
          value={doctor.age}
          onChangeText={(text) => setDoctor({ ...doctor, age: text })}
        />
        <TextInput
          style={[styles.input, { backgroundColor: '#FFFFFF' }]}
          placeholder="Gender"
          value={doctor.gender}
          onChangeText={(text) => setDoctor({ ...doctor, gender: text })}
        />
        <TextInput
          style={[styles.input, { backgroundColor: '#FFFFFF' }]}
          placeholder="Department"
          value={doctor.department}
          onChangeText={(text) => setDoctor({ ...doctor, department: text })}
        />
        <TextInput
          style={[styles.input, { backgroundColor: '#FFFFFF' }]}
          placeholder="Contact Number"
          value={doctor.contactNumber}
          onChangeText={(text) => setDoctor({ ...doctor, contactNumber: text })}
        />
        <TextInput
          style={[styles.input, { backgroundColor: '#FFFFFF' }]}
          placeholder="Password"
          value={doctor.password}
          onChangeText={(text) => setDoctor({ ...doctor, password: text })}
        />
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleSubmit} color="#3D6DCC" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E6EEFF',
  },
  blueContainer: {
    width: '100%',
    bottom: height * 0.05,
    height: height * 0.2,
    backgroundColor: 'rgba(61, 109, 204, 1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: height * 0.05,
  },
  backArrow: {
    position: 'absolute',
    left: width * 0.04,
    top: height * 0.13,
  },
  profileText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    top: height * 0.025,
    right: width * 0.2,
  },
  formContainer: {
    alignItems: 'center',
    top: height * 0.05,
  },
  input: {
    width: width * 0.8,
    height: height * 0.05,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: height * 0.03,
    paddingLeft: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: height * 0.05,
    width: width * 0.3,
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default DoctorEditProfile;
