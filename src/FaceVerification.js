import { View, StyleSheet, Alert, Modal, TouchableOpacity,Pressable, Image, Text } from 'react-native'
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

const FaceVerification = ({navigation}) => {
    const cameraRef = useRef(null);
    const [isFaceDetected, setIsFaceDetected] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [successRequest, setSuccessRequest] = useState(false)
    const [loading, setLoading] = useState(true)
    const [failedRequest, setFailedRequest] = useState(false)
    const [authToken, setAuthToken] = useState('')
    const [qrCode, setQrCode] = useState('')

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
          
        };
        const sessionURL = `${baseUrl}/client/upload_image/`
        axios.post(sessionURL, data, { headers })
          .then((response) => {
            if (response.status == 200) {
              console.log(response)
              setSuccessRequest(true)
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
      setModalVisible(!modalVisible)
      setFailedRequest(false)
      setLoading(true)
    }

    return (
        <Container>
          <TouchableOpacity onPress={() => navigation.navigate('DashboardView')}>
              <Logo />
          </TouchableOpacity>
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
            { modalVisible ? null : 
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
           
            
               {isFaceDetected && !modalVisible ?
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
            
        </Container>
    )
}

const styles = StyleSheet.create({
    cameraContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 180,
    },
    cameraPreview: {
        width: '100%',
        marginTop:150,
        height: 80, // Adjust the height as needed
    },
    textView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
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
        top: '20%',
        left: '12%',
        width: '75%',
        height: '100%',
        borderWidth: 8,
        borderColor: '#f59707',
        borderStyle: 'dotted', // Set border style to 'dotted'
        borderRadius: 125, // Make it a circle
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


})

export default FaceVerification

