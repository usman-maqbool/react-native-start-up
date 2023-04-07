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


const ScaningView = ({navigation}) => {

    const [text, setText] = useState('ZeroCheting cam 1.0 HD Wide')
    
    
    return (
        <NewBack>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <View>
                <Text>I am going to right this </Text>
                <Text>But I don't know how to</Text>
            </View>
            <TextInputView
                label="Installed Camera"
                returnKeyType="done"
                value={text}
                onChangeText={(e) => setText({ value: text })}
                // error={!!email.error}
                // errorText={email.error}
                autoCapitalize="none"
            />
        </NewBack>
    )
}



const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
})



export default ScaningView

