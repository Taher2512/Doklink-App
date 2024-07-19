/*eslint-disable*/
/*eslint-disable*/
import React, {useState, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  TextInput,
  useTheme,
  Button,
  ActivityIndicator,
} from 'react-native-paper';
import CheckBox from '../components/CheckBox';
import {Link, useNavigation} from '@react-navigation/native';
import FourDigitVerification from '../components/FourDigitVerification';
import firestore from '@react-native-firebase/firestore';
import ShowMessage from '../components/dialogBox/ShowMessage';
const formatNumber = number => `0${number}`.slice(-2);
const getRemaining = time => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return {mins: formatNumber(mins), secs: formatNumber(secs)};
};
export default function OtpVerification({navigation, route}) {
  const theme = useTheme();
  const dimension = Dimensions.get('window');
  const [remainingSecs, setRemainingSecs] = useState(9 * 60);
  const [isActive, setIsActive] = useState(true);
  const {mins, secs} = getRemaining(remainingSecs);
  const [checked, setchecked] = useState(false);
  const visibleHeight = dimension.width / Math.sqrt(2);
  const [code, setCode] = useState(['', '', '', '']);
  const [loading, setloading] = useState(false);
  toggle = () => {
    setIsActive(!isActive);
  };
  const verify = () => {
    let wholecode = code.join('');
    if (wholecode.length < 4) {
      ShowMessage({message: 'Please enter the complete code', error: true});
    } else {
      setloading(true);
      firestore()
        .collection('otp')
        .where('email', '==', route.params.email)
        .where('otp', '==', wholecode)
        .get()
        .then(snapshot => {
          if (snapshot.docs.length > 0) {
            if (snapshot.docs[0].data().used) {
              setloading(false);
              ShowMessage({message: 'Otp already used', error: true});
              return;
            } else if (snapshot.docs[0].data().expiresIn < Date.now()) {
              setloading(false);
              ShowMessage({message: 'Otp expired', error: true});
              return;
            } else {
              firestore()
                .collection('otp')
                .doc(snapshot.docs[0].id)
                .update({used: 1});
              firestore()
                .collection('users')
                .where('email', '==', route.params.email)
                .get()
                .then(snapshot => {
                  if (snapshot.docs.length == 0) {
                    firestore().collection('users').add({
                      email: route.params.email,
                      googleLogin: 0,
                      date: Date.now(),
                    });
                  }
                  setloading(false);
                  setRemainingSecs(0);
                  navigation.navigate('BottomTabNavigation');
                });
              setloading(false);
            }
          } else {
            setloading(false);
            ShowMessage({message: 'Invalid code', error: true});
          }
        });
    }
  };
  useEffect(() => {
    let interval = null;
    setIsActive(true);
    if (remainingSecs >= 0) {
      interval = setInterval(() => {
        console.log(mins, secs);
        setRemainingSecs(remainingSecs => remainingSecs - 1);
      }, 1000);
    } else if (remainingSecs == 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSecs]);
  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.primary,
        }}>
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            marginTop: 50,
            marginLeft: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{height: 40, width: 40}}
              source={require('../assets/icons/back.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
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
          <View style={{width: '100%', marginTop: 80}}>
            <View
              style={{
                height: dimension.height - visibleHeight,
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
                padding: 20,
                gap: 50,
              }}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 26}}>
                Verification Code
              </Text>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                }}>
                <Text
                  style={{
                    color: theme.colors.textColor,
                    fontSize: 16,
                    textAlign: 'center',
                  }}>
                  We have sent a verification code to your email
                </Text>
                <FourDigitVerification code={code} setCode={setCode} />
                <View style={{width: '100%', alignItems: 'flex-start'}}>
                  <Text
                    style={{
                      color: theme.colors.textColor,
                      fontSize: 16,
                      textAlign: 'center',
                    }}>
                    The code expires in {mins}:{secs}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 60,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                  backgroundColor: theme.colors.secondary,
                }}
                onPress={verify}>
                {loading && <ActivityIndicator style={{marginRight: 12}} />}
                <Text style={{fontSize: 20, color: 'white'}}>
                  {loading ? 'Verifying...' : 'Verify'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
