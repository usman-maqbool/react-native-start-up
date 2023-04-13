import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from './Theme'

export default function TextInputView({ errorText, icon, description, ...props }) {
  const [isFocused, setIsFocused] = useState(false); 
  const handlePress = () => {
    setIsFocused(!isFocused);
  };
  
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        // right={<Input.Icon color='black' size={28} icon={icon} />}
        right={
          <Input.Icon
            icon={icon}
            color={(isTextInputFocused) => (isTextInputFocused ? theme.colors.active : undefined)}
            onPress={handlePress}
            isFocused={false}
          />}
        theme={{
          colors:{
            primary: theme.colors.active,
            label:'black'
          }
        }}
        selectionColor={theme.colors.surface}
        underlineColor=""
        mode="contained"
        {...props}       
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: 'white',
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
})
