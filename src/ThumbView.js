import { View, StyleSheet, Image, Text } from 'react-native'
import React from 'react'
import Container from './Container'
import BackButton from './BackButton'
import Logo from './Logo'

const ThumbView = ({navigation  }) => {
  return (
    <Container>
        <BackButton goBack={navigation.goBack} />
        <Logo />
        <View>
            <View style={[styles.imageView]}>
                <Image source={require('./assets/thumb.png')} style={styles.images} />
            </View>
            <View style={[styles.textView]}>
                <Text style={[styles.text]}>
                Place your thumb & verify your identity
                through fingerprint scanning for biometrics
                </Text>
            </View>
        </View>
    </Container>
  )
}

const styles = StyleSheet.create({
    images: {
        width: '50%',
        marginHorizontal:'auto',
        marginVertical:'auto',
        marginBottom: 8,
        height:150,
        resizeMode: 'stretch'
      },
      imageView:{
        marginHorizontal:'auto',
        width:'100%',
        marginTop:180,
        alignItems:'center',
      },
      
      textView:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30,
        
    },
    text:{
        textAlign: 'center',
        color:'#202020',
        fontWeight:500,
        fontSize: 18,
        marginVertical:10,

    },
})

export default ThumbView