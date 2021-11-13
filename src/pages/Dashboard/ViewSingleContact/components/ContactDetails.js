import React,{useState,useEffect} from 'react'
import {Image,View, ActivityIndicator} from 'react-native';
import { 
    Button,Icon, Left, Right, Body, Text, ListItem,List} from "native-base";
  import { styles } from '../styles'
import { cleanUpData, instantiateAbort } from '../../../../helpers/componentHelperFunc';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch,useSelector } from 'react-redux';
import { GetSingleContactAction } from '../../../../store/actions/ContactsAction';
import ContentLoader, { Rect, Circle, BulletList,List as ListLoader } from 'react-content-loader/native'
import Communications from 'react-native-communications';
 
 
export default function ContactDetails() 
{

  const abortEffect = instantiateAbort();

  const dispatch = useDispatch();

  const singleResponse = useSelector(state=>state.contactReducer.getSingleContactState);

   const route = useRoute();

   const { contactId } = route.params;


   const loadAnimation = () =>
   {
     return (
      <View style={{width:'90%',marginLeft:"5%",marginRight:'5%'}}>
        <ContentLoader
     height={10}
    style={{height:800,marginTop:-300}}
    speed={1}
    viewBox="0 0 380 70"
  >
    {/* Only SVG shapes */}
    <Circle x="80" cx="100" cy="100" r="100" />
  <Rect x="0" y="220"  width="100%" height="100" />
<Rect x="0" y="270"  width="100%" height="100" />
<Rect x="0" y="400"  width="100%" height="150" />

  </ContentLoader> 


    </View>
     );
   }  


 
  useEffect(() => {
    
    dispatch(GetSingleContactAction(contactId));

    return () => {
      cleanUpData(abortEffect);
    }
  }, []);


   const callContact = (phonenumber) =>{
    console.log('user is being called'+phonenumber)
      Communications.phonecall("'"+phonenumber+"'",true);
}

const textContact = (phonenumber) =>{
    console.log('user is being sent a text message'+phonenumber)
    Communications.text("'"+phonenumber+"'");
}

 const emailContact = (email)=>{
    console.log('user is being sent email'+email)
  Communications.email(["'"+email+"'"],null,null,null,null)
}

   

    return (
        <View>
         {singleResponse=="" || singleResponse=="loading" ?
        
        loadAnimation()
           :
         <>
         <View style={{marginTop:20}}>
           {
             singleResponse.data.image_file=="" || singleResponse.data.image_file==null ||
             singleResponse.data.image_file=="default-avatar.png" ?
             <Image source={require('../../../../assets/images/default-avatar.png')} 
             style={styles.imgStyle}/>
             :
             <Image source={{uri:singleResponse.file_directory+"/"+singleResponse.data.image_file}} 
             style={styles.imgStyle}/>
           }
       
        <Text  style={styles.name} >{singleResponse.data.firstname+" "+singleResponse.data.lastname}</Text>
        </View> 
              <List  >
              <ListItem style={styles.listCustomStyles} >
              <View style={styles.setViewWidth}  >
                      <Button transparent style={styles.flexDirectionForBtn} 
                      onPress={()=>{callContact(singleResponse.data.country_code+singleResponse.data.phonenumber)}}
                      > 
              <Icon style={styles.iconColor} name='md-phone-portrait' />
                    <Text>Phone</Text>
                    </Button>
                       </View>
    
    
            <View style={styles.setViewWidth} >
            <Button transparent  style={styles.flexDirectionForBtn} 
            onPress={()=>{textContact(singleResponse.data.country_code+singleResponse.data.phonenumber)}}
            > 
              <Icon style={styles.iconColor} name='md-text' />
                    <Text>Text</Text>
                    </Button>
            </View>
    
            <View style={styles.setViewWidth} >
            <Button transparent style={styles.flexDirectionForBtn} 
            onPress={()=>{this.emailContact(singleResponse.data.email)}}
            > 
              <Icon style={styles.iconColor} name='mail' />
                    <Text>Mail</Text>
                    </Button>
            </View>    
           
              </ListItem>
             
              <ListItem icon>
                <Left>
                  <Button style={styles.buttonStyle}  
                  onPress={()=>{callContact(singleResponse.data.country_code+singleResponse.data.phonenumber)}} 
                  >
                    <Icon active name="md-phone-portrait" />
                  </Button>
                </Left>
                <Body>
    <Text>{singleResponse.data.country_code+singleResponse.data.phonenumber}</Text>
                </Body>
                <Right>
               
                    <Icon active name="md-text"
                     onPress={()=>{textContact(singleResponse.data.country_code+singleResponse.data.phonenumber)}} 
                     />
                  
    
                </Right>
              </ListItem>
    
    
              <ListItem icon>
                <Left>
                  <Button style={styles.buttonStyle}  
                  onPress={()=>{emailContact(singleResponse.data.email)}} 
                  >
                    <Icon active name="mail" />
                  </Button>
                </Left>
                <Body>
            <Text>{singleResponse.data.email}</Text>
                </Body>
                <Right>
                 
    
                </Right>
              </ListItem>
              </List>
         </>
         }
        
    
            </View>
    )
}
