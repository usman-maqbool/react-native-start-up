import { View, Text,  StyleSheet, ToastAndroid,
    Keyboard, TouchableWithoutFeedback} from 'react-native'
import React, { useState, useEffect } from 'react'
import Logo from './Logo'
import TextInputView from './TextInput'
import { emailValidator } from './emailValidator'
import { passwordValidator } from './passwordValidator'
import PasswordInput from './PasswordInput'
import axios from 'axios'
import { baseUrl } from './Configuration'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown' 
import ArrowIcon from 'react-native-vector-icons/FontAwesome';
import { theme } from './Theme'
import DropDownPicker from 'react-native-dropdown-picker'

const SignUp = () => {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [loading, setLoading] = useState(false)
    const [selectedUniversity, setelectedUniversity] = useState('');
    const [universityData, setUniversityData] = useState([])
    const [university, setUniversity] = useState(false);
    
    const [isClass, setIsClass] = useState(false)
    const [recievedClass, setRecievedClass] = useState([])
    const [selectedClass, setSelectedClass] = useState('');



    useEffect(() => {
        fetchUniversity()
    }, [])

    const fetchUniversity = async () => {
        try {
            setLoading(false);
            const fetchUniUrl = `${baseUrl}/university`;
            const response = await axios.get(fetchUniUrl, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (response.status === 200) {
                console.log(response.data);
                dataArray = response.data.map((univ => ({label:univ.university_name, value:univ.university_name})))
                setUniversityData(dataArray)
                // console.log(value, "RREEEEEEEEEEE")

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleUniversitySelection = async (selectedUniversity) => {
        // setLoading(true)
        try {
        //   setLoading(false);
          const fetchClassUrl = `${baseUrl}/class?university_name=${selectedUniversity.value}`;
          const response = await axios.get(fetchClassUrl, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.status === 200) {
            console.log(response.data);
            const classArray = response.data.map((cla) => ({label:cla.class_name, value:cla.class_name}));
            setRecievedClass(classArray)
            // setLoading(false)
          }
        //   setLoading(true);
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle error state or display an error message
        }
    };


    const onLoginPressed = () => {
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        }
        setLoading(true)
        const headers = {
            'Content-Type': 'application/json',
        };
        const data = {
            "username": email.value,
            "password": password.value,
        };
        const loginUrl = `${baseUrl}/api/accounts/login/`
        axios.post(loginUrl, data, { headers })
            .then((response) => {
                if (response.status === 200) {
                    const data = response.data
                    AsyncStorage.setItem("user", JSON.stringify(data))
                    .then(() => {
                        navigation.navigate('Scaning');
                        console.log('Data Saved Successfully')
                        setLoading(false);
                    })
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 404 || error.response && error.response.status === 500) {
                    ToastAndroid.show("Oops! Something went wrong on our end. Our team has been notified and is frantically working to fix the issue.", ToastAndroid.LONG);
                } else {
                    ToastAndroid.show('Incorrect usernaem or password!', ToastAndroid.SHORT);
                }
                setLoading(false)
            });
        Keyboard.dismiss();
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.containerView]}>
                    <View style={{alignItems:'center'}}>                    
                        <Logo />
                    </View>
                    
                    <View style={{ marginTop: 20, alignItems:'flex-start', marginBottom: 30 }}>
                        <Text style={[styles.header,]}>
                            Sign Up
                        </Text>
                    </View>
                    <View style={{ width:'100%'}}>
                        <View style={{marginBottom:10}}>
                            <TextInputView 
                                autoFocus={true}
                                label="Student ID"
                                returnKeyType="next"
                                value={email.value}
                                onChangeText={(text) => setEmail({ value: text, error: '' })}
                                error={!!email.error}
                                errorText={email.error}
                                autoCapitalize="none"
                                autoCompleteType="off"
                                keyboardType="ascii-capable"
                                icon='check-circle'
                            />
                        </View>
                       <View>
                       <PasswordInput
                            returnKeyType="done"
                            value={password.value}
                            onChangeText={(text) => setPassword({ value: text, error: '' })}
                            error={!!password.error}
                            errorText={password.error}
                        />
                       </View>
                       <View>
                        <Text style={{color:'red'}}>{selectedUniversity}</Text>
                       <DropDownPicker
                            items={universityData}
                            open={university}
                            value={selectedUniversity}
                            setOpen={setUniversity}
                            // setValue={(value)=> setValue(value)}
                            setValue={setelectedUniversity}
                            setItems={setUniversityData}
                            onSelectItem={handleUniversitySelection}
                            
                            dropDownContainerStyle={{
                                backgroundColor:'white',
                                position:'absolute'
                            }}
                            dropDownDirection='BOTTOM'
                            />
                       </View>
                       <View style={{marginTop:80}}>
                        <Text style={{color:'red'}}>{selectedUniversity}</Text>
                       <DropDownPicker
                            items={recievedClass}
                            open={isClass}
                            value={selectedClass}
                            setOpen={setIsClass}
                            // setValue={(value)=> setValue(value)}
                            setValue={setSelectedClass}
                            setItems={setRecievedClass}
                            dropDownDirection='BOTTOM'
                            />
                       </View>
                       {/* <View style={{ width: '100%', marginVertical: 15 }}>
                            <Text style={{ fontSize: 16, marginBottom: 5, color:theme.colors.active, alignSelf: 'flex-start' }}>University:</Text>
                            <SelectDropdown
                            data={university}
                            // onSelect={(selectedUniversity) => setelectedUniversity(selectedUniversity)}
                            onSelect={handleUniversitySelection}
                            defaultButtonText={
                                <>
                                <Text>
                                    Select University {'                                    '}
                                </Text>
                                    <ArrowIcon  name="angle-down" size={20} color='black' />
                                </>
                              }
                            buttonStyle={{ borderRadius: 8,  width: '100%' }}
                            buttonTextStyle={{ fontSize: 16, alignItems:'flex-start', alignContent:'flex-start' }}
                            dropdownStyle={{ borderRadius: 8, width: '90%' }}
                            />
                        </View>
                        <View style={{width:'100%', marginVertical:15}}>
                            <SelectDropdown
                                data={recievedClass}
                                onSelect={(selectedClass) => setSelectedClass(selectedClass)}
                                // onSelect={LogoutPress}
                                defaultButtonText={<>
                                <Text>
                                    Select Class {'                                         '}
                                </Text>
                                    <ArrowIcon  name="angle-down" size={20} color='black' />
                                </>}
                                buttonStyle={{ borderRadius: 8, width:'100%' }}
                                buttonTextStyle={{ fontSize: 16 }}
                                dropdownStyle={{ borderRadius: 8, width:'90%' }}
                            />
                        </View> */}
                       
                    </View>
                </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 36,
        color: '#202020',
        fontWeight: 600,
    },
    containerView: {
        // alignSelf: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        width: '100%',
        height:'100%',
    },
    container: {
        paddingTop: 40,
        alignItems: "center"
      },
    dropDownStyle:{
        width:'100%',
      }
})

export default SignUp