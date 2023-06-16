import React from 'react'
import { Image, View, StyleSheet } from 'react-native'

import FastImage from 'react-native-fast-image';
import logoImage from './assets/logo_zero.png';

export default function Logo() {
    return(
      <View style={[styles.logo]}>
        <FastImage
          source={logoImage}
          style={{ width: 150, height: 150 }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    )
  }

const styles = StyleSheet.create({
  
  logo:{
    marginHorizontal:'auto',
    width:'100%',
    alignItems:'center',
    marginTop:20
  }
})
