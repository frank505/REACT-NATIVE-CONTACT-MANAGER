import React from 'react'
import {Header as ViewSingleContactHeader, Left, Body, Right, Title,Icon } from 'native-base'
import Options from '../../../../layout/Dashboard/Options'
import {useNavigation} from '@react-navigation/native';
import { Platform } from 'react-native';



export default function Header() {

  const navigation = useNavigation();

 const goBack = () =>
  {
    navigation.goBack();
  }

    return (
        <ViewSingleContactHeader>
          <Left>
            {
              Platform.OS=='ios'?
              <Icon name="ios-arrow-back" onPress={goBack} />
              :
              <Icon name="ios-arrow-back" style={{color:'white'}} onPress={goBack} />
            }
          
            </Left>
          <Body>
            <Title>Contact Me</Title>
          </Body>
          <Right>
            <Options/>
            </Right>
        </ViewSingleContactHeader>
    )
}
