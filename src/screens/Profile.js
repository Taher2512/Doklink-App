import React from 'react';
import { View, ScrollView, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Avatar, Button, Card , useTheme} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const userData = {
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    bloodType: 'A+',
    age: 32,
    weight: '65 kg',
    height: '170 cm',
    upcomingAppointment: {
      doctor: 'Dr. Emily Clark',
      specialty: 'Cardiologist',
      date: 'May 15, 2024',
      time: '10:00 AM',
    },
    profilePicUrl: 'https://via.placeholder.com/150',
  };

  const handleEdit = () => {
    navigation.navigate('EditProfile', { userData });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1">
        <View className="bg-blue-500 pt-10 pb-20 rounded-b-3xl" style={{backgroundColor:theme.colors.secondary}}>
          <View className="flex-row items-center justify-between px-4">
            <View className="flex-row items-center">
              <Avatar.Image
                size={80}
                source={{ uri: userData.profilePicUrl }}
              />
              <View className="ml-4">
                <Text className="text-2xl text-white font-bold">{userData.fullName}</Text>
                <Text className="text-white opacity-80">{userData.email}</Text>
              </View>
            </View>
            <TouchableOpacity 
              className="bg-white rounded-full p-2"
              onPress={handleEdit}
            >
              <Icon name="pencil" size={24} color="#3b82f6" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-4 -mt-10">
          <Card className="bg-white rounded-xl shadow-md">
            <Card.Content>
              <Text className="text-lg font-semibold mb-2" style={{color:theme.colors.secondary}}>Health Information</Text>
              <View className="flex-row justify-between">
                <HealthInfo icon="water" label="Blood Type" value={userData.bloodType} />
                <HealthInfo icon="calendar" label="Age" value={`${userData.age} years`} />
                <HealthInfo icon="weight" label="Weight" value={userData.weight} />
                <HealthInfo icon="human-male-height" label="Height" value={userData.height} />
              </View>
            </Card.Content>
          </Card>

          <Card className="bg-white rounded-xl shadow-md mt-4">
            <Card.Content>
              <Text className="text-lg font-semibold mb-2 " style={{color:theme.colors.secondary}}>Upcoming Appointment</Text>
              <View className="flex-row items-center">
                <Avatar.Icon size={50} icon="doctor" backgroundColor="#e0f2fe" color="#3b82f6" />
                <View className="ml-4">
                  <Text className="font-semibold text-gray-600">{userData.upcomingAppointment.doctor}</Text>
                  <Text className="text-gray-600">{userData.upcomingAppointment.specialty}</Text>
                  <Text className="text-blue-500">
                    {userData.upcomingAppointment.date} at {userData.upcomingAppointment.time}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          <View className="mt-6 ">
            <Button
              mode="contained"
              onPress={() => navigation.navigate('BookAppointment')}
              className="mb-2"
              contentStyle={{ paddingVertical: 8 }}
              labelStyle={{ fontSize: 16 , color: 'white',fontWeight: 'semibold'}}
              style={{backgroundColor:theme.colors.secondary}}
              
            >
              Book New Appointment
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('MedicalHistory')}
              contentStyle={{ paddingVertical: 8 }}
              labelStyle={{ fontSize: 16 , color:theme.colors.secondary,fontWeight: 'semibold'}}
              style={{borderColor:theme.colors.secondary}}
              className="bg-white border-2"

            >
              View Medical History
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const HealthInfo = ({ icon, label, value }) => (
  <View className="items-center">
    <Icon name={icon} size={24} color="#3b82f6" />
    <Text className="text-xs text-gray-600 mt-1">{label}</Text>
    <Text className="font-semibold text-blue-600">{value}</Text>
  </View>
);

export default Profile;