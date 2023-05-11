import React, { useState } from 'react';
import { View, Text, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

const NewFile = ( {navigation} ) => {

    const [inputValue, setInputValue] = useState('');

    const handlePress = () => {
      Keyboard.dismiss(); // dismisses the keyboard
      navigation.navigate('Home')
    };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Enter value"
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />
      <TouchableOpacity onPress={handlePress} style={{ backgroundColor: 'blue', padding: 10 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Submit</Text>
      </TouchableOpacity>
    </View>
  </TouchableWithoutFeedback>
  )
}

export default NewFile