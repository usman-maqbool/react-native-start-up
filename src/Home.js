import React from 'react'
import NewBack from './NewBack'
import Logo from './Logo'
import Header from './Header'
import Button from './Button'
import Paragraph from './Paragraph'

export default function Home({ navigation }) {
  return (
    <NewBack>
      <Logo />
      {/* <Header>Login Template</Header> */}
      <Paragraph>
       Welcome to Zero Cheating. Please Login to access your account, or if you don’t have any account then Sign Up.
      </Paragraph>
      {/* <Button
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
      </Button> */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Registration')}
      >
        Registration
      </Button>
      {/* <Button
        mode="outlined"
        onPress={() => navigation.navigate('Scaning')}
      >
        Scaning
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Thumb')}
      >
        Authentication
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Verifying')}
      >
        Verifying
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('DashboardView')}
      >
        Dashboard
      </Button> */}
    </NewBack>
  )
}
