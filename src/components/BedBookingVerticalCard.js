/*eslint-disable*/
import React from 'react'
import { Dimensions, Image, StyleSheet,TouchableOpacity,View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
const {width}=Dimensions.get('window')
export default function BedBookingVerticalCard() {
    const theme=useTheme()
  return (
    <View style={{...styles.container}}>
       <View style={{...styles.leftContainer}}>
        <Image style={{height:'100%',width:'100%',borderRadius:10,}} source={require('../assets/icons/hospital1.jpg')}/>
       </View>
       <View style={{...styles.rightContainer}}>
           <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
             <View style={{...styles.tags}}>
             <Image style={{height:16,width:16}} source={require('../assets/icons/star.png')}/>
            <Text style={{color:theme.colors.textColor,fontSize:12,fontWeight:'normal'}}>4.6 (150)</Text>
             </View>
           </View>
           <View style={{gap:2}}>
              <Text style={{color:theme.colors.textColor,fontSize:16,fontWeight:'bold'}}>Fortis Hospital</Text>
              <View style={{width:'100%',flexDirection:'row',gap:5,alignItems:'center'}}>
                <Image style={{height:18,width:18}} source={require('../assets/icons/location1.png')}/>
              <Text style={{color:'grey',fontSize:12,fontWeight:'normal'}}>730, Eastern Metropolitan Bypass Rd, Anandapur</Text>
              </View>
           </View>
           <TouchableOpacity style={{backgroundColor:theme.colors.secondary,padding:5,borderRadius:10,width:120,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'white',fontSize:13,fontWeight:'normal'}}>View More</Text>
           </TouchableOpacity>
       </View>
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        height:130,
        width:width-40,
        backgroundColor:"white",
        elevation:7,
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'flex-start',
        gap:15,
        
    },
    leftContainer:{
        height:'100%',
        width:110
    },
    rightContainer:{
        flex:1,
        // paddingVertical:6,
        alignItems:'flex-start',
        justifyContent:'space-around',
    },
    tags:{
        backgroundColor:'rgba(0,0,0,0.2)',
        padding:5,
        borderRadius:5,
        flexDirection:'row',
        alignItems:'center',
        gap:3
    }
})