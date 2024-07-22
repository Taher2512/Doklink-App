import React from 'react';
import { View, Image, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const HospitalCard = ({ hospital }) => {
  const theme = useTheme();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Icon key={i} name="star" size={14} color="yellow" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Icon key={i} name="star-half-full" size={14} color="yellow" />);
      } else {
        stars.push(<Icon key={i} name="star-outline" size={14} color="yellow" />);
      }
    }
    return stars;
  };

  return (
    <View className="m-2 bg-white rounded-lg max-h-60 w-40 overflow-hidden border-2 border-[#125873]">
      <LinearGradient
        colors={['#33333380', '#99999980']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        className="absolute top-0 left-0 right-0 bottom-0"
      />
      <Image
        source={hospital.image}
        className="w-36 h-32 rounded-lg"
      />
      <View className="flex items-center mt-1 bg-[#20D0CE66] h-full py-2 px-3 space-y-2 border-t border-[#125873]">
        <Text className="font-bold text-sm text-black text-center">{hospital.name}</Text>
        <Text className="text-xs text-gray-600">{hospital.location}</Text>
        <View className="flex-row items-center mt-1">
          {renderStars(parseFloat(hospital.rating))}
          <Text className="text-xs text-black ml-1">{hospital.rating}</Text>
        </View>
      </View>
    </View>
  );
};

export default HospitalCard;