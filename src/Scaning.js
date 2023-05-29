import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import Container from './Container'
import Logo from './Logo'
import { RNCamera } from 'react-native-camera';
import Button from './Button';
import { theme } from './Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info'; 
import { baseUrl } from './Configuration';

const ScaningView = ({ navigation }) => {
    const [barcodeData, setBarcodeData] = useState('');
    const [verification, setVerification] = useState(false)
    const [deviceName, setDeviceName] = useState('')
    const profileUpdateUrl = `${baseUrl}/api/accounts/update/profile/`
    const [userToken, setUserToken] = useState('')

    const getMobileName = async () => {
        try {
          const mobileName = await DeviceInfo.getDeviceName();
          console.log(mobileName)
          setDeviceName(mobileName)
        } catch (error) {
          console.log(error);
        }
      };
      getMobileName();


    const handleBarcodeRead = (barcode) => {
        setBarcodeData(barcode.data);
        setVerification(true)
       
    };

    const startVerification = () => {
        AsyncStorage.setItem("qrCode", JSON.stringify(barcodeData))
        .then(() => {
            console.log('Data saved successfully', 'Yes');
            mobileFunction()
            navigation.navigate('Biometric')
          
        })
        
    };

    useEffect(() => {
        locaLdata()
    }, [])


    const locaLdata = async () => {
        try {
          const value = await AsyncStorage.getItem("user");
          if (value) {
            const data = JSON.parse(value);
            const token = data.access;
            console.log(token,'token')
            setUserToken(token);
        } else {
            console.log("Value not found in local storage");
          }
        } catch (error) {
          console.log("Error retrieving data:", error);
        }
      };

    const mobileFunction = (token) => {
        const headers = {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          };
          const data = {
            mobile_name: deviceName,
          };
          axios
            .post(profileUpdateUrl, data, { headers })
            .then((response) => {
              console.log(response)
              navigate("/qrcode");
            })
            .catch((error) => {
              console.log(error);
            });
    }

    return (
        <Container>
            <TouchableOpacity onPress={() => navigation.navigate('Biometric')}>
                <Logo />
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <RNCamera
                    style={{ width: 300, marginTop: 50, justifyContent: 'center', height: 250 }}
                    onBarCodeRead={handleBarcodeRead}
                />
            </View>

            <View style={styles.textView}>
                <Text style={styles.text}>
                    Scan the QR code shown
                    on the screen
                </Text>
                {!verification ?
                    <Button mode="contained" disabled={verification} style={[
                        styles.button,
                        { backgroundColor: theme.colors.secondary }
                    ]}>
                        Waiting...
                    </Button>
                    :
                    <Button mode="contained" style={[
                        styles.button,
                    ]} onPress={startVerification}>
                        Verify QR
                    </Button>
                }
            </View>
        </Container>
    )
}


const styles = StyleSheet.create({
    textView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        width: '80%',
        marginLeft: 20
    },
    text: {
        textAlign: 'center',
        color: '#202020',
        fontWeight: '500',
        fontSize: 18,
        marginVertical: 10,
    },
    waitingView: {
        backgroundColor: 'red'
    }


})


export default ScaningView

