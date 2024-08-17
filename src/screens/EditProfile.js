import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {TextInput, Button, Avatar, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EditProfile = ({route, navigation}) => {
  const [userData, setUserData] = useState(route.params.userData);

  const handleChange = (field, value) => {
    setUserData(prevData => ({...prevData, [field]: value}));
  };

  const handleSave = () => {
    console.log('Saving user data:', userData);
    navigation.goBack();
  };
  const theme = useTheme();

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className=" pt-16 pb-20 rounded-b-3xl items-center" style={{backgroundColor:theme.colors.secondary}} >
        <View className="relative">
          <Avatar.Image size={120} source={{uri: userData.profilePicUrl}} />
          <TouchableOpacity
            className="absolute bottom-0 right-0 bg-white rounded-full p-2"
            onPress={() => console.log('Change photo')}>
            <Icon name="camera" size={20} color="#3b82f6" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-4 py-6 -mt-10">
        <View className="bg-white rounded-xl shadow-md p-4 mb-4">
          <Text className="text-lg font-semibold mb-2">
            Personal Information
          </Text>
          <CustomInput
            label="Full Name"
            value={userData.fullName}
            onChangeText={text => handleChange('fullName', text)}
            icon="account"
          />
          <CustomInput
            label="Email"
            value={userData.email}
            onChangeText={text => handleChange('email', text)}
            icon="email"
          />
          <CustomInput
            label="Phone"
            value={userData.phone}
            onChangeText={text => handleChange('phone', text)}
            icon="phone"
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
            value={userData.age.toString()}
            onChangeText={text => handleChange('age', parseInt(text) || 0)}
            icon="calendar"
            keyboardType="numeric"
          />
          <CustomInput
            label="Weight (kg)"
            value={userData.weight.replace(' kg', '')}
            onChangeText={text => handleChange('weight', `${text} kg`)}
            icon="weight"
            keyboardType="numeric"
          />
          <CustomInput
            label="Height (cm)"
            value={userData.height.replace(' cm', '')}
            onChangeText={text => handleChange('height', `${text} cm`)}
            icon="human-male-height"
            keyboardType="numeric"
          />
        </View>

        <Button
          mode="contained"
          onPress={handleSave}
          className="mt-4"
          contentStyle={{paddingVertical: 8}}
          labelStyle={{fontSize: 16}}
          style={{backgroundColor: theme.colors.secondary}}
          >
          Save Changes
        </Button>
      </View>
    </ScrollView>
  );
};

const CustomInput = ({label, value, onChangeText, icon, ...props}) => (
  <View className="mb-4">
    <Text className="text-sm font-semibold text-gray-600 mb-1">{label}</Text>
    <View className="flex-row items-center bg-gray-100 rounded-lg">
      <Icon name={icon} size={20} color="#3b82f6" style={{marginLeft: 12}} />
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
