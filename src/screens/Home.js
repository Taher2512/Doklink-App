import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  Pressable,
  StatusBar,
  Dimensions,
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
    <ScrollView style={{flex: 1, backgroundColor: '#f0f4f8'}}>
      <StatusBar backgroundColor="#125873" barStyle="light-content" />

      {/* Header */}
      <LinearGradient
        colors={['#125873', '#1a7fa0']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={{padding: 20, paddingTop: 20, paddingBottom: 30}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../assets/logos/logo-blue.png')}
                style={{width: 40, height: 40, tintColor: '#fff'}}
              />
              <Text
                style={{
                  color: '#fff',
                  fontSize: 28,
                  fontWeight: 'bold',
                  marginLeft: 10,
                }}>
                DOKLINK
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Pressable onPress={() => setOpen(true)} style={{marginRight: 20}}>
                <Icon name="calendar-month" size={28} color="#fff" />
              </Pressable>
              <Pressable onPress={() => {}}>
                <Icon name="bell-ring" size={28} color="#fff" />
              </Pressable>
            </View>
          </View>

          <Searchbar
            placeholder="Search doctors, hospitals..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{borderRadius: 30, backgroundColor: '#fff', elevation: 5}}
            iconColor="#125873"
          />

          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
            <Icon name="map-marker" size={24} color="#fff" />
            <Text style={{color: '#fff', marginLeft: 5, fontSize: 16}}>
              123 Main St., Kolkata - 700016
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Main Content */}
      <View style={{padding: 20}}>
        {/* Banner */}
        <LinearGradient
          colors={['#125873', '#1a7fa0']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            borderRadius: 15,
            paddingHorizontal: 24,
            marginBottom: 30,
            elevation: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: 'semibold',
                marginBottom: 6,
              }}>
              Your EXCELLENT care
            </Text>
            <Text style={{color: '#fff', fontSize: 20, fontWeight: 'semibold'}}>
              is our SPECIALITY
            </Text>
          </View>
          <Image
            source={require('../assets/icons/banner-1.png')}
            style={{width: 120, height: 120, resizeMode: 'contain'}}
          />
        </LinearGradient>

        {/* Services */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#125873',
            marginBottom: 20,
          }}>
          Our Services
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <ServiceCard
            title="Bed Booking"
            icon="bed-empty"
            onPress={() => console.log('Bed Booking')}
          />
          <ServiceCard
            title="Doctor Appointment"
            icon="doctor"
            onPress={() => navigation.navigate('DoctorAppointment')}
          />
        </View>

        {/* Top Hospitals */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#125873',
            marginTop: 40,
            marginBottom: 20,
          }}>
          Top Hospitals
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingRight: 20}}>
          {hospitals.map(hospital => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </ScrollView>

        {/* Top Doctors */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#125873',
            marginTop: 40,
            marginBottom: 20,
          }}>
          Top Doctors
        </Text>
        {doctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </View>

      {/* DatePicker */}
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
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
  <Pressable onPress={onPress} style={{width: '48%'}}>
    <LinearGradient
      colors={['#ffffff', '#e6f7ff']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{
        borderRadius: 15,
        padding: 20,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
      }}>
      <Icon name={icon} size={50} color="#125873" />
      <Text
        style={{
          marginTop: 5,
          fontSize: 16,
          fontWeight: 'bold',
          color: '#125873',
          textAlign: 'center',
        }}>
        {title}
      </Text>
    </LinearGradient>
  </Pressable>
);

export default Home;
