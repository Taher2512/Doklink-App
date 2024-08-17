import React from 'react';
import { View, ScrollView, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const userData = {
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94105',
    gender: 'Female',
    dateOfBirth: '1992-05-15',
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
        <View className="bg-blue-500 pt-6 pb-20 rounded-b-3xl" style={{backgroundColor: theme.colors.secondary}}>
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
          <Card className="bg-white rounded-xl shadow-md mb-4">
            <Card.Content>
              <Text className="text-lg font-semibold mb-2" style={{color: theme.colors.secondary}}>Personal Information</Text>
              <View className="space-y-2">
                <InfoRow label="Mobile No." value={userData.phone} />
                <InfoRow label="Country" value={userData.country} />
                <InfoRow label="State" value={userData.state} />
                <InfoRow label="City" value={userData.city} />
                <InfoRow label="ZIP Code" value={userData.zipCode} />
                <InfoRow label="Gender" value={userData.gender} />
                <InfoRow label="Date of Birth" value={userData.dateOfBirth} />
              </View>
            </Card.Content>
          </Card>

          <Card className="bg-white rounded-xl shadow-md mb-4">
            <Card.Content>
              <Text className="text-lg font-semibold mb-2" style={{color: theme.colors.secondary}}>Health Information</Text>
              <View className="flex-row justify-between flex-wrap">
                <HealthInfo icon="water" label="Blood Type" value={userData.bloodType} />
                <HealthInfo icon="calendar" label="Age" value={`${userData.age} years`} />
                <HealthInfo icon="weight" label="Weight" value={userData.weight} />
                <HealthInfo icon="human-male-height" label="Height" value={userData.height} />
              </View>
            </Card.Content>
          </Card>

          <Card className="bg-white rounded-xl shadow-md mb-4">
            <Card.Content>
              <Text className="text-lg font-semibold mb-2" style={{color: theme.colors.secondary}}>Upcoming Appointment</Text>
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

          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoRow = ({ label, value }) => (
  <View className="flex-row items-center mb-1">
    
    <Text className="text-gray-600 flex-1">{label}:</Text>
    <Text className="font-semibold text-gray-800 flex-2">{value}</Text>
  </View>
);

const HealthInfo = ({ icon, label, value }) => (
  <View className="items-center mb-4 w-1/4">
    <Icon name={icon} size={24} color="#3b82f6" />
    <Text className="text-xs text-gray-600 mt-1">{label}</Text>
    <Text className="font-semibold text-blue-600">{value}</Text>
  </View>
);

export default Profile;