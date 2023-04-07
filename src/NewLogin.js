import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import {useState} from 'react'
import { theme } from './Theme'

import NewBack from './NewBack'
import Background from './Background'
import Logo from './Logo'
import Button from './Button'
import Header from './Header'
import TextInputView from './TextInput'
import BackButton from './BackButton'
import { emailValidator } from './emailValidator'
import { passwordValidator } from './passwordValidator'


const NewLogin = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }
  return (
    <NewBack>
    <BackButton goBack={navigation.goBack} />
    <Logo />
    <Header>Welcome back.</Header>
    <TextInputView
      label="Email"
      returnKeyType="next"
      value={email.value}
      onChangeText={(text) => setEmail({ value: text, error: '' })}
      error={!!email.error}
      errorText={email.error}
      autoCapitalize="none"
      autoCompleteType="email"
      textContentType="emailAddress"
      keyboardType="email-address"
    />
    <TextInputView
      label="Password"
      returnKeyType="done"
      value={password.value}
      onChangeText={(text) => setPassword({ value: text, error: '' })}
      error={!!password.error}
      errorText={password.error}
      secureTextEntry
    />
    <View style={styles.forgotPassword}>
      <TouchableOpacity
        // onPress={() => navigation.navigate('ResetPasswordScreen')}
      >
        <Text style={styles.forgot}>Forgot your password?</Text>
      </TouchableOpacity>
    </View>
    <Button mode="contained" onPress={onLoginPressed}>
      Login
    </Button>
    <View style={styles.row}>
      <Text>Don’t have an account? </Text>
      <TouchableOpacity onPress={() => navigation.replace('NewSignup')}>
        <Text style={styles.link}>Sign up</Text>
      </TouchableOpacity>
    </View>
  </NewBack>
  )
}


const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
export default NewLogin