import { View, StyleSheet, Image, Modal, TouchableOpacity, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import Container from './Container'
import Logo from './Logo'
import IconSpin from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from './Theme'
import { Avatar, Button, Card} from 'react-native-paper';

const DashboardView = ({navigation}) => {
    const [countdown, setCountdown] = useState(20); // Initial countdown value in seconds
    const [modalVisible, setModalVisible] = useState(false);

    let timer;

    useEffect(() => {
        timer = setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown === 1) {
              clearInterval(timer); // Stop the timer
              handleCountdownComplete(); // Perform action when countdown is complete
            }
            return prevCountdown - 1; // Decrease countdown by 1 every second
          });
        }, 1000);
    
        return () => clearInterval(timer); // Clean up the timer when the component unmounts
      }, []);
    
      const handleCountdownComplete = () => {
        // Perform necessary actions when countdown is complete
        console.log('Countdown complete!');
        setModalVisible(true)
        // ... your code here
      };


    return (
        <Container>
             <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                 <Logo /> 
                 </TouchableOpacity>


                 <Modal
                        animationType="fade"
                        transparent={true}
                        visible={!modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
              <View style={styles.centeredView}>
                        <Text>I am text View</Text>
              </View>
            </Modal>









            <View>
                <View style={[styles.textView]}>
                    <Text style={[styles.text]}>
                        Your exam will start in
                    </Text>
                    <Text style={[styles.textTimer]}>
                        00:00:{countdown}
                        
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
                    {/* <View style={[styles.listRow]}>
                        <Icon name="check-circle" size={28} color={theme.colors.primary} />
                        <Text style={[styles.listText]}>Scan your student ID</Text>
                    </View> */}
                </View>
                    <View style={styles.cardView}>
                        <Card style={styles.card}>
                            <View style={{padding:10, flexDirection:'row'}}>
                            <Image source={require('./assets/exam.png')} style={{width:70, height:60, marginTop:30}} />
                                <View style={styles.cardTextView}>
                                    <Text style={{color:'black' , marginTop:20, fontSize:15, fontWeight:'500'}}>Jhon Smith</Text>
                                    <Text style={{color:'black' ,  marginTop:5,  fontSize:15, fontWeight:'700'}}>Introduction to Computer</Text>
                                    <Text style={{color:'black' ,  marginTop:5, fontSize:15, fontWeight:'500'}}>Start 19/06/2023/ 22:00</Text>
                                </View>
                            </View>
                        </Card>
                    </View>
                <View style={[styles.iconButton]}>
                    {/* <TouchableOpacity style={[styles.touchText]}
                        onPress={() => navigation.navigate('Registration')}>
                        <IconSpin name="spinner" size={40} color="white" fontWeight="bold" />
                        <Text style={[styles.buttonText]}>Waiting</Text>
                    </TouchableOpacity> */}
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
    },
    cardView:{
        marginTop:30,
        backgroundColor:'white',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    cardTextView:{
        marginLeft: 25,
        // justifyContent:'center',
        // alignItems:'center',
    },
    card:{
        width:'90%',
        backgroundColor:'white'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
})



export default DashboardView