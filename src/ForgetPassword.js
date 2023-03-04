import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Background from './Background'
import Field from './Field'
import { green } from './Constant'

const ForgetPassword = (props) => {
    return (
        <Background>
            <View style={{ alignItems: 'center', width: 400 }}>
                <View style={{
                    backgroundColor: 'white', height: 760,
                    width: 400, borderTopLeftRadius: 120,
                    paddingTop: 50, marginTop: 50, alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 40, color: 'darkblue', fontWeight: 'bold' }}>Forget Password</Text>
                    <Text style={{ fontSize: 15, marginBottom: 30, color: 'black', fontWeight: 'bold' }}>Forget your password</Text>
                    <Field placeholder="Enter Email" keyboardType={"email-address"}></Field>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'green',
                            borderRadius: 100,
                            alignItem: 'center',
                            marginTop: 20,
                            width: 250
                        }}
                    >
                        <Text style={{
                            color: 'white',
                            borderRadius: 100,
                            fontWeight: 'bold',
                            fontSize: 20,
                            alignItems: 'center',
                            // width: 350,
                            marginLeft: 70,
                            paddingHorizontal: 5,
                            marginVertical: 5
                        }}>Send Email</Text>
                    </TouchableOpacity>
                    {/* <Btn textColor='white' bgColor={green} btnLabel="Send Email" Press={() => alert("Email sent")} /> */}
                </View>
            </View>
        </Background>
    )
}

export default ForgetPassword