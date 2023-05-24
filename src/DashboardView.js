import { View, StyleSheet, ActivityIndicator, Image, Modal, TouchableOpacity, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import Container from './Container'
import Logo from './Logo'
import Icon from 'react-native-vector-icons/FontAwesome';
import IconReload from 'react-native-vector-icons/Ionicons';
import { theme } from './Theme'
import { Card } from 'react-native-paper';
import Button from './Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from './Configuration';
import axios from 'axios';

const DashboardView = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [authToken, setAuthToken] = useState('')
    const [sessionData, setSessionData] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        locaLdata()
    }, [])


    const locaLdata = async () => {
        try {
          const value = await AsyncStorage.getItem("user");
          if (value) {
            const data = JSON.parse(value);
            const token = data.access;
            fetchData(token);
          } else {
            console.log("Value not found in local storage");
          }
        } catch (error) {
          console.log("Error retrieving data:", error);
        }
      };
      

    const fetchData = async (token) => {
        setLoading(false)
        const fetchSession = `${baseUrl}/superadmin/exam_sessions`;
        console.log(fetchSession, 'Url log')
        const response = await axios.get(fetchSession, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        
        if (response.status === 200) {
            console.log(response.data, 'Data')
            const session = response.data[0];
            setSessionData(session);
            console.log(session, 'Dashboard SeSsion');
            setLoading(true)
        }
    }

    const formattedDateTime = (time) => {
        const dateTime = new Date(time);
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
        };
        
        return dateTime.toLocaleString(undefined, options);
      };
      
      const originalTime = sessionData ? sessionData.start_date : null;
      const formattedTime = formattedDateTime(originalTime);

      const [remainingTime, setRemainingTime] = useState('');

      useEffect(() => {
        const sessionTime = sessionData ? sessionData.start_date : null;
        let countdownDate = null;
        
        if (sessionTime) {
          countdownDate = new Date(sessionTime).getTime();
        }
      
        const updateCountdown = () => {
          const now = new Date().getTime();
          
          if (countdownDate && countdownDate > now) {
            const distance = countdownDate - now;
            console.log(distance, 'distance')
      
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
      
            setRemainingTime(
              ` ${hours} : ${minutes} : ${seconds} `
            );
          } else if (countdownDate) {
            setModalVisible(true);
            clearInterval(intervalId);
          }
          else{
            setRemainingTime('00:00:00')
          }
        };
      
        updateCountdown(); // Run immediately when the component mounts
      
        const intervalId = setInterval(updateCountdown, 1000);
      
        return () => {
          clearInterval(intervalId);
        };
      }, [originalTime]);
      
    
    const handleModalClose = () => {
        setModalVisible(false)
        navigation.navigate('Registration')
    }

    return (
        <Container>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Logo />
            </TouchableOpacity>
            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={[styles.modalText, { color: theme.colors.primary }]}>Congratulations!  {'\u{1F389}'}</Text>
                            <Text style={styles.modalText}>Your verification has been successfully completed. Please proceed to the Zero Cheating desktop app.</Text>

                            <Button mode="contained" style={[
                                styles.button,
                            ]}
                                onPress={handleModalClose}
                            >
                                Cloose
                            </Button>
                        </View>
                    </View>
                </Modal>
            </View>
            { !modalVisible ? 
            <View>
                {/* { loading  ? 
                <View style={{justifyContent:"center", alignItems:"center", marginTop:8}}>
                   <TouchableOpacity
                        style={[styles.buttonReload, { width: '50%' }]}
                        onPress={locaLdata}
                        >
                        <View style={styles.buttonContent}>
                            <IconReload name="ios-reload-circle" size={30} color="white" />
                            <Text style={styles.buttonText}>Reload</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                    : 
                    <View style={{alignItems:'center', justifyContent:'center'}}>
                        <View style={{ backgroundColor: theme.colors.primary,  marginTop: 10, borderRadius: 10, width: '50%' }}>
                            <ActivityIndicator style={{ marginRight: 20, marginTop: 7, paddingBottom: 5 }} size="large" color="white" />
                        </View> 
                    </View>
                        } */}
            </View> : null }
            { sessionData ?
                <View>
                    { !modalVisible ? 
                    <>
                         <View style={[styles.textView]}>
                        <Text style={[styles.text]}>
                            Your exam will start in
                        </Text>
                        <Text style={[styles.textTimer]}>
                            {/* 00:00:{countdown} */}
                            {remainingTime}

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
                    </View>
                    <View style={styles.cardView}>
                        <Card style={styles.card}>
                            <View style={{ padding: 10, flexDirection: 'row' }}>
                                <Image source={require('./assets/exam.png')} style={{ width: 70, height: 60, marginTop: 10 }} />
                                <View style={styles.cardTextView}>
                                    <Text style={ styles.sessionText}>{sessionData ? sessionData.teacher_name : null}</Text>
                                    <Text style={[ styles.sessionText, {fontWeight: '700'} ]}>{sessionData ? sessionData.subject_name : null}</Text>
                                    <Text style={ styles.sessionText}>Start {sessionData ? formattedTime : null}</Text>
                                </View>
                            </View>
                        </Card>
                    </View>
                    <View style={[styles.iconButton]}>
                    </View>
                    </> : null
                    }
                   
                </View>
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('./assets/noData.png')} style={{ width: 350, height: 400, resizeMode: 'contain' }} />
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.secondary, marginTop: 10, borderRadius: 10, width: '56%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <ActivityIndicator style={{ marginRight: 10, marginTop: 8, paddingBottom: 5 }} size="large" color="white" />
                            <Text style={{ color: 'white', fontWeight: 600, fontSize: 20 }}>Waiting</Text>
                        </View>
                    </View>

                </View>
            }
        </Container>
    )
}

const styles = StyleSheet.create({
    textView: {
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 18,
        color: '#202020',
        fontWeight: 600,
    },
    textTimer: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 50,
        color: '#202020',
        fontWeight: 500,
    },
    listView: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 30
    },
    listRow: {
        flexDirection: 'row',
        marginVertical: 10
    },
    listText: {
        marginLeft: 18,
        fontSize: 18,
        color: '#000000',
        fontWeight: 700,
    },
    iconButton: {
        alignItems: 'center',
        marginTop: 90,
    },
    touchText: {
        backgroundColor: theme.colors.secondary,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '50%',
        paddingVertical: 15,
        borderRadius: 20
    },
    buttonText: {
        marginLeft: 15,
        color: 'white',
        fontSize: 20,
        fontWeight: 500
    },
    cardView: {
        marginTop: 30,
        backgroundColor: 'white',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTextView: {
        marginLeft: 20,
        paddingRight:70
        // justifyContent:'center',
        // alignItems:'center',
    },
    card: {
        width: '99%',
        backgroundColor: 'white'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        height: 220
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'left',
        color: "black",
        fontWeight: '500',
        fontSize: 18,

    },
    noDataImage: {
        width: '100%',
        height: 500,
        marginRight: 120,
        resizeMode: 'contain'
    },
    sessionText:{
        color: 'black',
        marginTop: 5,
        fontSize: 15,
        fontWeight: '500'
    },
    buttonReload: {
        width: '50%',
        justifyContent:'center',
        borderRadius: 10,
        height:50,
        fontSize: 15,
        backgroundColor: theme.colors.primary
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'white',
        marginLeft: 5,
      },
})

export default DashboardView