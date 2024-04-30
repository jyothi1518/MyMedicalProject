import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DoctorProfileScreen = ({ route }) => {
  const { username } = route.params;
  const navigation = useNavigation();

  const [doctorDetails, setDoctorDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleEditProfilePress = () => {
    navigation.navigate('DoctorEditProfile', { username: username });
  };

  useEffect(() => {
    let isMounted = true;

    if (username) {
      fetch(`http://192.168.181.243/demo/viewprofile.php?username=${username}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (isMounted) {
            if (data) {
              setDoctorDetails(data);
              setLoading(false);
            } else {
              setError('No data found');
              setLoading(false);
            }
          }
        })
        .catch(error => {
          console.error('Error fetching doctor details:', error);
          setError('Error fetching data');
          setLoading(false);
        });

      return () => {
        isMounted = false;
      };
    }
  }, [username]);

  return (
    <View style={styles.container}>
      <View style={styles.blueContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={Dimensions.get('window').height * 0.035} color="#fff" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.profileText}>Doctor Profile</Text>
        <Icon name="user" size={Dimensions.get('window').height * 0.035} color="#fff" style={styles.userIcon} />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : doctorDetails ? (
        <ScrollView style={styles.scrollView}>
          <View style={styles.detailsContainer}>
            <Text style={styles.detail}>Doctor ID         :   {username}</Text>
            <Text style={styles.detail}>Doctor Name  :   {doctorDetails.doctorName}</Text>
            <Text style={styles.detail}>Age                   :   {doctorDetails.age}</Text>
            <Text style={styles.detail}>Gender             :   {doctorDetails.gender}</Text>
            <Text style={styles.detail}>Department     :   {doctorDetails.department}</Text>
            <Text style={styles.detail}>Contact            :   {doctorDetails.contactNumber}</Text>
          </View>
        </ScrollView>
      ) : null}
      <View style={styles.editProfileButtonContainer}>
        <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfilePress}>
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6EEFF',
  },
  blueContainer: {
    backgroundColor: '#3D6DCC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    paddingTop: Dimensions.get('window').height * 0.05,
    height: Dimensions.get('window').height * 0.15,
  },
  backIcon: {
    marginRight: Dimensions.get('window').width * 0.05,
  },
  profileText: {
    fontSize: Dimensions.get('window').height * 0.025,
    fontWeight: 'bold',
    color: '#fff',
    right: Dimensions.get('window').width * 0.13,
  },
  userIcon: {
    right: Dimensions.get('window').width * 0.75,
  },
  scrollView: {
    flex: 1,
  },
  detailsContainer: {
    marginTop: Dimensions.get('window').height * 0.1,
    paddingHorizontal: Dimensions.get('window').width * 0.05,
  },
  detail: {
    fontSize: Dimensions.get('window').height * 0.025,
    color: '#2A2E3B',
    marginBottom: Dimensions.get('window').height * 0.04,
    marginLeft: Dimensions.get('window').width * 0.1,
  },
  errorText: {
    fontSize: Dimensions.get('window').height * 0.022,
    color: 'red',
    textAlign: 'center',
  },
  editProfileButtonContainer: {
    alignItems: 'center',
  },
  editProfileButton: {
    backgroundColor: '#3D6DCC',
    width: screenWidth * 0.5, // Adjust according to your requirement
    borderRadius: screenWidth * 0.07, // Adjust according to your requirement
    paddingVertical: screenHeight * 0.015, // Adjust according to your requirement
    paddingHorizontal: screenWidth * 0.05, // Adjust according to your requirement
    marginBottom: screenHeight * 0.25,
  },
  editProfileButtonText: {
    color: '#fff',
    left: screenWidth * 0.09, // Adjust according to your requirement
    fontSize: screenHeight * 0.022,
    fontWeight: 'bold',
  },
});

export default DoctorProfileScreen;
