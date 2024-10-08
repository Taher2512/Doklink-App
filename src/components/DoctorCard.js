import React from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const DoctorCard = ({doctor}) => {
  const theme = useTheme();

  return (
    <View className="flex-row bg-white rounded-xl  mb-3 shadow-sm">
      <Image
        source={doctor.image}
        className="w-28 h-full rounded-xl mr-3"
        resizeMode="cover"
      />
      <View className="flex-1 justify-between py-2">
        <View className="flex-row space-x-4 items-center mt-2">
          <View className="flex-row items-center bg-gray-200 px-2 rounded-lg">
            <Icon name="location-outline" size={14} color="#6B7280" />
            <Text className="text-black text-xs ml-1">
              {doctor.distance} km
            </Text>
          </View>
          <View className="flex-row items-center bg-gray-200 px-2 rounded-lg">
            <Icon name="star" size={14} color="#FFC107" />
            <Text className="text-black text-xs ml-1">
              {doctor.rating} ({doctor.reviewCount})
            </Text>
          </View>
        </View>
        <View>
          <Text className="font-bold text-lg text-gray-700">{doctor.name}</Text>
          <Text className="text-gray-500 text-xs">{doctor.speciality}</Text>
        </View>
        <TouchableOpacity
          className="rounded-lg py-1 px-4 self-start mt-2"
          style={{backgroundColor: theme.colors.secondary}}>
          <Text className="text-white text-xs font-semibold">VIEW MORE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoctorCard;
