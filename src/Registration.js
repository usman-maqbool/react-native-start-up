import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { theme } from './Theme'
import Button from './Button'
import NewBack from './NewBack'
import BackButton from './BackButton'
import Logo from './Logo'
import TextInputView from './TextInput'
import { emailValidator } from './emailValidator'
import { passwordValidator } from './passwordValidator'
import { Button as PaperButton } from 'react-native-paper'



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
            routes: [{ name: 'Dashboard' }],
        })
    }



    return (
        <NewBack>
            <BackButton goBack={navigation.goBack} />
            
            <Logo />
            <View style={{marginTop:50}}>
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
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                
            />
            <TextInputView
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />
            
            <View style={styles.row}>
            <TouchableOpacity>
                    <Text style={styles.forgot}>Can’t sign in?</Text>
                </TouchableOpacity>
                <PaperButton mode="contained" style={[
                        styles.button,
                       { backgroundColor: theme.colors.primary },
                       
                    ]} onPress={onLoginPressed}>
                    Sign In
                </PaperButton>
            </View>
            <View>
                <Text style={[styles.text]}>Protected by reCAPTCHA and subject to the
                <TouchableOpacity>
                <Text style={[styles.touchLink]}> Zero Cheating Privacy Policy</Text>
                 </TouchableOpacity> and
                 <TouchableOpacity>
                <Text style={[styles.touchLink]}> Terms of Service</Text>
                 </TouchableOpacity> 
                </Text>
            </View>
        </NewBack>
            
    )
}


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 4,
        justifyContent:'space-between',
        alignItems:'center',
    },
    forgot: {
        marginEnd:40,
        fontSize: 15,
        color: theme.colors.secondary,
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
      },
    touchLink:{
        color:theme.colors.primary,
        fontWeight: '600',
        fontSize:16,
        alignSelf: 'flex-end',
    },
    text:{
        flexDirection: 'row',
        fontSize:16,
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop:20
    },
    header:{
        fontSize:36,
        color:'#202020',
        fontWeight:600,
    }

})

