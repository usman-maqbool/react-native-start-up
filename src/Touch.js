import React, { useEffect } from 'react'
import TouchID from 'react-native-touch-id';
import { View, Text, Button, Alert} from 'react-native'


const Touch = () => {
  const handleAuth = ({navigation}) => {
    TouchID.isSupported().then((biometryType) => {
      if (biometryType === "FaceID") {
        TouchID.authenticate("")
          .then((success) => {
            console.log('object')            
          })
          .catch((error) => {
            Alert.alert("Authentication Failed", error.message);
          });
      } else {
        TouchID.authenticate("")
          .then((success) => {
            navigation.replace("DashboardView");

          })
          .catch((error) => {
            Alert.alert("Authentication Failed", error.message);
          });
      }
    });
  };
  

  return (
    <View>
      <Text>Touch</Text>
      <Button title="Authenticate with Biometrics" onPress={handleAuth} />
    </View>
  )
}

export default Touch