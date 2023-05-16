import React from 'react'
import NewBack from './NewBack'
import Logo from './Logo'
import Button from './Button'
import Paragraph from './Paragraph'

export default function Home({ navigation }) {
  return (
    <NewBack>
      <Logo />
      <Paragraph>
       Welcome to Zero Cheating. Please Login to access your account, or if you don’t have any account then Sign Up.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Registration')}
      >
        Registration
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Verifying')}
      >
        Scan
      </Button>
    </NewBack>
  )
}
