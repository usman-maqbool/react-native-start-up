import { TextInput, Text } from 'react-native'
import React from 'react'

const Field = props => {
  return (
    <TextInput
    {...props}
    style={{
        marginTop:10,
        borderRadius:100,
        color:'blue',
        paddingHorizontal:10,
        width:'80%',
        backgroundColor:"rgb(220, 220, 220)",
        marginVertical:10
    }} placeholderTextColor='blue'>

    </TextInput>
  )
}

export default Field