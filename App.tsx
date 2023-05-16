import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./src/Home"
import Registration from './src/Registration';
import ScaningView from './src/Scaning';
import ThumbView from './src/ThumbView';
import VerifyingView from './src/VerifyingView';
import DashboardView from './src/DashboardView';
import Touch from './src/Touch';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Registration" component={Registration}/>
        <Stack.Screen name="Scaning" component={ScaningView}/>
        <Stack.Screen name="Thumb" component={ThumbView}/>
        <Stack.Screen name="Verifying" component={VerifyingView}/>
        <Stack.Screen name="DashboardView" component={DashboardView}/>
        <Stack.Screen name="Touch" component={Touch}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;