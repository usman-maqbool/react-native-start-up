import React from 'react'
import { Image, View, StyleSheet } from 'react-native'

export default function Logo() {
    return(
      <View style={[styles.logo]}>
        <Image source={require('./assets/zero_logo.png')} style={styles.image} />
      </View>
    )
  }

const styles = StyleSheet.create({
  image: {
    marginHorizontal:'auto',
    height: 100,
    marginBottom: 8,
    resizeMode: 'stretch'
  },
  logo:{
    marginHorizontal:'auto',
    width:'100%',
    alignItems:'center',
  }
})
