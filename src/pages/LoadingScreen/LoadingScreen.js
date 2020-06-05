import React,{useEffect} from 'react'
import { Container,Content, View } from 'native-base'
import { ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { instantiateAbort, cleanUpData } from '../../helpers/componentHelperFunc';
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from './styles';

export default function LoadingScreen() 
{
    const navigation = useNavigation();

    const abortEffect = instantiateAbort();

    useEffect(() => {
        
        const bootstrapAsync = async() =>
        {
         let token = await AsyncStorage.getItem('user');
         if(token==null)
         {
            navigation.navigate('Login');
           
         }else 
         {
          
            navigation.navigate('Dashboard');
        
         }

        }

        bootstrapAsync();
         
        return () => {
            cleanUpData(abortEffect)
        }
    }, [])

    

    return (
        <Container style={styles.container}>
            <Content>
                <View style={styles.centerContent}>
                <ActivityIndicator style={styles.activityPosition}  size="large" 
                 />
                </View>
               
            </Content>
        </Container>
    )
}
