import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Animated, Dimensions, PixelRatio, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');

const Dashboard = ({ navigation, handleLogout, handleImageUpload, route }) => {
  const { username } = route.params;
  const [showSidebar, setShowSidebar] = useState(false);
  const [showBlueContainer, setShowBlueContainer] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const blueContainerPosition = useRef(new Animated.Value(height - height * 0.25)).current; // Adjusted initial position based on screen height
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
        alert('Permission to access camera and photo library required!');
      }
    })();
  }, []);

  const handlePickCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const handlePickGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const handleLogoutPress = () => {
    navigation.navigate('LoginScreen');
    handleLogout();
  };

  const handleDoctorProfilePress = () => {
    navigation.navigate('DoctorProfileScreen', { username: username });
  };

  const handleListOfPatientsPress = () => {
    navigation.navigate('ListOfPatientsScreen');
  };

  const handleSegregatePress = () => {
    navigation.navigate('SegregationScreen');
  };  

  const handleUploadMRIImagesPress = () => {
    setShowBlueContainer((prevState) => !prevState);
  };

  useEffect(() => {
    Animated.timing(blueContainerPosition, {
      toValue: showBlueContainer ? height - height * 0.15 : height - height * 0.13, // Adjusted values for container position
      duration: 500, // Adjust the duration as needed
      useNativeDriver: false,
    }).start();
  }, [showBlueContainer]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Icon name={showSidebar ? 'x' : 'menu'} size={30} color="white" style={[styles.menuIcon, styles.sidebarIcon]} />
        </TouchableOpacity>
        <Text style={styles.title}>Welcome, Doctor!</Text>
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
                { title: 'Doctor Profile', icon: 'user', onPress: handleDoctorProfilePress },
                { title: 'List of Patients', icon: 'users', onPress: handleListOfPatientsPress },
                { title: 'Logout', icon: 'log-out', onPress: handleLogoutPress },
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

      <View style={styles.buttonContainer}>
        {/* Upload MRI images button */}
        <View style={[styles.buttonWrapper, { marginTop: height * 0.1 }]}>
          <TouchableOpacity onPress={handleUploadMRIImagesPress}>
            <View style={[styles.button, styles.uploadMRIButton]}>
              <Text style={styles.buttonText}>Upload MRI Images</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Segregate button */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity onPress={handleSegregatePress}>
            <View style={[styles.button, styles.segregateButton]}>
              <Text style={styles.buttonText}>Segregate using BMI and Volume</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {showBlueContainer && (
        <Animated.View style={[styles.blueContainer, { top: blueContainerPosition }]}>
          <Text style={styles.uploadImageText}>Upload image</Text>
          <TouchableOpacity onPress={handlePickCamera}>
            <View style={styles.ellipse}>
              <Icon name="camera" size={PixelRatio.getPixelSizeForLayoutSize(15)} color="#3D6DCC" />
            </View>
          </TouchableOpacity>
          <Text style={styles.cameraText}>Camera</Text>
          <TouchableOpacity onPress={handlePickGallery}>
            <View style={styles.ellipse2}>
              <Icon name="image" size={PixelRatio.getPixelSizeForLayoutSize(15)} color="#3D6DCC" />
            </View>
          </TouchableOpacity>
          <Text style={styles.galleryText}>Gallery</Text>
          {selectedImage && <Image source={{ uri: selectedImage }} style={styles.selectedImage} />}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6EEFF',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3D6DCC',
    paddingHorizontal: 10,
    paddingTop: height * 0.1,
    paddingBottom: height * 0.02,
  },  
  title: {
    fontSize: width * 0.05, // Adjust the percentage for font size
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    top: height * 0.103, // Adjust the percentage for top position
    left: '80%',
    transform: [{ translateX: -width * 0.2 }], // Adjust this value as needed
},  
  menuIcon: {
    marginRight: 10,
    bottom: 0,
    left: 0,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: height * 0.1,
  },
  buttonWrapper: {
    width: '80%',
    marginBottom: height * 0.03,
  },
  button: {
    width: '100%',
    paddingVertical: height * 0.025,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  uploadMRIButton: {
    backgroundColor: '#3D6DCC',
    borderRadius: 25,
    elevation: 20,
  },
  segregateButton: {
    backgroundColor: '#3D6DCC',
    borderRadius: 25,
    elevation: 20,
  },
  sidebarContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#E6EEFF',
    width: width * 0.6,
    paddingTop: height * 0.1,
    paddingHorizontal: width * 0.05,
    zIndex: 10,
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
    marginBottom: height * 0.03,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
    textAlign: 'center',
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.05,
  },
  menuText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  blueContainer: {
    position: 'absolute',
    width: '100%',
    height: height * 0.25,
    backgroundColor: 'rgba(61, 109, 204, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.08,
    top: height * 0.2,
  },
  uploadImageText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    position: 'absolute',
    top: height * 0.02,
    left: width * 0.05,
  },
  ellipse: {
    position: 'absolute',
    width: 66,
    height: 59,
    borderRadius: 50,
    backgroundColor: 'rgba(230, 238, 255, 1)',
    bottom: - height * 0.06, 
    right: width * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
},
  ellipse2: {
    width: 66,
    height: 59,
    borderRadius: 50,
    backgroundColor: 'rgba(230, 238, 255, 1)',
    bottom: height * 0.015,
    left: width * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraText: {
    fontSize: 14,
    color: '#FFFFFF',
    position: 'absolute',
    bottom: height * 0.07,
    left: width * 0.22,
  },
  galleryText: {
    fontSize: 14,
    color: '#FFFFFF',
    position: 'absolute',
    bottom: height * 0.068,
    right: width * 0.19,
  },
  selectedImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    marginVertical: height * 0.025,
  },
});

export default Dashboard;
