import React, {useState, useEffect, useMemo} from 'react';
import {View, Text, ScrollView, Image, StatusBar} from 'react-native';
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
  RadioButton,
} from 'react-native-paper';
import DateSelector from '../components/DateSelector';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {format, addDays, nextDay, isBefore} from 'date-fns';
import ReviewCard from '../components/ReviewCard';
import ShowMessage from '../components/dialogBox/ShowMessage';

const EmergencyDoctorInfo = () => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
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

  const doctor = {
    name: 'Dr. Jane Smith',
    clinicName: 'Smith Cardiology Clinic',
    specialization: 'Cardiologist',
    rating: 4.8,
    experience: '15 years',
    description:
      'Dr. Jane Smith is a highly skilled cardiologist with extensive experience in treating various heart conditions. She is known for her compassionate care and innovative approach to cardiac health.',
    languages: ['English', 'Spanish', 'French'],
    education: 'MD from Harvard Medical School',
    location: '123 Medical Center Ave, New York, NY 10001',
    availableDays: [
      {day: 'Monday', time: '9:00 AM - 1:00 PM'},
      {day: 'Wednesday', time: '2:00 PM - 6:00 PM'},
      {day: 'Friday', time: '10:00 AM - 2:00 PM'},
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
      fetchUserInfo();
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
        const {fullName, email, mobile} = JSON.parse(userInfo);
        setFullName(fullName);
        setEmail(email);
        setMobile(mobile);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleBookAppointment = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://your-api-endpoint.com/book-appointment',
        {
          fullName,
          email,
          mobile,
          appointmentDate,
          doctorName: doctor.name,
        },
      );

      console.log('Booking response:', response.data);
      // Handle successful booking (e.g., show success message, navigate to confirmation page)
      hideModal();
    } catch (error) {
      console.error('Error booking appointment:', error);
      // Handle error (e.g., show error message)
    } finally {
      ShowMessage({
        message: 'Appointment Booked! You will be contacted shortly...',
        error: false,
      });
      setLoading(false);
    }
  };

  const getNextAvailableDates = useMemo(() => {
    const today = new Date();
    return doctor.availableDays
      .map(({day, time}) => {
        const dayIndex = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ].indexOf(day);
        let nextDate = nextDay(today, dayIndex);
        if (isBefore(nextDate, today)) {
          nextDate = addDays(nextDate, 7);
        }
        return {day, time, date: nextDate};
      })
      .sort((a, b) => a.date - b.date);
  }, []);

  const handleDaySelection = selectedDay => {
    setSelectedDay(selectedDay);
    const selectedDate = getNextAvailableDates.find(
      d => d.day === selectedDay,
    ).date;
    setAppointmentDate(format(selectedDate, 'yyyy-MM-dd'));
  };

  return (
    <View className="flex-1" style={{marginTop: StatusBar.currentHeight + 15}}>
      <ScrollView>
        <Image
          source={require('../assets/icons/top_doctor.jpg')}
          className="w-40 h-40 rounded-full self-center"
        />
        <View className="p-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold mb-2 text-black">
              {doctor.name}
            </Text>
            <View className="flex-row items-center justify-center">
              <Icon source={'star'} size={14} color="#FFBF00" />
              <Text className="text-sm font-bold ml-1 text-slate-700">
                {doctor.rating}
              </Text>
            </View>
          </View>
          <Text className="text-lg font-semibold text-slate-600 mb-2">
            {doctor.specialization}
          </Text>
          <View className="flex-row items-center mb-3">
            <Icon source={'hospital-building'} size={16} color="#475569" />
            <Text className="text-slate-600 font-bold ml-1">
              {doctor.clinicName}
            </Text>
          </View>
          <View className="flex-row items-center mb-3">
            <Icon source={'map-marker'} size={16} color="#475569" />
            <Text className="text-slate-600 font-bold ml-1">
              123 Main St. Kolkata - 700015
            </Text>
          </View>
          <View className="flex-row items-center mb-3">
            <Icon source={'briefcase'} size={16} color="#475569" />
            <Text className="text-slate-600 font-bold ml-1">
              {doctor.experience} experience
            </Text>
          </View>
          <View className="flex-row items-center mb-6">
            <Icon source={'school'} size={16} color="#475569" />
            <Text className="text-slate-600 font-bold ml-1">
              {doctor.education}
            </Text>
          </View>
          <Text className="text-lg font-bold mb-2 text-black">About:</Text>
          <Text
            className="mb-6 text-black leading-5"
            style={{fontWeight: 500, lineHeight: 22, fontSize: 14}}>
            {doctor.description}
          </Text>
          <Text className="text-lg font-bold mb-2 text-black">
            Languages Spoken:
          </Text>
          <View className="flex-row flex-wrap mb-4">
            {doctor.languages.map((language, index) => (
              <Chip
                key={index}
                textStyle={{color: '#fff'}}
                className={`mr-2 mb-2 bg-[${theme.colors.secondary}]`}>
                {language}
              </Chip>
            ))}
          </View>
          <Text className="text-lg font-bold mb-2 text-black">
            Patient Reviews:
          </Text>
          {doctor.reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </View>
      </ScrollView>
      <View className={'w-full h-28 items-center justify-center'}>
        <Button
          icon="clock-fast"
          mode="contained"
          textColor={theme.colors.primary}
          buttonColor={theme.colors.secondary}
          className="w-5/6"
          onPress={showModal}>
          Book Emergency Appointment
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
          <Text className="text-xl font-bold mb-4 text-black">
            Book Emergency Appointment
          </Text>
          <Text className="text-base font-bold mb-2 text-[#777]">
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
          {appointmentDate && (
            <Text className="mt-2 text-black">
              Selected Date: {format(new Date(appointmentDate), 'MMMM d, yyyy')}
            </Text>
          )}
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
            onPress={handleBookAppointment}
            className="mt-4"
            buttonColor={theme.colors.secondary}
            loading={loading}
            disabled={loading}>
            {loading ? 'Booking...' : 'Confirm Emergency Appointment'}
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

export default EmergencyDoctorInfo;
