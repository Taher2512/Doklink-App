/*eslint-disable*/
import {Link} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import {Searchbar, useTheme} from 'react-native-paper';
import DocAppointHorizontalCard from '../components/DocAppointHorizontalCard';
import DocAppointVerticalCard from '../components/DocAppointVerticalCard';

export default function DoctorAppointment() {
  const [searchquery, setsearchquery] = useState('');
  const theme = useTheme();
  const colors = ['#f77777', '#ecdca2', '#8bcaee', '#a9f47b'];
  const handleSearch = () => {
    console.log('Searching for:', searchquery);
  };
  let data = [
    {
      id: 1,
      title: 'Cardiologist',
      image: require('../assets/icons/cardiologist.png'),
    },
    {
      id: 2,
      title: 'Neurologist',
      image: require('../assets/icons/neuroilogist.png'),
    },
    {
      id: 3,
      title: 'ENT',
      image: require('../assets/icons/ent.png'),
    },
    {
      id: 4,
      title: 'Dentist',
      image: require('../assets/icons/dental.png'),
    },
  ];
  let doctorAppointmentData = [
    {id: 'left-space'},
    {id: 0},
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 'right-spacer'},
  ];
  let recommendedDoctors = [{id: 0}, {id: 1}, {id: 2}, {id: 3}];
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          paddingTop: StatusBar.currentHeight + 20,
          backgroundColor: theme.colors.secondary,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        }}>
        <Searchbar
          placeholder="Search location"
          icon={'map-marker-radius'}
          onChangeText={setsearchquery}
          value={searchquery}
          onSubmitEditing={handleSearch}
          cursorColor={theme.colors.secondary}
          className="mb-2"
          style={{
            borderColor: theme.colors.secondary,
            borderWidth: 2,
            backgroundColor: '#fff',
            marginHorizontal: 20,
          }}
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 15,
        }}
        style={[style.container]}>
        <View
          style={{
            paddingHorizontal: 20,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 15,
          }}>
          <View style={style.card}>
            <View style={style.cardleft}>
              <Text style={style.cardtext}>Book And</Text>
              <Text style={style.cardtext}>Schedule With</Text>
              <Text style={style.cardtext}>Nearest Doctor</Text>
              <TouchableOpacity
                style={{
                  height: 30,
                  padding: 3,
                  borderRadius: 5,
                  alignItems: 'center',
                  backgroundColor: 'white',
                  width: 'auto',
                }}>
                <Text style={{color: theme.colors.secondary, fontSize: 14}}>
                  Find Nearby
                </Text>
              </TouchableOpacity>
            </View>
            <Image
              source={require('../assets/icons/dr1.png')}
              style={{
                height: '150%',
                width: 120,
                zIndex: 4,
                position: 'absolute',
                right: 10,
                bottom: 0,
              }}
            />
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 25,
                color: theme.colors.textColor,
                fontWeight: 'bold',
              }}>
              Categories
            </Text>
            <Link to="/DoctorAppointment">
              <Text style={{color: theme.colors.textColor, fontSize: 17}}>
                View All
              </Text>
            </Link>
          </View>

          <View style={{height: 110}}>
            <FlatList
              data={data}
              horizontal
              keyExtractor={item => item.id.toString()}
              ItemSeparatorComponent={() => <View style={{width: 10}} />}
              renderItem={({item, index}) => (
                <View style={{gap: 8, alignItems: 'center'}}>
                  <TouchableOpacity
                    style={{
                      height: 80,
                      backgroundColor: colors[index % 4],
                      borderRadius: 100,
                      justifyContent: 'center',
                      padding: 15,
                      width: 80,
                    }}>
                    <Image
                      source={item.image}
                      style={{width: '100%', height: '100%'}}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: theme.colors.textColor,
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    {item.title}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
        <View style={{width: '100%', paddingHorizontal: 20}}>
          <Text
            style={{
              fontSize: 23,
              fontWeight: 'bold',
              color: theme.colors.textColor,
            }}>
            Upcoming Appointments
          </Text>
        </View>
        <View style={{height: 150}}>
          <FlatList
            data={doctorAppointmentData}
            horizontal
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{width: 10}} />}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              if (item.id == 'left-space' || item.id == 'right-spacer') {
                return <View style={{width: 10}} />;
              }
              return <DocAppointHorizontalCard />;
            }}
          />
        </View>
        <View style={{width: '100%', paddingHorizontal: 20}}>
          <Text
            style={{
              fontSize: 23,
              fontWeight: 'bold',
              color: theme.colors.textColor,
            }}>
            Recommended Doctors
          </Text>
        </View>
        {recommendedDoctors &&
          recommendedDoctors.map((item, index) => (
            <DocAppointVerticalCard key={index} />
          ))}
        <View style={{height: 50}} />
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    gap: 15,
  },
  card: {
    width: '100%',
    height: 150,
    backgroundColor: '#6c9dec',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginTop: 25,
  },
  cardleft: {
    height: '100%',
    gap: 5,
    justifyContent: 'center',
  },
  cardtext: {
    color: 'white',
    fontSize: 20,
  },
});
