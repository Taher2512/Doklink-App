/*eslint-disable*/
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  Pressable,
  StatusBar,
  ScrollView,
} from 'react-native';
import {
  Card,
  Button,
  Searchbar,
  useTheme,
  IconButton,
  TouchableRipple,
} from 'react-native-paper';
import {sampleHospitals} from '../utils/sampleData';
import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import DoctorCard from '../components/DoctorCard';
import HospitalCard from '../components/HospitalCard';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [nearbyHospitals, setNearbyHospitals] = useState(sampleHospitals);
  const [currentLocation, setCurrentLocation] = useState('');

  const theme = useTheme();

  const handleSearch = () => {
    // For now, just log the search query
    // console.log('Searching for:', searchQuery);
    // In a real app, you would filter the hospitals based on the search query
  };

  useEffect(() => {
    // Get current location when component mounts
    Geolocation.getCurrentPosition(
      position => {
        setCurrentLocation(position.coords);
        console.log('Current location:', position.coords);
        // fetchNearbyHospitals(position.coords);
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  return (
    <ScrollView className="flex-1 bg-gray-100 mt-8">
      <StatusBar barStyle={'dark-content'} />
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <Image
              source={require('../assets/logos/logo-blue.png')}
              className="h-16 w-16"
            />
            <Text
              className="font-bold mb-2 text-2xl"
              style={{color: theme.colors.secondary}}>
              DOKLINK
            </Text>
          </View>
          <View className="flex-row">
            <IconButton
              icon="calendar-month"
              mode="contained"
              size={23}
              iconColor={theme.colors.secondary}
              containerColor={theme.colors.tertiary}
              style={{
                borderWidth: 1,
                borderColor: theme.colors.secondary,
              }}
              onPress={() => console.log('Pressed')}
            />
            <IconButton
              icon="bell-ring"
              mode="contained"
              size={23}
              iconColor={theme.colors.secondary}
              containerColor={theme.colors.tertiary}
              style={{borderWidth: 1, borderColor: theme.colors.secondary}}
              onPress={() => console.log('Pressed')}
            />
          </View>
        </View>
        <Searchbar
          placeholder="Search location"
          icon={'map-marker-radius'}
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={handleSearch}
          cursorColor={theme.colors.secondary}
          className="mb-2"
          style={{borderColor: theme.colors.secondary, borderWidth: 2}}
        />
        <Text variant="bodyMedium" className="text-gray-600">
          {/* Current location:{' '} */}
          {/* {currentLocation ? currentLocation.latitude.toFixed(4) : 'N/A'},{' '}
          {currentLocation ? currentLocation.longitude.toFixed(4) : 'N/A'} */}
          Current location: 123 Main St., Kolkata - 700016
        </Text>
        <LinearGradient
          colors={['#91d8f3', '#33a7d3', '#146c8d']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="flex-row justify-end items-center w-full h-32 mt-10 rounded-lg"
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            elevation: 15,
          }}>
          <Image
            source={require('../assets/icons/banner-1.png')}
            className="absolute left-4 h-36 w-36 -top-4"
          />
          <Text className="text-white w-1/2 font-bold text-lg mr-3 text-left">
            Your EXCELLENT care{'\n'} is our SPECIALITY
          </Text>
        </LinearGradient>
        <Text className="text-[#192f6a] mt-6 font-bold text-2xl">
          Our Services
        </Text>
        <View className="flex-row justify-around mt-4">
          <Pressable
            onPress={() => console.log('hi')}
            className="justify-center items-center">
            <View
              colors={['#d9f7f7', '#d9f7f7']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              className="h-28 w-40 rounded-lg justify-center items-center"
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.5,
                elevation: 15,
                flexDirection: 'row',
                backgroundColor: '#d9f7f7',
                justifyContent: 'flex-start',
                paddingLeft: 10,
              }}>
              <View style={{width: '40%', height: '100%', paddingTop: 10}}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 16,
                    width: 100,
                  }}>
                  Bed
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 16,
                    width: 100,
                  }}>
                  Booking
                </Text>
              </View>
              <Image
                source={require('../assets/icons/bed-booking-banner.png')}
                className="h-28 w-28 absolute"
                style={{resizeMode: 'contain', left: 60, top: 20}}
              />
            </View>
          </Pressable>
          <Pressable
            onPress={() => console.log('hi2')}
            className="justify-center items-center">
            <LinearGradient
              colors={['#d9f7f7', '#d9f7f7']}
              className="h-28 w-40 rounded-lg justify-center items-center"
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.5,
                elevation: 15,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                paddingLeft: 10,
              }}>
              <View style={{width: '60%', height: '100%', paddingTop: 10}}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 16,
                    width: 100,
                  }}>
                  Doctor
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 16,
                    width: 110,
                  }}>
                  Appointment
                </Text>
              </View>
              <Image
                source={require('../assets/icons/doctor-appointment-banner.png')}
                className="h-28 w-24 absolute"
                style={{resizeMode: 'contain', left: 95}}
              />
            </LinearGradient>
          </Pressable>
        </View>
        {/* Top Doctors Section */}
        <Text className="text-[#192f6a] mt-6 font-bold text-2xl ">
          Top Doctors
        </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[
            {
              id: '1',
              name: 'Dr. Shreya Bhaskar',
              specialty: 'General Physician',
              rating: '4.9',
              image: require('../assets/icons/dr1.png'),
            },
            {
              id: '2',
              name: 'Dr. Tushar Mishra',
              specialty: 'General Physician',
              rating: '4.8',
              image: require('../assets/icons/dr2.png'),
            },
            {
              id: '3',
              name: 'Dr. Priya Shukla',
              specialty: 'General Physician',
              rating: '4.7',
              image: require('../assets/icons/dr1.png'),
            },
          ]}
          renderItem={({item}) => <DoctorCard doctor={item} />}
          keyExtractor={item => item.id}
        />
        {/* Top Hospitals Section */}
        <Text className="text-[#192f6a] mt-6 font-bold text-2xl">
          Top Hospitals
        </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[
            {
              id: '1',
              name: 'Apollo Hospital',
              location: 'Kolkata',
              rating: '4.9',
              image: require('../assets/icons/dr1.png'),
            },
            {
              id: '2',
              name: 'AIIMS',
              location: 'Delhi',
              rating: '4.8',
              image: require('../assets/icons/dr1.png'),
            },
            {
              id: '3',
              name: 'Fortis Hospital',
              location: 'Mumbai',
              rating: '4.7',
              image: require('../assets/icons/dr1.png'),
            },
          ]}
          renderItem={({item}) => <HospitalCard hospital={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </ScrollView>
  );
};

export default Home;
