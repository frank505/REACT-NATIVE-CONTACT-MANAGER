import HttpService from './HttpService';
import AsyncStorage from '@react-native-community/async-storage';



export const RegisterService = (credentials) =>{
    const http = new HttpService();
    let signUpUrl = "user/register";
    return http.postData(credentials,signUpUrl,"POST").then(data=>{
        console.log(JSON.stringify(data));
        return data;
    }).catch((error)=> {console.log(error)
        return error; 
         });
}

export const LoginService = (credentials) =>{
    const http = new HttpService();
    let signUpUrl = "user/login";
    return http.postData(credentials,signUpUrl,"POST").then(data=>{
        console.log(JSON.stringify(data));
        return data;
    }).catch((error)=> {console.log(error)
   return error; 
    });
}


export const LogoutService =()=>
{
return new Promise(function(resolve)
 {
  AsyncStorage.removeItem('user');
  resolve(true);
  });
}