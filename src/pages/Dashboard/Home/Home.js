import React, { useEffect } from 'react'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreateContact from '../CreateContact'
import ViewContact from '../ViewContact';
import ContactSearch from '../ContactSearch';
import ViewSingleContact from '../ViewSingleContact';
import EditContact from '../EditContact';
import { HttpInterceptor } from '../../../HttpInterceptor';
import { useNavigation } from '@react-navigation/native';
import { cleanUpData, instantiateAbort } from '../../../helpers/componentHelperFunc';
import { Alert } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { resetTokenExpirationValue } from '../../../store/actions/AuthAction';


const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();



function tabNavigation ()
{

  

  return (<Tab.Navigator
  activeColor="#f0edf6"
inactiveColor="#3e2465"
barStyle={{ backgroundColor: '#694fad' }}
  >
  <Tab.Screen
   name="CreateContact"
   options={{
    tabBarLabel: 'New Contact',
    tabBarIcon: ({ color }) => (
      <Ionicons name="ios-add-circle" color={color} size={26} />
    ),
  }}
  component={CreateContact} 
  />

  <Tab.Screen 
  name="ViewContact" 
   options={{
    tabBarLabel: 'View Contact',
    tabBarIcon: ({ color }) => (
      <Ionicons name="ios-eye" color={color} size={26} />
    ),
  }}
  component={ViewContact} />
</Tab.Navigator>)
}








export default function Home() {

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const tokenExpirationState  = useSelector((state)=>state.authReducer.tokenExpired);

    const abortEffect = instantiateAbort();

    useEffect(() => {
        if(tokenExpirationState==true)
        {
          Alert.alert(
            "Token Expired",
            "Oops! your token has expired",
            [
               {
                   text:"OK",onPress:()=>console.log('token expired')
               },
        
            ]
        );
        dispatch(resetTokenExpirationValue());
          navigation.navigate('Login');
          
        }
      return () => {
       cleanUpData(abortEffect)
      }
    }, [tokenExpirationState])

    return (
      <>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      
      <Stack.Screen name="Tabs"     component={tabNavigation} />
      <Stack.Screen name="SearchContactModal" component={ContactSearch} />
      <Stack.Screen name="ViewSingleContact" component={ViewSingleContact} />
      <Stack.Screen name="EditContact" component={EditContact} />
      
    </Stack.Navigator>
    </>
    )
}
