import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ListOfPatientsScreen = () => {
  const navigation = useNavigation();

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPatientList();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchPatientList();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchPatientList = () => {
    setLoading(true);
    setError(null);
    fetch('http://192.168.181.243/demo/patientlist.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data && !data.status) {
          setPatients(data);
          setLoading(false);
        } else {
          setError(data.message || 'No data found');
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching patient details:', error);
        setError('Error fetching data');
        setLoading(false);
      });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEllipsePress = () => {
    navigation.navigate('AddPatient');
  };

  const filteredPatients = patients.filter(patient => {
    return patient.patientID.toLowerCase().includes(searchQuery.toLowerCase()) ||
           patient.patientname.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <View style={styles.blueContainer}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={Dimensions.get('window').height * 0.035} color="#fff" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.profileText}>List of Patients</Text>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={Dimensions.get('window').height * 0.025} color="#8e8e93" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBox}
          placeholder="Search "
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : filteredPatients.length > 0 ? (
        <ScrollView style={styles.scrollView}>
          {filteredPatients.map(patient => (
            <View key={patient.patientID} style={styles.whiteContainer}>
              <View style={styles.detailsContainer}>
                <Text style={styles.detail}>Patient ID         :   {patient.patientID}</Text>
                <Text style={styles.detail}>Patient Name  :   {patient.patientname}</Text>
                <Text style={styles.detail}>Age                   :   {patient.Age}</Text>
                <Text style={styles.detail}>Gender             :   {patient.Gender}</Text>
                <Text style={styles.detail}>Case                 :   {patient.casepatient}</Text>
                <Text style={styles.detail}>Contact            :   {patient.contactnumber}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.errorText}>No patients found</Text>
      )}
      <TouchableOpacity style={styles.ellipse} onPress={handleEllipsePress}>
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6EEFF',
    position: 'relative',
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
    right: Dimensions.get('window').width * 0.45,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Dimensions.get('window').width * 0.05,
    marginBottom: Dimensions.get('window').height * 0.02,
    marginTop: Dimensions.get('window').height * 0.02,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: Dimensions.get('window').width * 0.03,
  },
  searchIcon: {
    marginRight: Dimensions.get('window').width * 0.02,
  },
  searchBox: {
    flex: 1,
    paddingVertical: Dimensions.get('window').height * 0.01,
    marginTop: Dimensions.get('window').height * 0.01,
    borderRadius: 10,
    marginTop: 0,
  },
  scrollView: {
    flex: 1,
  },
  whiteContainer: {
    backgroundColor: '#fff',
    marginBottom: Dimensions.get('window').height * 0.05,
    borderRadius: 10,
    elevation: 3,
    marginHorizontal: Dimensions.get('window').width * 0.05,
  },
  detailsContainer: {
    paddingVertical: Dimensions.get('window').height * 0.03,
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    zIndex: 1, // Ensure details container is above the ellipse
  },
  detail: {
    fontSize: Dimensions.get('window').height * 0.025,
    color: '#2A2E3B',
    marginBottom: Dimensions.get('window').height * 0.02,
  },
  errorText: {
    fontSize: Dimensions.get('window').height * 0.022,
    color: 'red',
    textAlign: 'center',
  },
  ellipse: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    backgroundColor: '#3D6DCC',
    borderRadius: Dimensions.get('window').width * 0.25,
    zIndex: 0, // Set a lower zIndex to ensure it stays behind other elements
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    fontSize: Dimensions.get('window').width * 0.15,
    bottom: 5,
    color: '#fff',
  },
});

export default ListOfPatientsScreen;
