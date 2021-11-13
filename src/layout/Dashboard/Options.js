import React from 'react'
import OptionsMenu from "react-native-options-menu";
import {useNavigation} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { LogoutService } from '../../services/AuthService';



export default function Options() {

  const navigation = useNavigation();

  const Cancel = () =>
  {
   
  }

  const Logout = () =>
  { 
   LogoutService().then(()=>{
    navigation.navigate('Login');
   });
    
  }
  
    return (  
        <OptionsMenu  
        customButton={(
            Platform.OS == 'ios'?
        <Icon style={{marginRight: 10,fontSize:25}} name='more-horiz'  />
        : 
        <Icon style={{marginRight: 10,color:'white',fontSize:25}} name='more-horiz'  />
        )}
        destructiveIndex={1}
        options={["Logout","Cancel"]}
        actions={[Logout,Cancel]}/>


    )
}
