import React, { useState } from 'react';
import { View, ScrollView, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { TextInput, Button, Avatar, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import ShowMessage from '../components/dialogBox/ShowMessage';

const EditProfile = ({ route, navigation }) => {
  const [userData, setUserData] = useState(route.params.userData);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleChange = (field, value) => {
    setUserData(prevData => ({ ...prevData, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await firestore().collection('userdetail').doc(userData.id).update(userData);
      ShowMessage({ message: 'Profile updated successfully' });
      navigation.goBack();
    } catch (error) {
      console.error('Error updating profile:', error);
      ShowMessage({ message: 'Error updating profile', error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="pt-16 pb-20 rounded-b-3xl items-center" style={{backgroundColor: theme.colors.secondary}}>
        <View className="relative">
          <Avatar.Image size={120} source={{ uri: userData.profilePicUrl || 'https://via.placeholder.com/150' }} />
          <TouchableOpacity
            className="absolute bottom-0 right-0 bg-white rounded-full p-2"
            onPress={() => console.log('Change photo')}>
            <Icon name="camera" size={20} color="#3b82f6" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-4 py-6 -mt-10">
        <View className="bg-white rounded-xl shadow-md p-4 mb-4">
          <Text className="text-lg font-semibold mb-2">Personal Information</Text>
          <CustomInput
            label="Full Name"
            value={userData.fullName}
            onChangeText={text => handleChange('fullName', text)}
            icon="account"
          />
          <CustomInput
            label="Mobile No."
            value={userData.mobile}
            onChangeText={text => handleChange('mobile', text)}
            icon="phone"
          />
          <CustomInput
            label="Country"
            value={userData.country}
            onChangeText={text => handleChange('country', text)}
            icon="map-marker"
          />
          <CustomInput
            label="State"
            value={userData.state}
            onChangeText={text => handleChange('state', text)}
            icon="city"
          />
          <CustomInput
            label="City"
            value={userData.city}
            onChangeText={text => handleChange('city', text)}
            icon="home-city"
          />
          <CustomInput
            label="ZIP Code"
            value={userData.zipCode}
            onChangeText={text => handleChange('zipCode', text)}
            icon="zip-box"
          />
          <CustomInput
            label="Gender"
            value={userData.gender}
            onChangeText={text => handleChange('gender', text)}
            icon="gender-male-female"
          />
          <CustomInput
            label="Date of Birth"
            value={userData.dob}
            onChangeText={text => handleChange('dob', text)}
            icon="cake-variant"
          />
        </View>

        <View className="bg-white rounded-xl shadow-md p-4 mb-4">
          <Text className="text-lg font-semibold mb-2">Health Information</Text>
          <CustomInput
            label="Blood Type"
            value={userData.bloodType}
            onChangeText={text => handleChange('bloodType', text)}
            icon="water"
          />
          <CustomInput
            label="Age"
            value={userData.age ? userData.age.toString() : ''}
            onChangeText={text => handleChange('age', text)}
            icon="calendar"
            keyboardType="numeric"
          />
          <CustomInput
            label="Weight (kg)"
            value={userData.weight}
            onChangeText={text => handleChange('weight', text)}
            icon="weight"
            keyboardType="numeric"
          />
          <CustomInput
            label="Height (cm)"
            value={userData.height}
            onChangeText={text => handleChange('height', text)}
            icon="human-male-height"
            keyboardType="numeric"
          />
        </View>

        <Button
          mode="contained"
          onPress={handleSave}
          className="mt-4"
          contentStyle={{ paddingVertical: 8 }}
          labelStyle={{ fontSize: 16 }}
          style={{ backgroundColor: theme.colors.secondary }}
          loading={loading}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </View>
    </ScrollView>
  );
};

const CustomInput = ({ label, value, onChangeText, icon, ...props }) => (
  <View className="mb-4">
    <Text className="text-sm font-semibold text-gray-600 mb-1">{label}</Text>
    <View className="flex-row items-center bg-gray-100 rounded-lg">
      <Icon name={icon} size={20} color="#3b82f6" style={{ marginLeft: 12 }} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        className="flex-1 bg-transparent"
        underlineColor="transparent"
        {...props}
      />
    </View>
  </View>
);

export default EditProfile;