import React from 'react'
import NewBack from './NewBack'
import Logo from './Logo'
import Header from './Header'
import Paragraph from './Paragraph'
import Button from './Button'

export default function Dashboard({ navigation }) {
  return (
    <NewBack>
      <Logo />
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        }
      >
        Logout
      </Button>
    </NewBack>
  )
}
