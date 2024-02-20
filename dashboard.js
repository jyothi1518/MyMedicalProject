import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Importing Feather icons

const Dashboard = ({ username, handleLogout, handleImageUpload, handleCalculateBMI, handleCalculateVolume }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const handleButtonPress = (action) => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Perform button action
      action();
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Icon name={showSidebar ? 'x' : 'menu'} size={30} color="white" style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Welcome, {username}!</Text>
      </View>

      {showSidebar && (
        <TouchableOpacity style={styles.sidebarContainer} onPress={closeSidebar}>
          <View style={styles.sidebar}>
            <View style={styles.closeButtonContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={closeSidebar}>
                <Icon name="x" size={30} color="#333" />
              </TouchableOpacity>
            </View>
            <Text style={styles.sidebarTitle}>Menu</Text>
            <FlatList
              data={[
                { title: 'Home', icon: 'home' },
                { title: 'Doctor Profile', icon: 'user' },
                { title: 'Patient Profile', icon: 'users' },
                { title: 'Logout', icon: 'log-out', onPress: handleLogout },
              ]}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={item.onPress}>
                  <View style={styles.menuItem}>
                    <Icon name={item.icon} size={20} color="#333" style={styles.menuIcon} />
                    <Text style={styles.menuText}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      )}

      <View style={styles.contentContainer}>
        <View style={styles.mainContent}>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              <Animated.View style={[styles.button, styles.uploadButton, { transform: [{ scale: scaleValue }] }]}>
                <TouchableOpacity onPress={() => handleButtonPress(handleImageUpload)}>
                  <Text style={styles.buttonText}>Upload MRI Images</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>

            <View style={styles.buttonWrapper}>
              <Animated.View style={[styles.button, styles.calculateButton, { transform: [{ scale: scaleValue }] }]}>
                <TouchableOpacity onPress={() => handleButtonPress(handleCalculateBMI)}>
                  <Text style={styles.buttonText}>Segregate using BMI and Volume</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6EEFF',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3D6DCC', // Blue color for the top bar
    paddingHorizontal: 20,
    paddingTop: 50, // Adjust as needed for spacing
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  menuIcon: {
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'relative',
    alignItems: 'center',
    width: '100%',
  },
  buttonWrapper: {
    width: '80%',
    marginTop: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Android shadow
    shadowColor: 'rgba(0, 0, 0, 0.3)', // iOS shadow
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: '#3D6DCC', // Blue color for upload button
  },
  calculateButton: {
    backgroundColor: '#3D6DCC', // Red color for calculate button
  },
  sidebarContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    elevation: 10, // works on android
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#E6EEFF', // Grey background color for the sidebar
    width: 200,
    paddingTop: 50,
    paddingHorizontal: 20,
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 10, // works on ios
    elevation: 10, // works on android

  },
  closeButtonContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', // Dark color for the sidebar title
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  menuIcon: {
    marginRight: 10,
  },
  menuText: {
    color: '#333', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Dashboard;
