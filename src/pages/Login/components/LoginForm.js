import React,{useState,useEffect} from 'react'
import {  Item, Input, Label,Button,Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../styles'
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import {Formik} from 'formik'
import { disableSubmitButton } from '../../../helpers/hooksFormInput';
import { cleanUpData,
  instantiateAbort,setBottomColor,ResponseToast,LoadingToast } from '../../../helpers/componentHelperFunc';
import {useDispatch,useSelector} from 'react-redux';
import { LoginAction, clearLoginAuthState } from '../../../store/actions/AuthAction';
import AsyncStorage from '@react-native-community/async-storage'
import { View } from 'react-native';




export default function LoginForm() {

  const EmailCheckRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const abortEffect = instantiateAbort();

  const [disable, setDisable] = useState(true)

  const loginResponse = useSelector(state=>state.authReducer.loginState);

  const [fields, setFields] = useState({
   email:"",
   password:""
  });

    const goToRegisterPage = () =>
    {
    navigation.navigate('Register');
    }

       /**
  * called once we loose focus of this screen react navigation 5 new hooks
  */
    useFocusEffect(
      React.useCallback(() => {
      
        return () => dispatch(clearLoginAuthState())
      }, [])
     
    );
  

    const validation = () =>
    {
        const errors = {};
        errors.email =  !fields.email? 'Email Field is Required': '';
        errors.email = !EmailCheckRegex.test(fields.email)?'Invalid email address':'';
        errors.password = fields.password==""? 'Password Field is Required': '';
    
      
        return errors;
    }

    const disableButtonIfFieldsAreEmpty = (dataObject)=>
    {
      disableSubmitButton(dataObject,setDisable);
    }

    /*
   * ensure button remains disable until all form fields are filled
    */
   useEffect(() => 
   {
     
      disableButtonIfFieldsAreEmpty(fields)
   
     return function cleanup()
     {
       cleanUpData(abortEffect);
     }

    }, [fields]);


    const submitData = () =>
    {
     dispatch(LoginAction(fields));
    }
     
      /**
    * disable button when we are submitting our form during the time interval we wait 
    * for response to come to us from our react application
    */
   useEffect(() => 
   {
     disableButtonOnSubmit();

     return function cleanup()
     {
       cleanUpData(abortEffect);
     }

   }
   , [loginResponse])

      
  const disableButtonOnSubmit = () =>
   {
     if(loginResponse=="loading")
     {
       setDisable(true);
     }else if(loginResponse!="" && loginResponse!="loading")
     {
        setDisable(false);
     }
   }
  
   useEffect(() => {
    if(loginResponse!="" && loginResponse=="loading")
    {
      LoadingToast("top","please wait..","success");
    }
    else if(loginResponse!="" || loginResponse!=null || loginResponse!="loading")
    {
      if(loginResponse.success === true && loginResponse.token!="")
      {
        AsyncStorage.setItem('user',loginResponse.token); 

       navigation.navigate("Dashboard");
       
      }else if(loginResponse.success === false)
      {
          if(typeof loginResponse.message === "string")
          {
            ResponseToast("top","Close","danger",loginResponse.message,6000);
            
          }else if(typeof loginResponse.message === "object")
          {
            Object.keys(loginResponse.message).map((keys,index)=>{
        
              ResponseToast("top","Close","danger",loginResponse.message[keys][0],6000);
            })
          }
      }
    }

    return () => {
      cleanUpData(abortEffect)
    }
  }, [loginResponse])

    return (
    
        <View style={styles.container}  >
          
          <Formik  initialValues={fields}
                    validate={validation}
                    >

                   {({
                          errors,
                          touched,
                          handleBlur,
                          handleChange,
                          /* and other goodies */
                      }) => (
               <View>
           

           <Item floatingLabel 
            style={styles.marginTopStyle}
            ref={component=>_EmailLogin = component}
            >
              <Label>Email</Label>
              <Input 
              onChangeText={(email)=>{
                setFields({...fields,email:email}),
                setBottomColor(_EmailLogin,email,"email")
              }}
              onTouchStart={()=>setBottomColor(_EmailLogin,fields.email,"email")}
              onBlur={handleBlur("email")}
              onChange={handleChange("email")}
              value={fields.email}
              />
              
            </Item>
            <Label style={styles.labelError}>
              {errors.email && touched.email && errors.email}
            </Label>

            <Item floatingLabel
            style={null}
            ref={component=>_PasswordLogin = component}
            >
            <Label>Password</Label>
              <Input
            onChangeText={(password)=>{
              setFields({...fields,password:password}),
              setBottomColor(_PasswordLogin,password,null)
            }}
            onTouchStart={()=>setBottomColor(_PasswordLogin,fields.password,null)}
              onBlur={handleBlur("password")}
              onChange={handleChange("password")}
              value={fields.password} 
              secureTextEntry={true}
              />
            </Item>
            <Label style={styles.labelError}>
              {errors.password && touched.password && errors.password}
            </Label>
            
           
            
            <Button full iconLeft  
            style={styles.submitBtn}
            disabled={disable}
            onPress={submitData}>
            <Ionicons name="person" color="#fff" size={20} />
            <Text>Login</Text>
          </Button>

          <Button full iconLeft transparent  onPress={goToRegisterPage}  >
            <Text>Click Here To Register</Text>
          </Button>

          </View>
            )}
            </Formik>

        </View>   


    )  
}
