import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native'
import React from 'react'
import Container from './Container'
import Logo from './Logo'

const ThumbView = ({navigation  }) => {
  return (
    <Container>
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
        width:120,
        marginBottom: 80,
        height:120,
        resizeMode: 'stretch'
      },
      imageView:{
        marginHorizontal:'auto',
        width:'100%',
        marginTop:120,
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