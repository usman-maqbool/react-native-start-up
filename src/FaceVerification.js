import { View, StyleSheet, Alert, Modal, BackHandler, TouchableOpacity,Pressable, Image, Text } from 'react-native'
import { RNCamera } from 'react-native-camera';
import PropType from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Container from './Container'
import Logo from './Logo'
import Button from './Button'
import Spinner from './Spinner';
import axios from 'axios';
import { baseUrl } from './Configuration';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WarnIcon from 'react-native-vector-icons/AntDesign';
import { theme } from './Theme';
import DeviceInfo from 'react-native-device-info';

const FaceVerification = ({navigation}) => {
    const cameraRef = useRef(null);
    const [isFaceDetected, setIsFaceDetected] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [successRequest, setSuccessRequest] = useState(false)
    const [loading, setLoading] = useState(true)
    const [failedRequest, setFailedRequest] = useState(false)
    const [authToken, setAuthToken] = useState('')
    const [qrCode, setQrCode] = useState('')

    const deviceInfo = DeviceInfo.getManufacturer();
    const manufacturer = deviceInfo._j;
    const handleFacesDetected = ({ faces }) => {
        if (faces.length > 0) {
          const face = faces[0];
            setIsFaceDetected(true)
        } else {
          setIsFaceDetected(false);
        }
      };

      useEffect(() =>{
        localData()
        qrLocalData()
      }, [])
      const localData = () => {
        AsyncStorage.getItem("user")
        .then((value) => {
          if (value) {
            const data = JSON.parse(value);
            const token = data.access;
            setAuthToken(token)
          } else {
            console.log("Value not found in local storage");
          }
        })
        .catch((error) => {
          console.log('Error retrieving data:', error);
        });
    }

    const qrLocalData = () => {
      AsyncStorage.getItem("qrCode")
        .then((value) => {
          if (value) {
            const data = JSON.parse(value);
           setQrCode(data)
          } else {
            console.log("Value not found in local storage");
          }
        })
        .catch((error) => {
          console.log('Error retrieving data:', error);
        });
    }

    const takePicture = async () => {
    if (cameraRef.current) {
        const options = { quality: 0.5, base64: true };
        const dataImage = await cameraRef.current.takePictureAsync(options);
        console.log(dataImage.uri,'its data');
        setModalVisible(true)
        const headers = {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        };

        const data = {
          "dataImage":dataImage,
          'qrToken':qrCode,
          "mobile_manufacturer":manufacturer
          
        };
        const sessionURL = `${baseUrl}/client/upload_image/`
        axios.post(sessionURL, data, { headers })
          .then((response) => {
            if (response.status == 200) {
              console.log(response)
              setSuccessRequest(true)
              setModalVisible(false)
              navigation.navigate('DashboardView')
              setLoading(false)
            }
            else {
              setFailedRequest(true)
              setLoading(false)
            }
          })
          .catch((error) => {
            console.log(error);
            setLoading(false)
            setFailedRequest(true)
          });
      }
    }

    const closeModal = () => {
      setModalVisible(false)
      setFailedRequest(false)
      setLoading(true)
    }

    const [backModal, setBackModal] = useState(false)

    const handleModalClose = () => {
        setBackModal(false)
    }
    const handleLogout = () => {
        setBackModal(false)
        AsyncStorage.removeItem('qrCode');
        AsyncStorage.removeItem('user');
        console.log('Data removed successfully');
        setBackModal(false)
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
                    <View style={styles.backCenteredView}>
                        <View style={styles.backModalView}>
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

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {loading ?
                    <>
                    <View style={styles.modalText}>
                      <Text style={styles.text}>We are working on your request please wait</Text>
                    </View>
                    <Spinner/>
                    </>
                  : null}
                  { failedRequest ? 
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.text, {color:'red'}]}>Verification failed please try again</Text>
                      <Button mode="contained"  onPress={closeModal} >
                          Try Again
                    </Button>
                  </View> 
                  :  null }

                </View>
              </View>
            </Modal>
            { modalVisible || backModal ? null : 
            <View style={styles.cameraContainer}>
            <RNCamera
                style={styles.cameraPreview}
                type={RNCamera.Constants.Type.front} // Specify the front camera
                captureAudio={false}
                ref={cameraRef}
                onFacesDetected={handleFacesDetected}
                faceDetectionClassifications={RNCamera.Constants.FaceDetection.Classifications.all}
                faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
                faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
            />
            <View style={styles.faceBlock}></View>
        </View>
            
            }

            { !backModal ? 
            <>
               {isFaceDetected && !modalVisible  ?
            <View style={styles.textView}>
                <Text style={styles.text}>
                    Please keep your face inside it </Text>
                    </View>
                 : null  }
                 {! isFaceDetected && !modalVisible ?
                      <View style={styles.textView}>
                       <Text style={styles.text}>
                    Ensure that your face is positioned
                    at the center of the shutter lines.  </Text>
                          </View> : null}
               
            {isFaceDetected && !modalVisible ? <Button mode="contained"  onPress={takePicture} style={styles.button}>
                Start Verification
            </Button> : null}
            </>
            : null }
        </Container>
    )
}

const styles = StyleSheet.create({
    cameraContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 190,
    },
    cameraPreview: {
        width: '100%',
        marginTop:160,
        height: 80, // Adjust the height as needed
    },
    textView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },
    text: {
        textAlign: 'center',
        color: '#202020',
        fontWeight: '500',
        fontSize: 18,
        marginVertical: 10,
    },
    faceBlock:{
        position: 'absolute',
        top:30,
        width: 250,
        height: 250,
        justifyContent:'center',
        alignItems:'center',
        borderWidth: 8,
        borderColor: '#f59707',
        borderStyle: 'dotted', // Set border style to 'dotted'
        borderRadius: 200, // Make it a circle
        // borderRadius: '50%', // Make it a circle
        opacity: 0.6,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        marginBottom:65,
        marginTop:45,
        padding: 35,
        width: '90%',
        height: '40%',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      modalText: {
        marginTop:20,
      },



      
      backCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    height: 220
},
backModalView: {
    margin: 15,
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

export default FaceVerification

