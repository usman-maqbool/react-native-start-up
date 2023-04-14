import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { theme } from './Theme'
import Button from './Button'
import Logo from './Logo'
import TextInputView from './TextInput'
import { emailValidator } from './emailValidator'
import { passwordValidator } from './passwordValidator'
import Container from './Container'
import PasswordInput from './PasswordInput'

export default function Registration({ navigation }) {

    const [email, setEmail] = useState({ value: '345634', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const onLoginPressed = () => {
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        }
        navigation.reset({
            index: 0,
            routes: [{ name: 'Scaning' }],
        })
    }

    return (
        <Container>
            <View style={{paddingHorizontal:10, marginVertical:10}}>
                <TouchableOpacity  onPress={() => navigation.navigate('Home')}>
                    <Logo />
                </TouchableOpacity>      
                <View style={{ marginTop: 30 }}>
                    <Text style={[styles.header]}>
                        Sign in
                    </Text>
                </View>
                <TextInputView
                    label="Student ID"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={(text) => setEmail({ value: text, error: '' })}
                    error={!!email.error}
                    errorText={email.error}
                    autoCapitalize="none"
                    autoCompleteType="numeric"
                    keyboardType="numeric"
                    icon='check-circle'
                />
                <PasswordInput
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={(text) => setPassword({ value: text, error: '' })}
                    error={!!password.error}
                    errorText={password.error}
                />
                <View style={styles.row}>
                    <TouchableOpacity>
                        <Text style={styles.forgot}>Can’t sign in?</Text>
                    </TouchableOpacity>
                    <Button mode="contained" style={[
                        styles.button,
                    ]} onPress={onLoginPressed}>
                        Sign In
                    </Button>
                </View>
                <View>
                    <Text style={[styles.text]}>Protected by reCAPTCHA and subject to the
                        <Text style={[styles.touchLink]}> Zero Cheating Privacy Policy</Text>
                        &nbsp; and &nbsp;
                        <Text style={[styles.touchLink]}> Terms of Service</Text>
                    </Text>
                </View>
                <View style={{ borderBottomColor: '#DCDBDD', marginTop: 20, borderBottomWidth: 1 }} />
                    <View style={[styles.rowFlex]}>
                        <View>
                            <Image source={require('./assets/link.png')} style={styles.image} />
                        </View>
                        <View>
                            <Text style={[styles.connect]}>Connected to Web app </Text>
                            <Text style={[styles.user]}> Andrew's MacBook Air </Text>
                        </View>
                    </View>
                <View>
                    <Text style={[styles.text]}>
                        Make sure your mobile device is connected to 
                        the web app, Your verification will only proceed if 
                        connected to the web app
                    </Text>
                </View>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    connect: {
        fontSize: 18,
        fontWeight: 700,
        color: 'black',
        marginHorizontal: 15,
        textDecorationLine: 'underline',
    },
    user: {
        fontSize: 16,
        fontWeight: 500,
        color: 'black',
        marginHorizontal: 15,
        marginTop: 6,
    },
    image: {
        width: 30,
        marginHorizontal: 'auto',
        height: 15,
        marginBottom: 16,
        resizeMode: 'stretch'
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowFlex: {
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
    },
    forgot: {
        marginEnd: 40,
        fontSize: 15,
        color: '#47464A',
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    button: {
        flex: 1,
        width: '100%',
        marginVertical: 10,
        borderRadius: 10,
        fontSize: 15,
        backgroundColor:theme.colors.scndPrimary
    },
    touchLink: {
        color: theme.colors.primary,
        fontWeight: '600',
        fontSize: 16,
        alignSelf: 'flex-end',
    },
    text: {
        flexDirection: 'row',
        fontSize: 14,
        marginTop: 10,
        color:theme.colors.textColor
    },
    header: {
        fontSize: 36,
        color: '#202020',
        fontWeight: 600,
    }
})

