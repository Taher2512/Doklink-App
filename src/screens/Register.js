import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Image, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button, Text } from 'react-native-paper';

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
          <View className="px-6  pb-6">
            <View className="items-center mb-8">
              <Text className="text-2xl font-semibold ">Enter Details</Text>
            </View>
            
            <View className="space-y-4">
              <TextInput
                label="Full Name"
                value={fullName}
                onChangeText={setFullName}
                mode="flat"
                className="bg-slate-100  rounded-lg text-gray-300"
              />
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                mode="flat"
                className="bg-slate-100  rounded-lg text-gray-300"
              />
              <TextInput
                label="Gender"
                value={gender}
                onChangeText={setGender}
                mode="flat"
                className="bg-slate-100  rounded-lg text-gray-300"
              />
              <TextInput
                label="Date of Birth"
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                mode="flat"
                className="bg-slate-100  rounded-lg text-gray-300"
              />
              <TextInput
                label="Address"
                value={address}
                onChangeText={setAddress}
                mode="flat"
                className="bg-slate-100  rounded-lg text-gray-300"
              />
            </View>
            
            <Button 
              mode="contained" 
              onPress={() => console.log('submit pressed')} 
              className="mt-8 py-2 bg-[#125873] "
              labelStyle="text-base font-bold"
              
            >
              Submit
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({ });