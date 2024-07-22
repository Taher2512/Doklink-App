/*eslint-disable*/
import React, {useState, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {
  TextInput,
  useTheme,
  Button,
  ActivityIndicator,
} from 'react-native-paper';
import CheckBox from '../components/CheckBox';
import {Link, useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import {BACKEND_URL} from '../utils/credentails';
import firestore from '@react-native-firebase/firestore';
import ShowMessage from '../components/dialogBox/ShowMessage';

export default function SignIn() {
  const [checked, setchecked] = useState(false);
  const [email, setemail] = useState('');
  const [loading, setloading] = useState(false);
  //google signin configuration to be done in ios folder as well

  const theme = useTheme();
  const navigation = useNavigation();
  const dimension = Dimensions.get('window');
  const visibleHeight = dimension.width / Math.sqrt(2);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '739499928737-09n0m1jlfjleao777rn09bptpqedlhjf.apps.googleusercontent.com',
    });
    console.log('configured');
  }, []);

  const googleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      await GoogleSignin.signOut();
      const {user} = await GoogleSignin.signIn();
      firestore()
        .collection('users')
        .where('email', '==', user.email)
        .get()
        .then(snapshot => {
          if (snapshot.docs.length > 0 && !snapshot.docs[0].googleLogin) {
            ShowMessage({
              message: 'This email is already registered with email',
              error: true,
            });
            return;
          } else if (snapshot.docs.length == 0) {
            firestore()
              .collection('users')
              .add({email: user.email, googleLogin: 1, date: Date.now()});
            navigation.navigate('Register', {email: user.email});
          } else {
            navigation.navigate('Register', {email: user.email});
          }
        });
      console.log(user);
      return user;
    } catch (err) {
      console.log(err);
    }
  };
  const sendOtp = async () => {
    if (email.length == 0) {
      ShowMessage({message: 'Please enter the email', error: true});
      return;
    } else {
      setloading(true);
      firestore()
        .collection('users')
        .where('email', '==', email)
        .get()
        .then(snapshot => {
          if (snapshot.docs.length > 0 && snapshot.docs[0].googleLogin) {
            Alert.alert('This email is already registered with google');
            ShowMessage({
              message: 'This email is already registered with google',
              error: true,
            });
            setloading(false);
            return;
          } else {
            axios
              .post(BACKEND_URL + '/generateOtp', {email})
              .then(async res => {
                if (res.data.error) {
                  setloading(false);
                  ShowMessage({message: res.data.message, error: true});
                  return;
                } else {
                  await firestore()
                    .collection('otp')
                    .add({
                      email,
                      otp: res.data.otp,
                      expiresIn: Date.now() + 9 * 60 * 1000,
                      used: 0,
                    });
                  setloading(false);
                  navigation.navigate('otpVerification', {
                    email,
                    otp: res.data.otp,
                  });
                  return;
                }
              });
          }
        });
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
              Sign In
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
              onPress={sendOtp}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 60,
                width: '100%',
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.colors.secondary,
              }}>
              {loading && <ActivityIndicator style={{marginRight: 12}} />}
              <Text style={{color: '#fff', fontSize: 20, fontWeight: '500'}}>
                {loading ? 'Signing In...' : 'Sign In'}
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
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
