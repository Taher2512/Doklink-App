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
import ReviewCard from '../components/ReviewCard';

const HospitalInfo = () => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [useUserInfo, setUseUserInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savedPeople, setSavedPeople] = useState([
    {id: 1, name: 'John Doe'},
    {id: 2, name: 'Jane Smith'},
    {id: 3, name: 'Mike Johnson'},
  ]);
  const [selectedPerson, setSelectedPerson] = useState(null);

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
    bedTypes: [
      {type: 'General', available: Math.floor(Math.random() * 50) + 1},
      {type: 'Isolation', available: Math.floor(Math.random() * 20) + 1},
      {type: 'ICU', available: Math.floor(Math.random() * 10) + 1},
      {type: 'Emergency', available: Math.floor(Math.random() * 15) + 1},
    ],
    reviews: [
      {
        name: 'John Doe',
        date: 'May 15, 2023',
        rating: 5,
        comment:
          'Dr. Smith is an excellent cardiologist. She took the time to explain everything thoroughly and made me feel at ease.',
        profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      {
        name: 'Sarah Johnson',
        date: 'April 22, 2023',
        rating: 4.5,
        comment:
          'Very knowledgeable and professional. The wait time was a bit long, but the care I received was worth it.',
        profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
      },
      {
        name: 'Mike Brown',
        date: 'June 3, 2023',
        rating: 5,
        comment:
          "Dr. Jane Smith is by far the best cardiologist I've ever seen. Her attention to detail and caring nature are unmatched.",
        profilePic: 'https://randomuser.me/api/portraits/men/3.jpg',
      },
    ],
  };

  useEffect(() => {
    if (useUserInfo) {
      // fetchUserInfo();
    }
  }, [useUserInfo]);

  useEffect(() => {
    if (selectedPerson) {
      // Fetch and set the selected person's information
      // This is where you would normally fetch the data from AsyncStorage or an API
      const personInfo = {
        fullName: savedPeople.find(person => person.id === selectedPerson).name,
        email: 'example@email.com',
        mobile: '1234567890',
        birthDate: new Date('1990-01-01'),
      };
      setFullName(personInfo.fullName);
      setEmail(personInfo.email);
      setMobile(personInfo.mobile);
      setBirthDate(personInfo.birthDate);
    }
  }, [selectedPerson]);

  const handlePersonSelection = id => {
    setSelectedPerson(selectedPerson === id ? null : id);
  };

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
          <View className="flex-row items-center justify-between mb-6">
            {hospital.bedTypes.map((bed, index) => (
              <View key={index} className="items-center">
                <Text className="text-sm font-bold text-slate-700">
                  {bed.type}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Icon source="bed" size={16} color={theme.colors.secondary} />
                  <Text className="ml-1 text-slate-600 font-bold">
                    {bed.available}
                  </Text>
                </View>
              </View>
            ))}
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
          <Text className="text-lg font-bold mt-6 mb-2 text-black">
            Patient Reviews:
          </Text>
          {hospital.reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
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
          <Text className="text-lg font-bold mb-2 text-black">
            Select Saved Person:
          </Text>
          {savedPeople.map(person => (
            <View key={person.id} className="flex-row items-center mb-2">
              <Checkbox
                status={selectedPerson === person.id ? 'checked' : 'unchecked'}
                onPress={() => handlePersonSelection(person.id)}
                color={theme.colors.secondary}
              />
              <Text className="ml-2 text-black">{person.name}</Text>
            </View>
          ))}
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
