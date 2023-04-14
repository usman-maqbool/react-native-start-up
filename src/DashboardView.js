import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import Container from './Container'
import Logo from './Logo'
import IconSpin from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from './Theme'

const DashboardView = ({navigation}) => {

    return (
        <Container>
            <Logo />
            <View>
                <View style={[styles.textView]}>
                    <Text style={[styles.text]}>
                        Your exam will start in
                    </Text>
                    <Text style={[styles.textTimer]}>
                        00:14:00
                    </Text>
                </View>
                <View style={{ borderBottomColor: '#DCDBDD', marginTop: 20, borderBottomWidth: 1 }} />
                <View style={[styles.listView]}>
                    <View style={[styles.listRow]}>
                        <Icon name="check-circle" size={28} color={theme.colors.primary} />
                        <Text style={[styles.listText]}>Facial Verification</Text>
                    </View>
                    <View style={[styles.listRow]}>
                        <Icon name="check-circle" size={28} color={theme.colors.primary} />
                        <Text style={[styles.listText]}>Biometric Verification</Text>
                    </View>
                    <View style={[styles.listRow]}>
                        <Icon name="check-circle" size={28} color={theme.colors.primary} />
                        <Text style={[styles.listText]}>Scan your student ID</Text>
                    </View>
                </View>
                <View style={[styles.iconButton]}>
                    <TouchableOpacity style={[styles.touchText]}
                        onPress={() => navigation.navigate('Registration')}>
                        <IconSpin name="spinner" size={40} color="white" fontWeight="bold" />
                        <Text style={[styles.buttonText]}>Waiting</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Container>
    )
}


const styles = StyleSheet.create({
    textView:{
        alignItems:'center',
    },
    text:{
        textAlign:'center',
        marginTop:30,
        fontSize:18,
        color:'#202020',
        fontWeight:600,
    },
    textTimer:{
        textAlign:'center',
        marginTop:10,
        fontSize:70,
        color:'#202020',
        fontWeight:500, 
    },
    listView:{
        justifyContent:'center',
        alignSelf:'center',
        marginTop:30
    },
    listRow:{
        flexDirection:'row',
        marginVertical:10
    },
    listText:{
        marginLeft:18,
        fontSize:18,
        color:'#000000',
        fontWeight:700,
    },
    iconButton:{
        alignItems:'center',
        marginTop:90,
    },
    touchText:{
        backgroundColor:theme.colors.secondary,
        flexDirection:'row',
        justifyContent:'center',
        width:'50%',
        paddingVertical:15,
        borderRadius:20
    },
    buttonText:{
        marginLeft:15,
        color:'white',
        fontSize:20,
        fontWeight:500
    }
})



export default DashboardView