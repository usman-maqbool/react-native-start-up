import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Container from './Container'
import Logo from './Logo'
import { RNCamera } from 'react-native-camera';

const ScaningView = ({ navigation }) => {
    const [barcodeData, setBarcodeData] = useState('');

    const handleBarcodeRead = (barcode) => {
      setBarcodeData(barcode.data);
    };
    return (
        <Container>
           <TouchableOpacity  onPress={() => navigation.navigate('Biometric')}>
                <Logo />
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <RNCamera
                    style={{ width: 300, marginTop: 50, justifyContent: 'center', height: 250 }}
                    onBarCodeRead={handleBarcodeRead}
                />
                <Text>{barcodeData}</Text>
                </View>
        </Container>
    )
}


export default ScaningView

