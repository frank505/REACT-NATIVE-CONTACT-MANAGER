import React,{useState,useEffect} from 'react'
import { Item, Input, Label,Button,Text, Toast } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../styles'
import { useNavigation,useFocusEffect} from '@react-navigation/native';
import {Formik} from 'formik'
import { disableSubmitButton } from '../../../helpers/hooksFormInput';
import { cleanUpData,instantiateAbort,setBottomColor,ResponseToast,LoadingToast } from '../../../helpers/componentHelperFunc';
import {useDispatch,useSelector} from 'react-redux';
import { RegisterAction, clearRegisterAuthState } from '../../../store/actions/AuthAction';
import {View} from 'react-native';

export default function RegisterForm() {
  
    const navigation = useNavigation();
  
    const dispatch = useDispatch();

    const registerResponse = useSelector(state=>state.authReducer.registerState);

    const [fields, setFields] = useState({
     firstname:"",
     lastname:"",
     email:"",
     password:""
    });
   
    const EmailCheckRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  
    const abortEffect = instantiateAbort();

    const [disable, setDisable] = useState(true)

    const goToLoginPage = () =>
    {
    navigation.navigate('Login');
    }

    

    const disableButtonIfFieldsAreEmpty = (dataObject)=>
    {
      disableSubmitButton(dataObject,setDisable);
    }

 /**
  * called once we loose focus of this screen react navigation 5 new hooks
  */
    useFocusEffect(
      React.useCallback(() => {
      
        return () => dispatch(clearRegisterAuthState())
      }, [])
     
    );
  
   
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



   
    const validation = () =>
    {
        const errors = {};
        errors.firstname = fields.firstname==""? 'Firstname is Required':'';
        errors.lastname = fields.lastname==""? 'Lastname is Required':'';
        errors.email =  !fields.email? 'Email Field is Required': '';
        errors.email = !EmailCheckRegex.test(fields.email)?'Invalid email address':'';
        errors.password = fields.password==""? 'Password Field is Required': '';
    
      
        return errors;
    }

  

    const handleSubmitAfterFormikValidation = () =>
    {
        dispatch(RegisterAction(fields));
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
    , [registerResponse])

       
   const disableButtonOnSubmit = () =>
    {
      if(registerResponse=="loading")
      {
        setDisable(true);
      }else if(registerResponse!="" && registerResponse!="loading")
      {
         setDisable(false);
      }
    }


    useEffect(() => {
      if(registerResponse!="" && registerResponse=="loading")
      {
        LoadingToast("top","please wait..","success");
      }
      else if(registerResponse!="" || registerResponse!=null || registerResponse!="loading")
      {
        if(registerResponse.success === true)
        {
          ResponseToast("top","Close","success",registerResponse.message,6000);
         
        }else if(registerResponse.success === false)
        {
            if(typeof registerResponse.message === "string")
            {
              ResponseToast("top","Close","danger",registerResponse.message,6000);
            }else if(typeof registerResponse.message === "object")
            {
              Object.keys(registerResponse.message).map((keys,index)=>{
          
                ResponseToast("top","Close","danger",registerResponse.message[keys][0],6000);
              })
            }
        }
      }

      return () => {
        cleanUpData(abortEffect)
      }
    }, [registerResponse])

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
            ref={component => _firstName = component}
            >
              <Label>Firstname</Label>
              <Input
              onChangeText={(firstname)=>{
                setFields({...fields,firstname:firstname}),
                setBottomColor(_firstName,firstname,null)
              }}
              onTouchStart={()=>setBottomColor(_firstName,fields.firstname,null)}
              onBlur={handleBlur("firstname")}
              onChange={handleChange("firstname")}
              value={fields.firstname}
              />
            </Item>
            <Label style={styles.labelError}>
                { errors.firstname && touched.firstname && errors.firstname}</Label>
          

            <Item floatingLabel
            style={null}
            ref={component => _lastName = component}
            >
              <Label>Lastname</Label>
              <Input 
             onChangeText={(lastname)=>{
              setFields({...fields,lastname:lastname}),
              setBottomColor(_lastName,lastname,null)
            }}
            onTouchStart={()=>setBottomColor(_lastName,fields.lastname,null)}
              onBlur={handleBlur("lastname")}
              onChange={handleChange("lastname")} 
              value={fields.lastname}/>
            </Item>
            <Label style={styles.labelError}>
                { errors.lastname && touched.lastname && errors.lastname}</Label>

            <Item floatingLabel 
            style={null}
            ref={component=>_Email = component}
            >
              <Label>Email</Label>
              <Input 
              onChangeText={(email)=>{
                setFields({...fields,email:email}),
                setBottomColor(_Email,email,"email")
              }}
              onTouchStart={()=>setBottomColor(_Email,fields.email,"email")}
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
            ref={component=>_Password = component}
            >
            <Label>Password</Label>
              <Input
            onChangeText={(password)=>{
              setFields({...fields,password:password}),
              setBottomColor(_Password,password,null)
            }}
            onTouchStart={()=>setBottomColor(_Password,fields.password,null)}
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
            onPress={handleSubmitAfterFormikValidation}
            disabled={disable}
            >
              <Ionicons name="person-add" color="#fff" size={20} />
            <Text>{registerResponse =="loading" ? "please wait...":"Register"}</Text>
          </Button>

          <Button full iconLeft transparent 
          onPress={goToLoginPage}  >
            <Text>Click Here To Login</Text>
          </Button>
          </View>
         )}
          </Formik>
        </View>   


    )  
}
