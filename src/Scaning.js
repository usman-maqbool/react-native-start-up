import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Container from './Container'
import Logo from './Logo'
import { RNCamera } from 'react-native-camera';
import Button from './Button';
import { theme } from './Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScaningView = ({ navigation }) => {
    const [barcodeData, setBarcodeData] = useState('');
    const [verification, setVerification] = useState(false)

    const handleBarcodeRead = (barcode) => {
        setBarcodeData(barcode.data);
        setVerification(true)
       
    };

    const startVerification = () => {
        AsyncStorage.setItem("qrCode", JSON.stringify(barcodeData))
        .then(() => {
            console.log('Data saved successfully', 'Yes');
            navigation.navigate('Biometric')
          
        })
        
    };

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

