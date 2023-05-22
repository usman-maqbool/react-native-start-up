import React, { useEffect, useState } from 'react'
import TouchID from 'react-native-touch-id';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native'
import Container from './Container'
import Logo from './Logo'
import Button from './Button'
import FingerIcon from './SVGCode';

const BiometricVerification = ({ navigation }) => {

  const [authenticate, setAuthenticate] = useState(false)

  const handleAuth = () => {
    TouchID.isSupported().then((biometryType) => {
      if (biometryType === "FaceID") {
        TouchID.authenticate("Authenticate using Face ID")
          .then((success) => {
            console.log("Authentication success");
            // Additional logic or actions after successful authentication
          })
          .catch((error) => {
            // Alert.alert("Authentication Failed", error.message);

          });
      } else {
        TouchID.authenticate("Authenticate using Touch ID")
          .then((success) => {
            console.log("Authentication success");
            // Additional logic or actions after successful authentication
            navigation.navigate('FaceVerification')
          })
          .catch((error) => {
            // Alert.alert("Authentication Failed", error.message);
            setAuthenticate(true)
          });
      }
    });
  };


  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.navigate('FaceVerification')}>
        <Logo />
      </TouchableOpacity>
      <View style={styles.images}>
        <FingerIcon />

      </View>
      <View style={[styles.imageView]}>
        {/* <Image source={require('./assets/thumb.png')} style={styles.images} /> */}
      </View>
      {/* <View style={[styles.textView]}>
        <Text style={[styles.text]}>
          Place your thumb & verify your identity
          through fingerprint scanning for biometrics
        </Text>
      </View> */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {! authenticate ? 
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleAuth}
        >
          Authenticate
        </Button>
        : <Button
        mode="contained"
        style={styles.button}
        onPress={handleAuth}
      >
        Try again
      </Button> }
      </View>
    </Container>
  )
}


const styles = StyleSheet.create({
  images: {
    width: 120,
    // marginBottom: 80,
    marginLeft:100,
    marginTop:220,
    height: 120,
    resizeMode: 'stretch'
  },
  imageView: {
    marginHorizontal: 'auto',
    width: '100%',
    marginTop: 120,
    alignItems: 'center',
  },

  textView: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  text: {
    textAlign: 'center',
    color: '#202020',
    fontWeight: 500,
    fontSize: 18,
    marginVertical: 10,
  },
  button: {
    width: '60%',
    justifyContent:'center',
    textAlign:'center',
    marginVertical: 10,
    borderRadius: 10,
    fontSize: 15,
  },
  FingerView:{
    marginTop:150,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})



export default BiometricVerification