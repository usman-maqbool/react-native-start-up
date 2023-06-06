import React, { useEffect, useState } from 'react'
import TouchID from 'react-native-touch-id';
import { View, Text, StyleSheet, Image, Modal, BackHandler, Alert, TouchableOpacity } from 'react-native'
import Container from './Container'
import Logo from './Logo'
import Button from './Button'
import FingerIcon from './SVGCode';
import WarnIcon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from './Theme';


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

  const [backModal, setBackModal] = useState(false)

  const handleModalClose = () => {
      setBackModal(false)
  }
  const handleLogout = () => {
      setBackModal(false)
      AsyncStorage.removeItem('qrCode');
      AsyncStorage.removeItem('user');
      console.log('Data removed successfully');
      navigation.navigate("Registration")
  }

  useEffect(() => {
    const backAction = () => {
        
        setBackModal(true)
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);



  return (
    <Container>
        <Logo />

      <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={backModal}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{  justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 100, color: 'red' }}><WarnIcon name="warning" size={80} color='red' /></Text>
                            </View>
                                <View style={{marginTop:30}}>

                                    <Text style={styles.modalText}>Once the verification process has been initiated, it is not possible to go back. You have the option to click “Close” to restart the process or click “Proceed” to advance to the next step.</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop:20, justifyContent: 'space-between' }}>

                                    <Button mode="contained" style={[
                                        styles.buttonModal, {backgroundColor:theme.colors.secondary}
                                    ]}
                                        
                                        onPress={handleLogout}
                                    >
                                     Cloose
                                    </Button>
                                    <Button mode="contained" style={[
                                        styles.buttonModal,
                                    ]}
                                    onPress={handleModalClose}
                                    >
                                    
                                    Proceed
                                    </Button>
                                </View>
                            
                        </View>

                    </View>
                </Modal>
            </View>
            { !backModal ? 
          <>
          <View style={styles.images}>
            <FingerIcon />

          </View>
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
      </>

: null }
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
    marginTop:100,
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




  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    height: 220
},
modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    height:450,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
},
buttonModal: {
    borderRadius: 20,
    width:120
},
textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
},
modalText: {
    marginBottom: 15,
    textAlign: 'left',
    color: "black",
    fontWeight: '500',
    fontSize: 18,

},











})



export default BiometricVerification