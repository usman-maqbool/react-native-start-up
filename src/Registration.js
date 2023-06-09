import { View, Image, Linking, Text,  StyleSheet, ActivityIndicator, ToastAndroid,
    Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { theme } from './Theme'
import Button from './Button'
import Logo from './Logo'
import TextInputView from './TextInput'
import { emailValidator } from './emailValidator'
import { passwordValidator } from './passwordValidator'
import PasswordInput from './PasswordInput'
import axios from 'axios'
import { baseUrl } from './Configuration'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Registration({ navigation }) {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [loading, setLoading] = useState(false)
    const [pcName, setPcName] = useState('')
    
    const onLoginPressed = () => {
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        }

        setLoading(true)

        const headers = {
            'Content-Type': 'application/json',
        };

        const data = {
            "username": email.value,
            "password": password.value,
        };

        const loginUrl = `${baseUrl}/api/accounts/login/`
        axios.post(loginUrl, data, { headers })
            .then((response) => {
                if (response.status === 200) {
                    const data = response.data
                    AsyncStorage.setItem("user", JSON.stringify(data))
                    .then(() => {
                        navigation.navigate('Scaning');
                        console.log('Data Saved Successfully')
                        setLoading(false);
                    })
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 404 || error.response && error.response.status === 500) {
                    ToastAndroid.show("Oops! Something went wrong on our end. Our team has been notified and is frantically working to fix the issue.", ToastAndroid.LONG);
                } else {
                    ToastAndroid.show('Incorrect usernaem or password!', ToastAndroid.SHORT);
                }
                setLoading(false)
            });
        Keyboard.dismiss();
    };

    useEffect(() => {
        locaLdata()
    }, [])

    const privacyUrl = `${baseUrl}/superadmin/privacy-policy`
    const termsUrl = `${baseUrl}/superadmin/terms-condition`
    const forgetUrl = `${baseUrl}/api/accounts/forget/password`

    const handlePrivacyLink = (privacyUrl) => {
        Linking.openURL(privacyUrl)
          .catch((err) => console.error('Failed to open link:', err));
      };
    const handleTermsUrl = (termsUrl) => {
        Linking.openURL(termsUrl)
          .catch((err) => console.error('Failed to open link:', err));
      };
    const handleForgetUrl = (forgetUrl) => {
        Linking.openURL(forgetUrl)
          .catch((err) => console.error('Failed to open link:', err));
      };

    const locaLdata = async () => {
        try {
          const value = await AsyncStorage.getItem("user");
          if (value) {
            const data = JSON.parse(value);
            const pcDataName = data.user.pc_name
            setPcName(pcDataName)
        } else {
            console.log("Value not found in local storage");
          }
        } catch (error) {
          console.log("Error retrieving data:", error);
        }
      };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.containerView]}>
                <View style={{ paddingHorizontal: 10, marginVertical: 10 }}>
                    <View style={{alignItems:'center'}}>                    
                        <Logo />
                    </View>
                    <View style={{ marginTop: 20, marginBottom: 30 }}>
                        <Text style={[styles.header]}>
                            Sign in
                        </Text>
                    </View>
                    <TextInputView 
                        autoFocus={true}
                        label="Student ID"
                        returnKeyType="next"
                        value={email.value}
                        onChangeText={(text) => setEmail({ value: text, error: '' })}
                        error={!!email.error}
                        errorText={email.error}
                        autoCapitalize="none"
                        autoCompleteType="off"
                        keyboardType="default"
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
                        <TouchableOpacity onPress={() => handleForgetUrl(forgetUrl)}>
                            <Text style={styles.forgot}>Can’t sign in?</Text>
                        </TouchableOpacity>
                        {loading ?
                            <View style={{ backgroundColor: theme.colors.scndPrimary, marginTop: 10, borderRadius: 10, width: '56%' }}>
                                <ActivityIndicator style={{ marginRight: 20, marginTop: 8, paddingBottom: 5 }} size="large" color="white" />
                            </View>
                            :
                            <Button mode="contained" style={[
                                styles.button,
                            ]} onPress={onLoginPressed}>
                                Sign In
                            </Button>
                        }
                    </View>
                    <View style={[ styles.text, {marginTop:30, justifyContent:'space-between'}]}>
                    <TouchableOpacity onPress={() => handlePrivacyLink(privacyUrl)}>
                        <Text style={styles.touchLink}>
                            Privacy Policy
                        </Text>
                    </TouchableOpacity>

                    {/* <Text style={{color:'black'}}>   &nbsp; and &nbsp;   </Text> */}
                    <TouchableOpacity onPress={() => handleTermsUrl(termsUrl)}>
                        <Text style={styles.touchLink}>
                        Terms of Service
                        </Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{ borderBottomColor: '#DCDBDD', marginTop: 20, borderBottomWidth: 1 }} />
                    <View style={[styles.rowFlex]}>
                        <View>
                            <Image source={require('./assets/link.png')} style={styles.image} />
                        </View>
                        <View>
                            <Text style={[styles.connect]}>Connected to Web app </Text>
                            { pcName ? <Text style={[styles.user]}>{pcName} </Text> : '' }
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
            </View>
        </TouchableWithoutFeedback>
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
        marginTop: 50,
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
        backgroundColor: theme.colors.scndPrimary
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
        color: theme.colors.textColor
    },
    header: {
        fontSize: 36,
        color: '#202020',
        fontWeight: 600,
    },
    containerView: {
        alignItems: 'center',
        // alignSelf: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        width: '100%',
        height:'100%',
    }
})

