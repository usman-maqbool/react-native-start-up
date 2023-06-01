import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./src/Home"
import Registration from './src/Registration';
import ScaningView from './src/Scaning';
import ThumbView from './src/ThumbView';
import CameraScreen from './src/VerifyingView';
import DashboardView from './src/DashboardView';
import BiometricVerification from './src/BiometricVerification';
import FaceVerification from './src/FaceVerification';
import PrivacyPolicy from './src/PrivacyPolicy';
import TermsService from './src/TermsService';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Registration" component={Registration}/>
        <Stack.Screen name="Scaning" component={ScaningView}/>
        <Stack.Screen name="Thumb" component={ThumbView}/>
        <Stack.Screen name="Verifying" component={CameraScreen}/>
        <Stack.Screen name="FaceVerification" component={FaceVerification}/>
        <Stack.Screen name="DashboardView" component={DashboardView}/>
        <Stack.Screen name="Biometric" component={BiometricVerification}/>
        <Stack.Screen name="Privacy" component={PrivacyPolicy}/>
        <Stack.Screen name="Services" component={TermsService}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;