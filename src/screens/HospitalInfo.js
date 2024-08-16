import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Chip,
  Icon,
  IconButton,
  useTheme,
  Button,
} from 'react-native-paper';

const HospitalInfo = () => {
  const theme = useTheme();

  const hospital = {
    name: 'City General Hospital',
    rating: 4.5,
    openTime: '24/7',
    description:
      'City General Hospital is a state-of-the-art medical facility providing comprehensive healthcare services to our community. With a team of experienced doctors and modern equipment, we strive to deliver the best patient care.',
    categories: [
      'Cardiology',
      'Orthopedics',
      'ENT',
      'Dentistry',
      'Pediatrics',
      'Neurology',
    ],
  };

  return (
    <View className="flex-1 bg-slate-100">
      <ScrollView>
        <Image
          source={{
            uri: 'https://infrastructurepipeline.org/files/images/optimised/project_hero/files/images/project/generichospital7-6683a90066d1f804300495.jpg',
          }}
          className="w-full h-64"
        />
        <View className="p-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold mb-2 text-black">
              {hospital.name}
            </Text>
            <View className="flex-row items-center justify-center">
              <Icon source={'star'} size={14} color="#FFBF00" />
              <Text className="text-sm font-bold ml-1 text-slate-700">
                {hospital.rating}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between mb-2.5">
            <View className="flex-row items-center justify-center">
              <Icon
                source={'clock-time-nine-outline'}
                size={16}
                color="#475569"
              />
              <Text className="text-slate-600 font-bold ml-1">
                10:00 AM - 8:00 PM
              </Text>
            </View>
            <View className="bg-green-600 px-2.5 py-1 rounded-full">
              <Text className="text-white font-semibold text-xs">Open</Text>
            </View>
          </View>
          <View className="flex-row items-center mb-3">
            <Icon source={'map-marker'} size={16} color="#475569" />
            <Text className="text-slate-600 font-bold ml-1">
              123 Main St. Kolkata - 700015
            </Text>
          </View>
          <View className="flex-row items-center mb-6">
            <Icon source={'bed'} size={16} color="#475569" />
            <Text className="text-slate-600 font-bold ml-1">
              54 Beds Available
            </Text>
          </View>
          <Text className="text-lg font-bold mb-2 text-black">About:</Text>
          <Text
            className="mb-6 text-black leading-5"
            style={{fontWeight: 500, lineHeight: 22, fontSize: 14}}>
            {hospital.description}
          </Text>
          <Text className="text-lg font-bold mb-2 text-black">
            Available Specialties:
          </Text>
          <View className="flex-row flex-wrap">
            {hospital.categories.map((category, index) => (
              <Chip
                key={index}
                textStyle={{color: '#fff'}}
                className={`mr-2 mb-2 bg-[${theme.colors.secondary}]`}>
                {category}
              </Chip>
            ))}
          </View>
        </View>
      </ScrollView>
      <View className={'w-full h-28 items-center justify-center'}>
        <Button
          icon="bed"
          mode="contained"
          textColor={theme.colors.primary}
          buttonColor={theme.colors.secondary}
          className="w-5/6"
          onPress={() => console.log('Pressed')}>
          Book a bed
        </Button>
      </View>
    </View>
  );
};

export default HospitalInfo;
