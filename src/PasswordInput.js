import { View, Text, StyleSheet } from 'react-native'
// import React, {useState} from 'react'
import {TextInput} from 'react-native-paper'
import { useState } from 'react'
import { theme } from './Theme'

export default function PasswordInput({errorText,  description, ...props}) {

    const [isPasswordVisible, setIsPasswordVisible] = useState(true)
    const [isFocused, setIsFocused] = useState(false);

    const IconPress=() => {
        setIsPasswordVisible(!isPasswordVisible)
        setIsFocused(!isFocused)
    }

    return (
        <View>
            <TextInput style={{backgroundColor:'white'}}
                label='password'
                secureTextEntry={isPasswordVisible}
                right={
                    <TextInput.Icon
                        icon={isPasswordVisible ? 'eye':'eye-off'}
                        color={(isTextInputFocused) => (isTextInputFocused ? theme.colors.active : undefined)}
                        onPress={IconPress}   
                    />
                }
                theme={{
                    colors:{
                    primary: theme.colors.active,
                    label:'black'
                    }
                }}
                {...props}    
            />
            {description && !errorText ? (
                <Text style={styles.description}>{description}</Text>
            ) : null}
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 12,
      },
      description: {
        fontSize: 13,
        color: theme.colors.secondary,
        paddingTop: 8,
      },
      error: {
        fontSize: 13,
        color: theme.colors.error,
        paddingTop: 8,
      },
})