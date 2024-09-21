import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {useTheme, Searchbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EmergencyAppointment = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const theme = useTheme();
  const navigation = useNavigation();

  const nearbyDoctors = [
    {
      id: '1',
      name: 'Dr. John Doe',
      specialty: 'Emergency Medicine',
      distance: '0.5 km',
      available: true,
    },
    {
      id: '2',
      name: 'Dr. Jane Smith',
      specialty: 'Trauma Surgery',
      distance: '1.2 km',
      available: true,
    },
    {
      id: '3',
      name: 'Dr. Mike Johnson',
      specialty: 'Critical Care',
      distance: '2.0 km',
      available: false,
    },
    {
      id: '4',
      name: 'Dr. Emily Brown',
      specialty: 'Emergency Medicine',
      distance: '2.5 km',
      available: true,
    },
  ];

  const renderDoctorItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('EmergencyDoctorInfo')}
      style={[
        styles.doctorCard(theme),
        {backgroundColor: theme.colors.primary},
      ]}>
      <Image
        source={require('../assets/icons/dr1.png')}
        style={styles.doctorImage}
      />
      <View style={styles.doctorInfo}>
        <Text style={[styles.doctorName, {color: '#777'}]}>{item.name}</Text>
        <Text style={[styles.doctorSpecialty, {color: '#777'}]}>
          {item.specialty}
        </Text>
        <Text style={[styles.doctorDistance, {color: '#777'}]}>
          {item.distance}
        </Text>
      </View>
      <View style={styles.availabilityContainer}>
        <Icon
          name={item.available ? 'checkbox-marked-circle' : 'clock-outline'}
          size={24}
          color={item.available ? theme.colors.secondary : theme.colors.error}
        />
        <Text
          style={[
            styles.availabilityText,
            {
              color: item.available
                ? theme.colors.secondary
                : theme.colors.error,
            },
          ]}>
          {item.available ? 'Available' : 'Busy'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={[styles.header, {backgroundColor: theme.colors.secondary}]}>
        <Text style={styles.headerTitle}>Emergency Appointment</Text>
        <Searchbar
          placeholder="Search nearby doctors"
          cursorColor={theme.colors.secondary}
          selectionColor={theme.colors.primary}
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>
      <View style={styles.content}>
        <Text style={[styles.sectionTitle, {color: '#777'}]}>
          Nearby Emergency Doctors
        </Text>
        <FlatList
          data={nearbyDoctors}
          renderItem={renderDoctorItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.doctorList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    marginTop: StatusBar.currentHeight,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  searchBar: {
    marginTop: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  doctorList: {
    paddingBottom: 20,
  },
  doctorCard: theme => ({
    flexDirection: 'row',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 0.5,
    borderColor: theme.colors.secondary,
  }),
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    resizeMode: 'contain',
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  doctorSpecialty: {
    fontSize: 14,
  },
  doctorDistance: {
    fontSize: 14,
  },
  availabilityContainer: {
    width: '20%',
    alignItems: 'center',
  },
  availabilityText: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default EmergencyAppointment;
