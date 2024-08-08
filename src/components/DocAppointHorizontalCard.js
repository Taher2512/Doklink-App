/*eslint-disable*/
import React from 'react'
import { StyleSheet, TouchableOpacity,View,Text, Image, Dimensions } from 'react-native'
import { useTheme } from 'react-native-paper'

export default function DocAppointHorizontalCard({data}) {
    const theme=useTheme()
    const {width}=Dimensions.get('window')
  return (
    <TouchableOpacity style={{...styles.container,width:width*0.72}}>
        <View style={styles.card}>
           <View style={styles.innercard}>
            <Text style={{color:theme.colors.textColor,fontSize:18,fontWeight:'bold'}} >Dr. Rajesh Khanna</Text>
            <Text style={{color:"grey",fontSize:14,fontWeight:'normal'}} >Clinical Psychologist</Text>
           </View>
           <Image source={require('../assets/icons/doctorappoint1.png')} style={{height:'100%',width:70,borderRadius:5}} />
        </View>
        <View style={styles.lowerCard}>
         <View style={styles.lowerinner}>
            <Image source={require('../assets/icons/hospitalicon.png')}/>
            <Text style={{color:theme.colors.primary,fontSize:15,fontWeight:'normal',textAlign:'center'}}>Kothari Hospital</Text>
         </View>
         <View style={{height:50,gap:2,alignItems:"center"}}>
           <View style={{height:"50%",width:2,backgroundColor:theme.colors.primary}}/>
           <View style={{height:"50%",width:2,backgroundColor:theme.colors.primary}}/>
         </View>
         <View style={styles.lowerinner}>
            <Image source={require('../assets/icons/time.png')} />
            <View style={{alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:theme.colors.primary,fontSize:15,fontWeight:'normal',textAlign:'center'}}>04:00 PM</Text>
            <Text style={{color:theme.colors.primary,fontSize:15,fontWeight:'normal',textAlign:'center'}}>Mon,Aug 5</Text>
            </View>
         </View>
        </View>
    </TouchableOpacity>
  )
}
const styles=StyleSheet.create({
    container:{
        paddingHorizontal:5,
        backgroundColor:'#6c9dec',
        gap:5,
        borderRadius:10,
        paddingVertical:8,
    },
    card:{
        width:'100%',
        backgroundColor:'white',
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:10,
        height:80,
        paddingVertical:3
    },  
    innercard:{
       gap:7,
        justifyContent:'center',
         alignItems:'center'
    },
    lowerCard:{
        width:"100%",
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
    },
    lowerinner:{
        flexDirection:'row',
        gap:5,
        alignItems:'center',
        width:'30%'
    }
})