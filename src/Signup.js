import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Background from './Background'
import Field from './Field'
import { green } from './Constant'
import Btn from './Btn'

const Signup = (props) => {
    return (
        <Background>
            <View style={{ alignItems: 'center', width: 400 }}>
                <Text style={{ fontSize: 30, marginTop: 30, color: "white" }}>Sign Up</Text>
                <View style={{
                    backgroundColor: 'white', height: 760,
                    width: 400, borderTopLeftRadius: 120,
                    paddingTop: 50, alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 40, color: 'darkblue', fontWeight: 'bold' }}>Register</Text>
                    <Text style={{ fontSize: 20, marginBottom: 30, color: 'black', fontWeight: 'bold' }}>Create a new account</Text>
                    <Field placeholder="Enter Email" keyboardType={"email-address"}></Field>
                    <Field placeholder="Enter Username"></Field>
                    <Field placeholder="Enter Password" secureTextEntry={true}></Field>
                    <Field placeholder="Confirm Password" secureTextEntry={true}></Field>
                    <View
                        style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '78%',
                        paddingRight: 16
                        }}>
                        <Text style={{color: 'grey', fontSize: 16}}>
                        By signing in, you agree to our{' '}
                        </Text>
                        <Text style={{color: 'blue', fontWeight: 'bold', fontSize: 14}}>
                        Terms & Conditions
                        </Text>
                    </View>
                    <Btn textColor='white' bgColor={green} btnLabel="Signup" Press={() => alert("Logged In")} />
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Already have account </Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
                            <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 16 }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Background>
    )
}

export default Signup