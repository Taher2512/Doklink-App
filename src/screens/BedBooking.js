import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const BedBooking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [nearbyHospitals, setNearbyHospitals] = useState(sampleHospitals);
  const [currentLocation, setCurrentLocation] = useState('');

  const theme = useTheme();

  const handleSearch = () => {
    // For now, just log the search query
    // console.log('Searching for:', searchQuery);
    // In a real app, you would filter the hospitals based on the search query
  };

  const renderHospitalCard = ({item}) => (
    <Card className="m-2">
      <Card.Cover source={{uri: item.image}} />
      <Card.Content>
        <Text variant="titleLarge" className="font-bold">
          {item.name}
        </Text>
        <Text variant="bodyMedium" className="text-gray-600">
          {item.address}
        </Text>
        <Text variant="bodyMedium" className="text-green-600">
          {item.availableBeds} beds available
        </Text>
        <Text variant="bodyMedium" className="text-blue-600">
          {item.distance} away
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => console.log('Book bed at', item.name)}>
          Book Bed
        </Button>
      </Card.Actions>
    </Card>
  );

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
      <View className="p-4 bg-white shadow-md">
        <Text variant="headlineMedium" className="font-bold mb-2">
          Find Nearby Hospitals
        </Text>
        <Searchbar
          placeholder="Search location"
          icon={'map-marker-radius'}
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={handleSearch}
          cursorColor={theme.colors.secondary}
          className="mb-2"
        />
        <Text variant="bodyMedium" className="text-gray-600">
          Current location:{' '}
          {currentLocation ? currentLocation.latitude.toFixed(4) : 'N/A'},{' '}
          {currentLocation ? currentLocation.longitude.toFixed(4) : 'N/A'}
        </Text>
      </View>
      <FlatList
        data={nearbyHospitals}
        renderItem={renderHospitalCard}
        keyExtractor={item => item.id}
        contentContainerStyle={{padding: 8}}
      />
    </View>
  );
};

export default BedBooking;

const styles = StyleSheet.create({});
