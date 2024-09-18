import React from 'react';
import {View, Text} from 'react-native';
import {Card, Avatar, Icon} from 'react-native-paper';

const ReviewCard = ({name, date, rating, comment, profilePic}) => {
  return (
    <Card className="mb-4 bg-slate-200">
      <Card.Content>
        <View className="flex-row items-center mb-2">
          <Avatar.Image size={40} source={{uri: profilePic}} />
          <View className="ml-3 flex-1">
            <Text className="font-bold text-black">{name}</Text>
            <Text className="text-gray-500 text-xs">{date}</Text>
          </View>
          <View className="flex-row items-center">
            <Icon source="star" size={16} color="#FFD700" />
            <Text className="ml-1 font-bold">{rating}</Text>
          </View>
        </View>
        <Text className="text-gray-700">{comment}</Text>
      </Card.Content>
    </Card>
  );
};

export default ReviewCard;
