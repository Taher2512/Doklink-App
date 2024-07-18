import React, {useEffect, useState} from 'react';
import {View, FlatList, Image, Text} from 'react-native';
import {Card, Button, Searchbar, useTheme} from 'react-native-paper';
import {sampleHospitals} from '../utils/sampleData';
import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';

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
    <View className="flex-1 bg-gray-100 ">
      <View className="p-4">
        <View className="flex-row items-center mb-4">
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
          colors={['#4c669f', '#3b5998', '#192f6a']}
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
      </View>
    </View>
  );
};

export default Home;
