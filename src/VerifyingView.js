import { View, Image, StyleSheet, Text } from 'react-native'
import React from 'react'
import { create } from 'react-test-renderer'
import Container from './Container'
import Logo from './Logo'
import Button from './Button'
import { theme } from './Theme'

export default function VerifyingView({ navigation }) {
    return (
        <Container>
            <Logo />
            <View>
                <View style={[styles.imageView]}>
                    <Image source={require('./assets/container.png')} style={styles.images} />
                </View>
                <View style={[styles.textView]}>
                    <Text style={[styles.text]}>
                        Ensure that your face is positioned
                        at the center of the shutter lines.
                    </Text>
                    <Button mode="contained" style={[
                        styles.button,
                    ]}
                        onPress={() => navigation.navigate('DashboardView')}>
                        Start Verification
                    </Button>
                    <Text style={[styles.textVerifying]}>
                        Trouble verifying?<Text style={[styles.touchText]}>  &nbsp; Reach out to facility</Text>
                    </Text>
                </View>
            </View>
        </Container>
    )
}
const styles = StyleSheet.create({
    images: {
        width: '100%',
        marginHorizontal: 'auto',
        height: 350,
        marginBottom: 8,
        resizeMode: 'stretch'
    },
    logoView: {
        marginHorizontal: 'auto',
        width: '100%',
        alignItems: 'center',
    },
    textView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,

    },
    textVerifying: {
        color: '#202020',
        fontWeight: 500,
        fontSize: 16,
        marginVertical: 10,
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
        marginVertical: 10,
        borderRadius: 10,
        fontSize: 15,
    },
    touchText: {
        color: theme.colors.primary,

    }
})