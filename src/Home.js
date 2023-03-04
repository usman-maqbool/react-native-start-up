import { View, Text, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import Background from './Background'
import Btn from './Btn'
import { red, green } from './Constant'

const Home = (props) => {
  return (
    <Background>
      <View style={{marginHorizontal:40, marginVertical:50}}>
        <Text style={{color:'white', marginBottom:50, fontSize:40}}>Let's Start Coding</Text>
        {/* <TouchableOpacity btnLabel="Login"/> */}
        <Btn bgColor="#3F66A2" title="Login" textColor='white' btnLabel="Login" Press={()=> props.navigation.navigate("Login")}/>
        <Btn bgColor='white' title="Login" textColor='#3F66A2' btnLabel="SignUp" Press={()=> props.navigation.navigate("Sigup")}/>
      </View>

    </Background>
  )
}
 
export default Home