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
       Welcome to Zero Cheating. Please Login to access your account.
      </Paragraph>
       {/* , or if you don’t have any account then Sign Up. */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Registration')}
      >
        Sign In
      </Button>
    </NewBack>
  )
}
