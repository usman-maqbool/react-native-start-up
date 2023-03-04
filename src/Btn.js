import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Btn({ btnLabel, bgColor, textColor, Press} ) {
  return (
<TouchableOpacity 
  
    onPress={Press}
    style={{
      backgroundColor:bgColor,
      borderRadius: 100,
      alignItem:'center',
      marginTop:20,
      width: 250,
      
  }}>
    <Text
        style={{
            color:textColor,
            borderRadius: 100,
            fontWeight:'bold',
            fontSize:20,
            alignItems:'center',
            // width: 350,
            marginLeft:90,
            paddingHorizontal: 5,
            marginVertical: 5
        }}>
             {btnLabel}
    </Text>
    </TouchableOpacity>
  )
}