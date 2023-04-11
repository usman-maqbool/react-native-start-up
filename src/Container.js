import React from 'react'
import { ImageBackground, Dimensions, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { theme } from './Theme'

const windowHeight = Dimensions.get('window').height;


export default function Container({ children }) {
  return (
    <ImageBackground
      source={require('./assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
    
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    height: windowHeight * 0.5,
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
})
