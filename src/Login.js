import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Background from './Background'
import Field from './Field'
import { green } from './Constant'
import Btn from './Btn'
const Login = (props) => {
    return (
        <Background>
            <View style={{ alignItems: 'center', width: 400 }}>
                <Text style={{ fontSize: 30, marginTop: 30, color: "white" }}>Login</Text>
                <View style={{
                    backgroundColor: 'white', height: 760,
                    width: 400, borderTopLeftRadius: 120,
                    paddingTop: 50, alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 40, color: 'darkblue', fontWeight: 'bold' }}>Welcome Back</Text>
                    <Text style={{ fontSize: 20, marginBottom: 30, color: 'black', fontWeight: 'bold' }}>Login to your account</Text>
                    <Field placeholder="Enter Email" keyboardType={"email-address"}></Field>
                    <Field placeholder="Enter Password" secureTextEntry={true}></Field>
                    <View
                        style={{ alignItems: 'flex-end', width: '78%', paddingRight: 16, marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate("Fgp")}>
                            <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 16 }}>Forget password</Text>
                        </TouchableOpacity>
                    </View>
                    <Btn textColor='white' bgColor={green} btnLabel="Login" Press={() => alert("Logged In")} />
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Don't have an account ? </Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate("Sigup")}>
                            <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Background>
    )
}

export default Login