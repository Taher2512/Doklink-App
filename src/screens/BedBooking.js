/*eslint-disable*/
import {Dimensions, FlatList, StatusBar, StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native';
import React,{useState,useEffect} from 'react';
import { Card, Searchbar, useTheme } from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import { ScrollView } from 'react-native-gesture-handler';
import BedBookingHorizontalCard from '../components/BedBookingHorizontalCard';
const {width,height}=Dimensions.get('window')
const BedBooking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [nearbyHospitals, setNearbyHospitals] = useState([
    {
      id: 'left-spacer',
    },
    {
      id: '1',
      name: 'City Hospital',
      address: '123, XYZ Street, ABC City',
      availableBeds: 10,
      distance: '2 km',
      image: 'https://picsum.photos/700',
    },
    {
      id: '2',
      name: 'Town Hospital',
      address: '456, PQR Street, DEF City',
      availableBeds: 5,
      distance: '5 km',
      image: 'https://picsum.photos/700',
    },
    {
      id: '3',
      name: 'Village Hospital',
      address: '789, LMN Street, GHI City',
      availableBeds: 3,
      distance: '10 km',
      image: 'https://picsum.photos/700', 
    },
    {
      id: 'right-spacer',
    },
  ]);
  const [currentLocation, setCurrentLocation] = useState('');
  const theme = useTheme();

  const handleSearch = () => {
    // For now, just log the search query
    // console.log('Searching for:', searchQuery);
    // In a real app, you would filter the hospitals based on the search query
  };

 

  useEffect(() => {
    // Get current location when component mounts
    Geolocation.getCurrentPosition(
      position => {
        setCurrentLocation(position.coords);
        console.log('Current location:', position.coords);
        // fetchNearbyHospitals(position.coords);
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  return (
    <View className="flex-1" style={{backgroundColor:'white'}}>
       <View style={{paddingTop:StatusBar.currentHeight+20,backgroundColor:theme.colors.secondary,borderBottomLeftRadius:25,borderBottomRightRadius:25}}>
    <Searchbar
          placeholder="Search location"
          icon={'map-marker-radius'}
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={handleSearch}
          cursorColor={theme.colors.secondary}
          className="mb-2"
          style={{
            borderColor: theme.colors.secondary,
            borderWidth: 2,
            backgroundColor: theme.colors.tertiary,
           marginHorizontal:20
          }}
        />
    </View>
    <ScrollView style={{flex:1,marginTop:20}} contentContainerStyle={{alignItems:'center'}} >
     <View style={styles.card} >
       <View style={{alignItems:'flex-start',justifyContent:'space-evenly',height:'100%'}}>
          <Text style={styles.cardtext}>Let's Find You</Text>
          <Text style={styles.cardtext}>The Nearest</Text>
          <Text style={styles.cardtext}>Hospital Bed</Text>
          <TouchableOpacity style={{height:30,padding:3,borderRadius:5,alignItems:'center',backgroundColor:'white',width:'auto'}}>
                 <Text style={{color:theme.colors.secondary,fontSize:14}}>Find Nearby</Text>
              </TouchableOpacity>
       </View>
      <Image style={{height:170,width:200,bottom:0,position:'absolute',zIndex:4,right:-10,resizeMode:'contain'}} source={require('../assets/icons/bed-booking-banner.png')}/>
     </View>
      <View style={{width:'100%',padding:20}}>
       <Text style={{fontSize:25,fontWeight:'bold',color:'black'}}>Nearby Hospitals</Text>
      </View>
      <View style={{height:320}}>
       <FlatList
         data={nearbyHospitals}
        horizontal
        keyExtractor={item=>item.id.toString()}
        ItemSeparatorComponent={()=><View style={{width:10}}/>}
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>{
          if(item.id=='left-spacer'||item.id=='right-spacer'){
            return<View style={{width:10}}/>
          }
          return(
          // <DocAppointHorizontalCard/>
          <BedBookingHorizontalCard width={width*0.65}/>
        )}}
       />
       {/* <View style={{width:20}}/> */}
       </View>
       
    </ScrollView>
    </View>
  );
};

export default BedBooking;

const styles = StyleSheet.create({
  card:{
    width:width-40,
    borderRadius:15,
    elevation:7,
    flexDirection:"row",
    padding:15,
    backgroundColor:'#6c9dec',
    justifyContent:'space-between',
    alignItems:'center',
    height:160
  },
  cardtext:{
    color:'white',
    fontSize:20
  }

});
