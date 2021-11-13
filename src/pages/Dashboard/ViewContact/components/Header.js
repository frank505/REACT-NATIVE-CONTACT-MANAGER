import React from 'react'
import {Header as ViewContactHeader, Left, Body, Right, Title,Button,Icon } from 'native-base'
import Options from '../../../../layout/Dashboard/Options'
import {useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';

export default function Header() {

  const navigation = useNavigation();

   const goToSearchModal = () =>
   {
     navigation.navigate('SearchContactModal');
   }

    return (
        <ViewContactHeader>
          <Left/>
          <Body>
            <Title>View Contact</Title>
          </Body>
          <Right>
              { 
                Platform.OS==='ios'?
                <Icon name='search' onPress={goToSearchModal} style={{marginRight:10,fontSize:30}} />
                :
                <Icon name='search' onPress={goToSearchModal} style={{marginRight:10,fontSize:30,color:'white'}} />
              }
             
           
            <Options/>
            </Right>
        </ViewContactHeader>
    )
}
