import React, { useState } from "react";
import {StyleSheet} from "react-native";
import {
    Provider,
  } from "react-native-paper";
  import DropDown from "react-native-paper-dropdown";
  
  function Drop() {
    const [showDropDown, setShowDropDown] = useState(false);
    const [gender, setGender] = useState ("");
    const genderList = [
      {
        label: "Male",
        value: "male",
      },
      {
        label: "Female",
        value: "female",
      },
      {
        label: "Others",
        value: "others",
      },
    ];
  
  
    return (
      <Provider>
            <DropDown
            label={"Gender"}
            mode={"outlined"}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={gender}
            setValue={setGender}
            list={genderList}
            />
            
      </Provider>
    );
  }
  
  const styles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    spacerStyle: {
      marginBottom: 15,
    },
    safeContainerStyle: {
      flex: 1,
      margin: 20,
      justifyContent: "center",
    },
  });
  
  export default Drop;