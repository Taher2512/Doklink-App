/*eslint-disable*/
/*eslint-disable*/
import React, {useState} from 'react';
import {Dimensions, Image, ScrollView, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import CheckBox from '../components/CheckBox';
import {Link, useNavigation} from '@react-navigation/native';
import FourDigitVerification from '../components/FourDigitVerification';

export default function OtpVerification() {
  const theme = useTheme();
  const dimension = Dimensions.get('window');
  const [checked, setchecked] = useState(false);
  const visibleHeight = dimension.width / Math.sqrt(2);
  const [phoneno, setphoneno] = useState('');
  const navigation=useNavigation()
  return (
    <ScrollView contentContainerStyle={{flex:1}} >
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.primary,
        // alignItems: 'center',
      }}>
      <View style={{position:'absolute',flex:1,zIndex:1,paddingTop:StatusBar.currentHeight+20,paddingHorizontal:20}}>
      <TouchableOpacity onPress={()=>{navigation.goBack()}}>
        <Image style={{height:40,width:40}} source={require('../assets/icons/back.png')}></Image>
      </TouchableOpacity>
      </View>
      <View style={{flex:1,alignItems:'center'}}>
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '120%',
            aspectRatio: 1,
            backgroundColor: theme.colors.secondary,
            borderRadius: 80,
            transform: [{rotate: '45deg'}],
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            top: -visibleHeight,
            padding:30
          }}>
          <Image
            style={{
              transform: [
                {rotate: '-45deg'},
              ],
              height:130,
                width:120
            }}
            source={require('../assets/logos/mainLogo.png')}
          />
        </View>
      </View>
      <View style={{height: '100%', width: '100%', justifyContent: 'flex-end'}}>
        <View
          style={{
            height: dimension.height - visibleHeight,
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            padding: 20,
            gap:50
          }}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 26}}>
            Verification Code
          </Text>
          <View style={{width:"100%",alignItems:"center",justifyContent:"center",gap:10}}>
             <Text style={{color:theme.colors.textColor,fontSize:16,textAlign:'center'}}>We have sent a verification code to your email</Text>
              <FourDigitVerification/>
            </View>
          <TouchableOpacity
          onPress={()=>{
            
          }}
            style={{
              height: 60,
              width: '100%',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#20d0ce',
              borderWidth: 3,
              elevation: 4,
              backgroundColor: 'white',
            }}>
            <Text
              style={{fontSize: 24, color: '#20d0ce', fontWeight: 'normal'}}>
              Verify
            </Text>
            
          </TouchableOpacity>
          
        </View>
      </View>
      </View>
      
    </View>
    </ScrollView>
  );
}

