import React from 'react'
import {ScrollView, StyleSheet } from 'react-native'

export default function Container({ children }) {
  return (
    <ScrollView style={[styles.scroll]}>
          {children}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  
  scroll:{
    backgroundColor:'white',
    paddingHorizontal: 20,
    alignSelf: 'center',
    width:'100%',
  },
})
