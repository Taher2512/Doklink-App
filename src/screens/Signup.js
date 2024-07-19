/*eslint-disable*/
import React, {useState, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import CheckBox from '../components/CheckBox';
import {Link, useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import {BACKEND_URL} from '../utils/credentails';
import firestore from '@react-native-firebase/firestore';

export default function SignUp() {
  const [checked, setchecked] = useState(false);
  const [email, setemail] = useState('');

  const theme = useTheme();
  const navigation = useNavigation();
  const dimension = Dimensions.get('window');
  const visibleHeight = dimension.width / Math.sqrt(2);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '607444176798-ig7h7gvj34qln9nn4171iqvnqmmpck4k.apps.googleusercontent.com',
    });
    console.log('configured');
  }, []);

  const googleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      await GoogleSignin.signOut();
      const {user} = await GoogleSignin.signIn();
      console.log(user);
      return user;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.primary,
          alignItems: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '135%',
              aspectRatio: 1,
              backgroundColor: theme.colors.secondary,
              borderRadius: 80,
              transform: [{rotate: '45deg'}],
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              marginTop: -visibleHeight,
              padding: 30,
            }}>
            <Image
              style={{
                transform: [{rotate: '-45deg'}],
                height: 130,
                width: 120,
              }}
              source={require('../assets/logos/mainLogo.png')}
            />
          </View>
        </View>
        <View style={{width: '100%', marginTop: 60}}>
          <View
            style={{
              height: dimension.height - visibleHeight,
              alignItems: 'center',
              justifyContent: 'space-evenly',
              width: '100%',
              padding: 20,
            }}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 28}}>
              Sign Up for free
            </Text>
            <View style={{width: '100%', gap: 15}}>
              <TextInput
                style={{
                  width: '100%',
                  height: 50,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  borderColor: theme.colors.outline,
                  color: 'black',
                }}
                label={'Enter your email'}
                mode="outlined"
                keyboardType="email-address"
                outlineColor="black"
                activeOutlineColor={theme.colors.secondary}
                textColor="black"
                placeholderTextColor={'black'}
                value={email}
                onChangeText={text => setemail(text)}
              />
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <CheckBox setchecked={setchecked} checked={checked} />
                <Text style={{color: theme.colors.textColor, fontSize: 16}}>
                  Remeber Me
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={async () => {
                axios
                  .post(BACKEND_URL + '/generateOtp', {email})
                  .then(async res => {
                    if (res.data.error) {
                      Alert.alert('Error', res.data.message);
                    } else {
                      await firestore()
                        .collection('otp')
                        .add({
                          email,
                          otp: res.data.otp,
                          expiresIn: Date.now() + 9 * 60 * 1000,
                          used: 0,
                        });
                      navigation.navigate('otpVerification', {
                        email,
                        otp: res.data.otp,
                      });
                    }
                  });
                navigation.navigate('otpVerification', {email});
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
                Sign Up
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                gap: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{height: 1.5, width: '100%', backgroundColor: 'black'}}
              />
              <Text style={{color: theme.colors.textColor, fontSize: 17}}>
                or continue with
              </Text>
            </View>
            <TouchableOpacity
              onPress={googleSignin}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 7,
                width: '100%',
                height: 60,
                backgroundColor: 'white',
                borderRadius: 10,
                borderColor: 'black',
                borderWidth: 1,
                elevation: 4,
              }}>
              <Image
                style={{height: 45, width: 45}}
                source={require('../assets/logos/googleLogo.png')}
              />
              <Text style={{color: theme.colors.textColor, fontSize: 22}}>
                Google
              </Text>
            </TouchableOpacity>
            <Text style={{color: '#000', fontSize: 16}}>
              Don't have an account?
              <Link style={{color: '#20d0ce'}} to={'/Login'}>
                {' '}
                Sign In
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
