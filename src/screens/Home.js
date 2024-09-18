import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  Pressable,
  StatusBar,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Searchbar, useTheme} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import HospitalCard from '../components/HospitalCard';
import DoctorCard from '../components/DoctorCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const theme = useTheme();
  const navigation = useNavigation();

  const doctors = [
    {
      id: '1',
      name: 'Dr. Shraman Aiyar',
      speciality: 'Clinical Psychologist',
      distance: '1.1',
      rating: 4.6,
      reviewCount: 150,
      image: require('../assets/icons/top_doctor.jpg'),
    },
    {
      id: '2',
      name: 'Dr. Shraman Aiyar',
      speciality: 'Clinical Psychologist',
      distance: '1.1',
      rating: 4.6,
      reviewCount: 150,
      image: require('../assets/icons/top_doctor.jpg'),
    },
    {
      id: '3',
      name: 'Dr. Shraman Aiyar',
      speciality: 'Clinical Psychologist',
      distance: '1.1',
      rating: 4.6,
      reviewCount: 150,
      image: require('../assets/icons/top_doctor.jpg'),
    },
    {
      id: '4',
      name: 'Dr. Shraman Aiyar',
      speciality: 'Clinical Psychologist',
      distance: '1.1',
      rating: 4.6,
      reviewCount: 150,
      image: require('../assets/icons/top_doctor.jpg'),
    },
  ];

  const hospitals = [
    {
      id: '1',
      name: 'AMRI HOSPITAL',
      distance: '1.1',
      rating: 4.6,
      reviewCount: 150,
      image: require('../assets/icons/hospital.jpeg'),
    },
    {
      id: '2',
      name: 'AMRI HOSPITAL',
      distance: '1.1',
      rating: 4.6,
      reviewCount: 150,
      image: require('../assets/icons/hospital.jpeg'),
    },
    {
      id: '3',
      name: 'AMRI HOSPITAL',
      distance: '1.1',
      rating: 4.6,
      reviewCount: 150,
      image: require('../assets/icons/hospital.jpeg'),
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 100}}>
      <StatusBar
        backgroundColor={theme.colors.secondary}
        barStyle="light-content"
      />

      {/* Header */}
      <LinearGradient colors={['#125873', '#1a7fa0']} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/logos/logo-blue.png')}
              style={styles.logo}
            />
            <Text style={styles.logoText}>DOKLINK</Text>
          </View>
          <View style={styles.headerIcons}>
            <Pressable onPress={() => setOpen(true)} style={styles.iconButton}>
              <Icon name="calendar-month" size={24} color="#fff" />
            </Pressable>
            <Pressable onPress={() => {}} style={styles.iconButton}>
              <Icon name="bell-ring" size={24} color="#fff" />
            </Pressable>
          </View>
        </View>

        <Searchbar
          placeholder="Search doctors, hospitals..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor="#125873"
        />

        <View style={styles.locationContainer}>
          <Icon name="map-marker" size={20} color="#fff" />
          <Text style={styles.locationText}>
            123 Main St., Kolkata - 700016
          </Text>
        </View>
      </LinearGradient>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Banner */}
        <LinearGradient colors={['#125873', '#1a7fa0']} style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Your EXCELLENT care</Text>
            <Text style={styles.bannerSubtitle}>is our SPECIALITY</Text>
          </View>
          <Image
            source={require('../assets/icons/banner-1.png')}
            style={styles.bannerImage}
          />
        </LinearGradient>

        {/* Services */}
        <Text style={styles.sectionTitle}>Our Services</Text>
        <View style={styles.servicesContainer}>
          <ServiceCard
            title="Bed Booking"
            icon="bed-empty"
            onPress={() => navigation.navigate('BedBooking')}
          />
          <ServiceCard
            title="Doctor Appointment"
            icon="doctor"
            onPress={() => navigation.navigate('DoctorAppointment')}
          />
        </View>

        {/* Top Hospitals */}
        <Text style={styles.sectionTitle}>Top Hospitals</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hospitalList}>
          {hospitals.map(hospital => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </ScrollView>

        {/* Top Doctors */}
        <Text style={styles.sectionTitle}>Top Doctors</Text>
        {doctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </View>

      {/* DatePicker */}
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          // You can handle the selected date here
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </ScrollView>
  );
};

const ServiceCard = ({title, icon, onPress}) => (
  <Pressable onPress={onPress} style={styles.serviceCard}>
    <LinearGradient
      colors={['#ffffff', '#e6f7ff']}
      style={styles.serviceCardGradient}>
      <Icon name={icon} size={40} color="#125873" />
      <Text style={styles.serviceCardTitle}>{title}</Text>
    </LinearGradient>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    tintColor: '#fff',
  },
  logoText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 20,
  },
  searchBar: {
    borderRadius: 30,
    backgroundColor: '#fff',
    elevation: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  locationText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
  },
  content: {
    padding: 20,
  },
  banner: {
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  bannerImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#125873',
    marginBottom: 20,
    marginTop: 24,
  },
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
  },
  serviceCardGradient: {
    borderRadius: 15,
    padding: 20,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  serviceCardTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#125873',
    textAlign: 'center',
  },
  hospitalList: {
    paddingRight: 2,
  },
});

export default Home;
