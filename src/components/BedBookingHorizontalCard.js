/*eslint-disable*/
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon, IconButton} from 'react-native-paper';

export default function BedBookingHorizontalCard({width}) {
  const navigation = useNavigation();

  return (
    <View style={[style.container, {width}]}>
      <TouchableOpacity
        style={{width: '100%'}}
        // onPress={() => navigation.navigate('HospitalInfo')}
      >
        <ImageBackground
          style={[style.image, {width: width - 4}]}
          source={require('../assets/icons/hospital1.jpg')}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: 10,
              padding: 6,
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <Image
              style={{height: 20, width: 20}}
              tintColor={'white'}
              source={require('../assets/icons/disatance.png')}
            />
            <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
              4.5 km
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: 100,
              alignItems: 'center',
              padding: 7,
            }}>
            <Image
              style={{height: 22, width: 22, tintColor: 'white'}}
              source={require('../assets/icons/save.png')}
            />
          </TouchableOpacity>
        </ImageBackground>
        <View
          style={{
            height: 100,
            paddingHorizontal: 10,
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <View style={{height: '100%', width: '100%'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              Fortis Hospital
            </Text>
            <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
              <Image
                style={{height: 18, width: 18}}
                source={require('../assets/icons/location1.png')}
              />
              <Text style={{fontSize: 13, fontWeight: 'normal', color: 'grey'}}>
                730, Eastern Metropolitan Bypass Rd, Anandapur
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
              <Image
                style={{height: 20, width: 20}}
                source={require('../assets/icons/star.png')}
              />
              <Text
                style={{fontSize: 15, fontWeight: 'normal', color: 'black'}}>
                4.5
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    elevation: 7,
    borderRadius: 15,
    padding: 2,
    height: 280,
    borderWidth: 0.3,
    borderColor: 'lightgray',
  },
  innercard: {
    width: '100%',
  },
  image: {
    borderRadius: 15,
    overflow: 'hidden',
    // justifyContent:'flex-end',
    resizeMode: 'cover',
    padding: 15,
    height: 180,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
