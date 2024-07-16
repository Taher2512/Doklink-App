/*eslint-disable*/
import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

export default function CheckBox({checked,setchecked}) {
  return (
   <TouchableOpacity 
   onPress={()=>setchecked(!checked)}
    style={{height:30,width:30,borderColor:'black',borderRadius:4,backgroundColor:'white',padding:2,borderWidth:0.6}}
   >
    {checked&&<Image style={{height:"100%",width:'100%',tintColor:'green'}} source={require('../assets/icons/tick-mark.png')}/>}
   </TouchableOpacity>
  )
}
