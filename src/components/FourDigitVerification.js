/*eslint-disable*/
import React, { useState, useRef,useEffect } from 'react';
import { View, TextInput, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Keyboard, KeyboardEvent } from 'react-native';
let width=Dimensions.get('window').width 
width=(width-80)/4
const FourDigitVerification = ({code,setCode}) => {
  const inputs = useRef([]);
 const [focusedBox, setfocusedBox] = useState(-1)
 const theme=useTheme()
 
  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text.length === 1 && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index) => {
    if (index > 0 && code[index] === '') {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <KeyboardAvoidingView >
    <View style={styles.container}>
      {code.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.input(focusedBox==index,theme.colors.secondary,index,code)}
          value={digit}
          onFocus={()=>{setfocusedBox(index)}}
          onChangeText={(text) => handleChange(text, index)}
          keyboardType="numeric"
          maxLength={1}
          ref={(input) => (inputs.current[index] = input)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              handleBackspace(index);
            }
          }}
        />
      ))}
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    // maxWidth: 280,
  },
  input:(focused,borderColor,index,code)=> {
    return{
    width,
    height: width,
    borderWidth: 0.7,
    borderColor: focused?borderColor:'#ccc',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 24,
    color:code[index]?"white":'black',
    maxWidth:90,
    maxHeight:90,
    backgroundColor:code[index]?borderColor:'#f9f9f9',
    elevation:4
    }
  },
});

export default FourDigitVerification;