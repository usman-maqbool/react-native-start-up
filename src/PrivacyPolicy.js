import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Container from './Container'
import Logo from './Logo'
import Button from './Button'
import { theme } from './Theme'


const PrivacyPolicy = ({navigation}) => {
  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Logo />
      </TouchableOpacity>
      <View style={{marginHorizontal:'2%'}}>
            <Text style={[styles.header]}>
                Definition
            </Text>
            <Text style={[styles.paragraph]}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis, beatae eum neque doloribus quaerat voluptas explicabo laborum ex unde id qui non. Eligendi sunt praesentium molestias dicta eos earum natus.
            </Text>
            <Text style={[styles.header]}>
               Term 1
            </Text>
            <Text style={[styles.paragraph]}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis, beatae eum neque doloribus quaerat voluptas explicabo laborum ex unde id qui non. Eligendi sunt praesentium molestias dicta eos earum natus.
            </Text>
            <Text style={[styles.header]}>
                Term 2
            </Text>
            <Text style={[styles.paragraph]}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis, beatae eum neque doloribus quaerat voluptas explicabo laborum ex unde id qui non. Eligendi sunt praesentium molestias dicta eos earum natus.
            </Text>
            <View style={{justifyContent:'center', alignItems:'center'}}>

                <Button mode="contained" style={[
                    styles.button,
                ]} onPress={() => navigation.navigate('Registration')}>
                        Home
                </Button>
            </View>
      </View>

    </Container>
  )
}


const styles = StyleSheet.create({
    header: {
        fontSize: 36,
        color: '#202020',
        fontWeight: 600,
        marginBottom:30,
        
    },
    paragraph: {
        marginHorizontal:10,
        flexDirection: 'row',
        fontSize: 15,
        marginTop: 10,
        color: theme.colors.textColor
    },
    button:{
        width:'50%',
        marginVertical:20,
    }
})


export default PrivacyPolicy