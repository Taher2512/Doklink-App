import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HospitalCard = ({ hospital }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Icon key={i} name="star" size={13} color="gold" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Icon key={i} name="star-half-full" size={13} color="gold" />);
      } else {
        stars.push(<Icon key={i} name="star-o" size={13} color="gold" />);
      }
    }
    return stars;
  };

  return (
    <View className="flex-row items-center bg-[#b9fafa] rounded-lg p-2 mb-12 relative border-2 border-[#125873] ">
      <View className="absolute z-10 -left-[2px] border-2 border-[#125873] -bottom-[2px] rounded-lg bg-white overflow-hidden w-36 h-32">
        <Image
          source={hospital.image}
          className=" w-full h-full"
          resizeMode='contain'
        />
      </View>
      <View className="flex-1 pl-40">
        <Text className="font-bold text-base text-[#125873]">{hospital.name}</Text>
        <Text className="text-xs text-gray-600">{hospital.location}</Text>
        <View className="flex-row items-center mt-1">
          <View className="flex-row">{renderStars(hospital.rating)}</View>
          <Text className="text-xs text-gray-600 ml-1">{hospital.rating} ({hospital.ratingCount})</Text>
        </View>
        <View className="flex-row items-center mt-1">
          <Text className="text-xs text-gray-600">Beds Available:</Text>
          <Text className="text-xs font-semibold text-[#125873]">{hospital.bedsAvailable}</Text>
        </View>
      </View>
    </View>
  );
};

export default HospitalCard;