/*eslint-disable*/
import Snackbar from 'react-native-snackbar'
export default function ShowMessage({message,error}) {
    Snackbar.show({
        text:message,
        textColor:"white",
        duration:Snackbar.LENGTH_SHORT,
        backgroundColor:error?"red":'green'
    })
}