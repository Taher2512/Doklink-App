/*eslint-disable*/
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const HospitalCard = ({hospital}) => {
  const theme = useTheme();

  return (
    <View
      style={{width: 200, marginRight: 10}}
      className="bg-white rounded-lg overflow-hidden shadow-md">
      <Image
        source={hospital.image}
        className="w-full h-32 rounded-xl"
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="text-lg font-bold text-gray-700 text-center">
          {hospital.name}
        </Text>
        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-row items-center bg-gray-200 px-2 rounded-lg">
            <Icon name="location-outline" size={16} color="#000" />
            <Text className="text-xs text-black ml-1">
              {hospital.distance} km
            </Text>
          </View>
          <View className="flex-row items-center bg-gray-200 px-2 rounded-lg">
            <Icon name="star" size={16} color="#FFC107" />
            <Text className="text-xs text-black ml-1">
              {hospital.rating} ({hospital.reviewCount})
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className="rounded-md mt-3 py-2 items-center"
          style={{backgroundColor: theme.colors.secondary}}>
          <Text className="text-white font-semibold text-sm">VIEW MORE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HospitalCard;
