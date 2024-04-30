// App.js

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import Dashboard from './Dashboard';
import DoctorProfileScreen from './DoctorProfileScreen';
import DoctorEditProfile from './DoctorEditProfile';
import ListOfPatientsScreen from './ListOfPatientsScreen';
import AddPatient from './AddPatient';
import SegregationScreen from './SegregationScreen';
import SegregationTableScreen from './SegregationTableScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Your login logic here
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Your logout logic here
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen">
          {(props) => <LoginScreen {...props} handleLogin={handleLogin} />}
        </Stack.Screen>
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="Dashboard">
          {(props) => <Dashboard {...props} handleLogout={handleLogout} />}
        </Stack.Screen>
        <Stack.Screen name="DoctorProfileScreen" component={DoctorProfileScreen} />
        <Stack.Screen name="DoctorEditProfile" component={DoctorEditProfile} />
        <Stack.Screen name="ListOfPatientsScreen" component={ListOfPatientsScreen} />
        <Stack.Screen name="AddPatient" component={AddPatient} />
        <Stack.Screen name="SegregationScreen" component={SegregationScreen} />
        <Stack.Screen name="SegregationTableScreen" component={SegregationTableScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
