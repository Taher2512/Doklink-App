import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Chip,
  Icon,
  IconButton,
  useTheme,
  Button,
  Modal,
  Portal,
  TextInput,
  Checkbox,
} from 'react-native-paper';
import DateSelector from '../components/DateSelector';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HospitalInfo = () => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [useUserInfo, setUseUserInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const hospital = {
    name: 'City General Hospital',
    rating: 4.5,
    openTime: '24/7',
    description:
      'City General Hospital is a state-of-the-art medical facility providing comprehensive healthcare services to our community. With a team of experienced doctors and modern equipment, we strive to deliver the best patient care.',
    categories: [
      'Cardiology',
      'Orthopedics',
      'ENT',
      'Dentistry',
      'Pediatrics',
      'Neurology',
    ],
  };

  useEffect(() => {
    if (useUserInfo) {
      // fetchUserInfo();
    }
  }, [useUserInfo]);

  const fetchUserInfo = async () => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo) {
        const {fullName, email, mobile, birthDate} = JSON.parse(userInfo);
        setFullName(fullName);
        setEmail(email);
        setMobile(mobile);
        setBirthDate(birthDate);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleBookBed = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://your-api-endpoint.com/book-bed',
        {
          fullName,
          email,
          mobile,
          birthDate,
          hospitalName: hospital.name,
        },
      );

      console.log('Booking response:', response.data);
      // Handle successful booking (e.g., show success message, navigate to confirmation page)
      hideModal();
    } catch (error) {
      console.error('Error booking bed:', error);
      // Handle error (e.g., show error message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-slate-100">
      <ScrollView>
        <Image
          source={{
            uri: 'https://infrastructurepipeline.org/files/images/optimised/project_hero/files/images/project/generichospital7-6683a90066d1f804300495.jpg',
          }}
          className="w-full h-64"
        />
        <View className="p-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold mb-2 text-black">
              {hospital.name}
            </Text>
            <View className="flex-row items-center justify-center">
              <Icon source={'star'} size={14} color="#FFBF00" />
              <Text className="text-sm font-bold ml-1 text-slate-700">
                {hospital.rating}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between mb-2.5">
            <View className="flex-row items-center justify-center">
              <Icon
                source={'clock-time-nine-outline'}
                size={16}
                color="#475569"
              />
              <Text className="text-slate-600 font-bold ml-1">
                10:00 AM - 8:00 PM
              </Text>
            </View>
            <View className="bg-green-600 px-2.5 py-1 rounded-full">
              <Text className="text-white font-semibold text-xs">Open</Text>
            </View>
          </View>
          <View className="flex-row items-center mb-3">
            <Icon source={'map-marker'} size={16} color="#475569" />
            <Text className="text-slate-600 font-bold ml-1">
              123 Main St. Kolkata - 700015
            </Text>
          </View>
          <View className="flex-row items-center mb-6">
            <Icon source={'bed'} size={16} color="#475569" />
            <Text className="text-slate-600 font-bold ml-1">
              54 Beds Available
            </Text>
          </View>
          <Text className="text-lg font-bold mb-2 text-black">About:</Text>
          <Text
            className="mb-6 text-black leading-5"
            style={{fontWeight: 500, lineHeight: 22, fontSize: 14}}>
            {hospital.description}
          </Text>
          <Text className="text-lg font-bold mb-2 text-black">
            Available Specialties:
          </Text>
          <View className="flex-row flex-wrap">
            {hospital.categories.map((category, index) => (
              <Chip
                key={index}
                textStyle={{color: '#fff'}}
                className={`mr-2 mb-2 bg-[${theme.colors.secondary}]`}>
                {category}
              </Chip>
            ))}
          </View>
        </View>
      </ScrollView>
      <View className={'w-full h-28 items-center justify-center'}>
        <Button
          icon="bed"
          mode="contained"
          textColor={theme.colors.primary}
          buttonColor={theme.colors.secondary}
          className="w-5/6"
          onPress={showModal}>
          Book a bed
        </Button>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            margin: 20,
            borderRadius: 10,
          }}>
          <Text className="text-2xl font-bold mb-4 text-black">Book a Bed</Text>
          <TextInput
            mode="flat"
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            theme={{colors: {primary: theme.colors.secondary}}}
            className="bg-slate-100 rounded-lg text-gray-300 mb-4"
          />
          <TextInput
            mode="flat"
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            theme={{colors: {primary: theme.colors.secondary}}}
            className="bg-slate-100 rounded-lg text-gray-300 mb-4"
          />
          <TextInput
            mode="flat"
            label="Mobile No."
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
            theme={{colors: {primary: theme.colors.secondary}}}
            className="bg-slate-100 rounded-lg text-gray-300 mb-4"
          />
          <DateSelector
            label={'Date of Birth'}
            placeholder={'Select Date of Birth'}
            value={birthDate}
            onChange={setBirthDate}
          />
          <View className="flex-row items-center mt-4">
            <Checkbox
              status={useUserInfo ? 'checked' : 'unchecked'}
              onPress={() => setUseUserInfo(!useUserInfo)}
              color={theme.colors.secondary}
            />
            <Text className="ml-2 text-black">Use my information</Text>
          </View>
          <Button
            mode="contained"
            onPress={() => {
              hideModal();
              // handleBookBed();
            }}
            className="mt-4"
            buttonColor={theme.colors.secondary}
            loading={loading}
            disabled={loading}>
            {loading ? 'Booking...' : 'Confirm Booking'}
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

export default HospitalInfo;
