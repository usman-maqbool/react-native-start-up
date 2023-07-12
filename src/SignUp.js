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
import Button from './Button'

const SignUp = ({navigation}) => {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [loading, setLoading] = useState(false)
    const [university, setUniversity] = useState(false);
    const [isClass, setIsClass] = useState(false)
    const [universityData, setUniversityData] = useState([])
    const [recievedClass, setRecievedClass] = useState([])
    const [selectedClass, setSelectedClass] = useState('')
    const [selectedUniversity, setelectedUniversity] = useState('');
    const [classValue, setClassValue] = useState('')

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
            const classArray = response.data.map((cla) => ({label:cla.class_name, value:cla.id}));
            
            setRecievedClass(classArray)
            // setLoading(false)
          }
        //   setLoading(true);
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle error state or display an error message
        }
    };

    const handleClassSelection = (selectedClass) => {
        console.log(selectedClass.value)
        setClassValue(selectedClass.value)
    }

    const OnSignUpHandle = () => {
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        }

        const headers = {
            'Content-Type': 'application/json',
        };
        const data = {
            "username": email.value,
            "password": password.value,
            "students": [classValue],
        };
        const loginUrl = `${baseUrl}/user`
        axios.post(loginUrl, data, { headers })
            .then((response) => {
                if (response.status === 201) {
                    const data = response.data
                    ToastAndroid.show("Student created sucessfully.", ToastAndroid.LONG);
                    navigation.navigate('Registration')
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 400 ) {
                    console.log(error.response.status)
                    ToastAndroid.show("A user with that username already exists.", ToastAndroid.LONG);
                }
                else if (error.response && error.response.status === 404 || error.response && error.response.status === 500) {
                    console.log(error.response.status)
                    ToastAndroid.show("Oops! Something went wrong on our end. Our team has been notified and is frantically working to fix the issue.", ToastAndroid.LONG);
                } else {
                    ToastAndroid.show('Oops! Something went wrong on our end.', ToastAndroid.SHORT);
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
                       <View style={{marginTop:20 ,position: 'relative', zIndex:100 }}>
                            {university ? 
                            <DropDownPicker
                              
                                placeholder='Select University'
                                items={universityData}                                                  
                                style={{borderColor:theme.colors.active}}
                                open={university}
                                value={selectedUniversity}
                                setOpen={setUniversity}
                                setValue={setelectedUniversity}
                                setItems={setUniversityData}
                                onSelectItem={handleUniversitySelection}
                                dropDownContainerStyle={{
                                backgroundColor: 'white',
                                position: 'absolute',
                                }}
                                dropDownDirection='BOTTOM'
                            /> 
                            
                            : <DropDownPicker
                                placeholder='Select University'
                                items={universityData}
                                open={university}
                                value={selectedUniversity}
                                setOpen={setUniversity}
                                setValue={setelectedUniversity}
                                setItems={setUniversityData}
                                onSelectItem={handleUniversitySelection}
                                dropDownContainerStyle={{
                                backgroundColor: 'white',
                                position: 'absolute',
                                }}
                                dropDownDirection='BOTTOM'
                            />
                            }
                            </View> 
                            {selectedUniversity ? 
                            <View style={{ marginTop: 20, position: 'relative', zIndex:10 }}>
                                <DropDownPicker
                                    placeholder='Select Class'
                                    items={recievedClass}
                                    open={isClass}
                                    value={selectedClass}
                                    dropDownContainerStyle={{
                                        position: 'absolute',
                                        }}
                                    setOpen={setIsClass}
                                    setValue={setSelectedClass}
                                    setItems={setRecievedClass}
                                    onSelectItem={handleClassSelection}
                                    dropDownDirection='BOTTOM'
                                />
                                 
                            </View>
                            :
                            <View style={{ marginTop: 20, position: 'relative', zIndex:0 }}>
                                <DropDownPicker
                                    disabled 
                                    placeholder='Select Class'
                                    style={{opacity:.3}}
                                    items={recievedClass}
                                    open={isClass}
                                    value={selectedClass}
                                    setOpen={setIsClass}
                                    setValue={setSelectedClass}
                                    setItems={setRecievedClass}
                                />
                            </View>}
                            <View style={{marginTop:20, alignItems:'center', zIndex:0, justifyContent:'center'}}>
                            {selectedClass && selectedUniversity ? 
                        <Button mode="contained"
                        style={[
                            styles.button,
                            ]}
                        onPress={OnSignUpHandle}>
                            Sign up
                    </Button>    
                         :
                        <Button mode="contained"
                        disabled
                            style={[
                                styles.button,
                                {backgroundColor:theme.colors.secondary}
                                ]}>
                                Sign up
                        </Button>
                             }
                            </View>

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
      },
      button: {
        borderRadius: 20,
        width:'80%'
    },
})

export default SignUp