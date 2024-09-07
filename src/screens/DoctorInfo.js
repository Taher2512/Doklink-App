import React, {useState, useEffect} from 'react';
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

const DoctorInfo = () => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [useUserInfo, setUseUserInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const doctor = {
    name: 'Dr. Jane Smith',
    specialization: 'Cardiologist',
    rating: 4.8,
    experience: '15 years',
    description:
      'Dr. Jane Smith is a highly skilled cardiologist with extensive experience in treating various heart conditions. She is known for her compassionate care and innovative approach to cardiac health.',
    languages: ['English', 'Spanish', 'French'],
    education: 'MD from Harvard Medical School',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
  };

  useEffect(() => {
    if (useUserInfo) {
      fetchUserInfo();
    }
  }, [useUserInfo]);

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
      setLoading(false);
    }
  };

  const getNextAvailableDates = () => {
    const today = new Date();
    const availableDates = doctor.availableDays.map(day => {
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
      return {day, date: nextDate};
    });
    return availableDates.sort((a, b) => a.date - b.date);
  };

  const handleDaySelection = day => {
    setSelectedDay(day);
    const selectedDate = getNextAvailableDates().find(d => d.day === day).date;
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
            Available Days:
          </Text>
          <View className="flex-row flex-wrap">
            {doctor.availableDays.map((day, index) => (
              <Chip
                key={index}
                textStyle={{color: '#fff'}}
                className={`mr-2 mb-2 bg-[${theme.colors.secondary}]`}>
                {day}
              </Chip>
            ))}
          </View>
        </View>
      </ScrollView>
      <View className={'w-full h-28 items-center justify-center'}>
        <Button
          icon="calendar"
          mode="contained"
          textColor={theme.colors.primary}
          buttonColor={theme.colors.secondary}
          className="w-5/6"
          onPress={showModal}>
          Book Appointment
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
          <Text className="text-2xl font-bold mb-4 text-black">
            Book Appointment
          </Text>
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
          <Text className="text-lg font-bold mb-2 text-black">
            Select Appointment Day:
          </Text>
          <RadioButton.Group
            onValueChange={handleDaySelection}
            value={selectedDay}>
            {getNextAvailableDates().map(({day, date}) => (
              <View key={day} className="flex-row items-center mb-2">
                <RadioButton value={day} color={theme.colors.secondary} />
                <Text className="ml-2">{`${day} (${format(
                  date,
                  'MMM d, yyyy',
                )})`}</Text>
              </View>
            ))}
          </RadioButton.Group>
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
            disabled={loading || !selectedDay}>
            {loading ? 'Booking...' : 'Confirm Appointment'}
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

export default DoctorInfo;
