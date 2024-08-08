/*eslint-disable*/
import { Link } from '@react-navigation/native'
import React,{useState} from 'react'
import { StatusBar, StyleSheet, View,Text, TouchableOpacity, FlatList, Image } from 'react-native'
import { Button, Searchbar, useTheme } from 'react-native-paper'
import DocAppointHorizontalCard from '../components/DocAppointHorizontalCard'


export default function DoctorBooking() {
  const [searchquery, setsearchquery] = useState('')
  const theme=useTheme()
  const colors=['#f77777',"#ecdca2","#8bcaee","#a9f47b"]
  const handleSearch=()=>{
    console.log('Searching for:', searchquery);
  }
let data=[
  {
    id:1,
    title:'Cardiologist',
    image:require('../assets/icons/cardiologist.png')
  },
  {
    id:2,
    title:'Neurologist',
    image:require('../assets/icons/neuroilogist.png')

  },
  {
    id:3,
    title:'ENT',
    image:require('../assets/icons/ent.png')
  },
  {
    id:4,
    title:'Dentist',
    image:require('../assets/icons/dental.png')
  }
]
let doctorapoointment=[
  {id:0},
  {id:1},
  {id:2},
  {id:3}
]
  return (
    <View style={[style.container,{paddingTop:StatusBar.currentHeight+20,padding:20}]}>
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
            backgroundColor: theme.colors.tertiary,
          }}
        />
        <View style={style.card}>
          <View style={style.cardleft}>
             <Text style={style.cardtext}>Book And</Text>
             <Text style={style.cardtext}>Schedule With</Text>
              <Text style={style.cardtext}>Nearest Doctor</Text>
              <TouchableOpacity style={{height:30,padding:3,borderRadius:5,alignItems:'center',backgroundColor:'white',width:'auto'}}>
                 <Text style={{color:theme.colors.secondary,fontSize:14}}>Find Nearby</Text>
              </TouchableOpacity>
          </View>
          <Image source={require('../assets/icons/dr1.png')} style={{height:'150%',width:120,zIndex:4,position:'absolute',right:10,bottom:0}}/>
        </View>
        <View style={{width:"100%",flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
             <Text style={{fontSize:25,color:theme.colors.textColor,fontWeight:'bold'}}>Categories</Text>
             <Link to='/doctorbooking'><Text style={{color:theme.colors.textColor,fontSize:17}}>View All</Text></Link>
        </View>    
        <View style={{height:110}}>
        <FlatList
        data={data}
        horizontal
        keyExtractor={item=>item.id.toString()}
        ItemSeparatorComponent={()=><View style={{width:10}}/>}
        renderItem={({item,index})=>(
          <View style={{gap:8,alignItems:'center'}}>
          <TouchableOpacity style={{height:80,backgroundColor:colors[index%4],borderRadius:100,justifyContent:'center',padding:15,width:80}}>
           <Image source={item.image} style={{width:"100%",height:"100%"}}/>
          </TouchableOpacity>
          <Text style={{color:theme.colors.textColor,fontSize:14,fontWeight:'bold'}}>{item.title}</Text>
          </View>
        )}
       />
        </View>   
      <View style={{width:'100%'}}>
       <Text style={{fontSize:23,fontWeight:"bold",color:theme.colors.textColor}}>Upcoming Appointments</Text>
       </View>
       <View style={{height:150}}>
       <FlatList
         data={doctorapoointment}
        horizontal
        keyExtractor={item=>item.id.toString()}
        ItemSeparatorComponent={()=><View style={{width:10}}/>}
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>(
          <DocAppointHorizontalCard/>
        )}
       />
       </View>
       <View style={{width:'100%'}}>
       <Text style={{fontSize:23,fontWeight:"bold",color:theme.colors.textColor}}>Recommended Doctors</Text>
       </View>
        
    </View>
  )
}
const style=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    alignItems:"center",
    gap:15,
    justifyContent:'flex-start'

  },
  card:{
    width:'100%',
    height:150,
    backgroundColor:'#6c9dec',
    borderRadius:15,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:15,
     marginTop:15
  },
  cardleft:{
    height:"100%",
    gap:5,
    justifyContent:"center"
  },
  cardtext:{
    color:'white',
    fontSize:20
  }
})