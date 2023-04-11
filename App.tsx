import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./src/Home"
import NewLogin from './src/NewLogin';
import Dashboard from './src/Dashboard';
import NewSignUp from './src/NewSignUp';
import Registration from './src/Registration';
import ScaningView from './src/Scaning';
import ThumbView from './src/ThumbView';
import VerifyingView from './src/VerifyingView';
import DashboardView from './src/DashboardView';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="NewLogin" component={NewLogin}/>
        <Stack.Screen name="NewSignup" component={NewSignUp}/>
        <Stack.Screen name="Dashboard" component={Dashboard}/>
        <Stack.Screen name="Registration" component={Registration}/>
        <Stack.Screen name="Scaning" component={ScaningView}/>
        <Stack.Screen name="Thumb" component={ThumbView}/>
        <Stack.Screen name="Verifying" component={VerifyingView}/>
        <Stack.Screen name="DashboardView" component={DashboardView}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;