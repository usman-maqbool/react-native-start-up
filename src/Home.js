// import { View, Text, Button, TouchableOpacity } from 'react-native'
// import React from 'react'
// import Background from './Background'
// import Btn from './Btn'
// import { red, green } from './Constant'

// const Home = (props) => {
//   return (
//     <Background>
//       <View style={{marginHorizontal:40, marginVertical:50}}>
//         <Text style={{color:'white', marginBottom:50, fontSize:40}}>Let's Start Coding</Text>
//         {/* <TouchableOpacity btnLabel="Login"/> */}
//         <Btn bgColor="#3F66A2" title="Login" textColor='white' btnLabel="Login" Press={()=> props.navigation.navigate("Login")}/>
//         <Btn bgColor='white' title="Login" textColor='#3F66A2' btnLabel="SignUp" Press={()=> props.navigation.navigate("Sigup")}/>
//         <Btn bgColor='white' title="Login" textColor='#3F66A2' btnLabel="New Login" Press={()=> props.navigation.navigate("NewLogin")}/>
//       </View>

//     </Background>
//   )
// }
 
// export default Home



import React from 'react'
import NewBack from './NewBack'
import Logo from './Logo'
import Header from './Header'
import Button from './Button'
import Paragraph from './Paragraph'
import Registration from './Registration'

export default function Home({ navigation }) {
  return (
    <NewBack>
      <Logo />
      {/* <Header>Login Template</Header> */}
      <Paragraph>
       Welcome to Zero Cheating. Please Login to access your account, or if you don’t have any account then Sign Up.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('NewLogin')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('NewSignup')}
      >
        Sign Up
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Registration')}
      >
        Registration
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Scaning')}
      >
        Scaning
      </Button>
    </NewBack>
  )
}
