import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUpPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor="#125873" barStyle="light-content" />
      <ScrollView contentContainerClass="flexGrow">
        <View className="flex-1 h-screen pt-80">
          <View className="h-[565px] w-[565px] absolute -top-[425px] -left-16 bg-[#125873] rounded-bl-[93px]  -rotate-45">
            <Image
              source={require("../assets/logos/mainLogo.png")}
              className="w-36 h-36 absolute bottom-5 left-4 rotate-45"
              resizeMode="contain"
            />
          </View>
          <View className="flex-1 px-6  pb-6">
            <View className="items-center mb-8">
              <View className="w-24 h-24 bg-gray-200 rounded-full absolute top-[-48]" />
              <Text className="text-xl font-semibold mt-16 text-black">Profile</Text>
            </View>
            
            <View className="space-y-4">
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Full Name"
                placeholderTextColor="#999"
                value={fullName}
                onChangeText={setFullName}
              />
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Gender"
                placeholderTextColor="#999"
                value={gender}
                onChangeText={setGender}
              />
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Date of Birth"
                placeholderTextColor="#999"
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
              />
              <TextInput
                className="border border-gray-300 rounded-lg p-3"
                placeholder="Address"
                placeholderTextColor="#999"
                value={address}
                onChangeText={setAddress}
              />
            </View>
            
            <TouchableOpacity className="bg-[#125873] rounded-lg p-4 mt-8">
              <Text className="text-white text-center font-bold">DONE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({ });