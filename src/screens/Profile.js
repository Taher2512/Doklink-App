import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, useTheme, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ShowMessage from '../components/dialogBox/ShowMessage';

const Profile = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userDoc = await firestore().collection('userdetail').where('email', '==', user.email).get();
          if (!userDoc.empty) {
            setUserData({ id: userDoc.docs[0].id, ...userDoc.docs[0].data() });
          } else {
            ShowMessage({ message: 'User data not found', error: true });
          }
        } else {
          ShowMessage({ message: 'User not authenticated', error: true });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        ShowMessage({ message: 'Error fetching user data', error: true });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    navigation.navigate('EditProfile', { userData });
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={theme.colors.secondary} />
      </View>
    );
  }

  if (!userData) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No user data available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1">
        <View className="bg-blue-500 pt-6 pb-20 rounded-b-3xl" style={{backgroundColor: theme.colors.secondary}}>
          <View className="flex-row items-center justify-between px-4">
            <View className="flex-row items-center">
              <Avatar.Image
                size={80}
                source={{ uri: userData.profilePicUrl || 'https://via.placeholder.com/150' }}
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
                <InfoRow  label="Mobile No." value={userData.mobile} />
                <InfoRow label="Country" value={userData.country} />
                <InfoRow  label="State" value={userData.state} />
                <InfoRow  label="City" value={userData.city} />
                <InfoRow  label="ZIP Code" value={userData.zipCode} />
                <InfoRow  label="Gender" value={userData.gender} />
                <InfoRow  label="Date of Birth" value={userData.dob} />
              </View>
            </Card.Content>
          </Card>

          <Card className="bg-white rounded-xl shadow-md mb-4">
            <Card.Content>
              <Text className="text-lg font-semibold mb-2" style={{color: theme.colors.secondary}}>Health Information</Text>
              <View className="flex-row justify-between flex-wrap">
                <HealthInfo icon="water" label="Blood Type" value={userData.bloodType} />
                <HealthInfo icon="calendar" label="Age" value={userData.age} />
                <HealthInfo icon="weight" label="Weight" value={userData.weight} />
                <HealthInfo icon="human-male-height" label="Height" value={userData.height} />
              </View>
            </Card.Content>
          </Card>

          <Card className="bg-white rounded-xl shadow-md mb-4">
            <Card.Content>
              <Text className="text-lg font-semibold mb-2" style={{color: theme.colors.secondary}}>Upcoming Appointment</Text>
              {userData.upcomingAppointment ? (
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
              ) : (
                <Text className="text-gray-500">No upcoming appointments</Text>
              )}
            </Card.Content>
          </Card>

          <View className="mt-6 mb-6">
            <Button
              mode="contained"
              onPress={() => navigation.navigate('BookAppointment')}
              className="mb-2"
              contentStyle={{ paddingVertical: 8 }}
              labelStyle={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}
              style={{backgroundColor: theme.colors.secondary}}
            >
              Book New Appointment
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('MedicalHistory')}
              contentStyle={{ paddingVertical: 8 }}
              labelStyle={{ fontSize: 16, color: theme.colors.secondary, fontWeight: 'bold' }}
              style={{borderColor: theme.colors.secondary}}
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

const InfoRow = ({ label, value }) => (
  <View className="flex-row items-center mb-2">
    <Text className="text-gray-600 flex-1">{label}:</Text>
    <Text className="font-semibold text-gray-800 flex-2">{value || '-'}</Text>
  </View>
);

const HealthInfo = ({ icon, label, value }) => (
  <View className="items-center mb-4 w-1/4">
    <Icon name={icon} size={24} color="#3b82f6" />
    <Text className="text-xs text-gray-600 mt-1">{label}</Text>
    <Text className="font-semibold text-blue-600">{value || '-'}</Text>
  </View>
);

export default Profile;