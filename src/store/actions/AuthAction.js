import {
     REGISTER_LOADING, 
    REGISTER_SUCCESS,
     REGISTER_ERROR, 
    CLEAR_REGISTER_STATE, 
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    CLEAR_LOGIN_STATE,
    TOKEN_EXPIRED_RESET
    } from "../actiontypes/Auth";
import { RegisterService, LoginService } from "../../services/AuthService";




export const RegisterAction = (credentials) =>
{
    return (dispatch)=>{

        dispatch({type:REGISTER_LOADING});

        RegisterService(credentials).then((res)=>{

                console.log(res);

                if(res.hasOwnProperty('success') && res.success==true){

                    dispatch({type:REGISTER_SUCCESS,res});

                }else if(res.hasOwnProperty('success') && res.success==false) {
                    dispatch({type:REGISTER_ERROR,res});
                }
            },
            error=>{
                console.log(error);
            }
        )
    } 

}

export const clearRegisterAuthState = ()=>
{
    return (dispatch)=>
    {
        dispatch({type:CLEAR_REGISTER_STATE});
    }
}

export const LoginAction = (credentials) =>
{
    return (dispatch)=>{
  
        dispatch({type:LOGIN_LOADING});

     LoginService(credentials).then((res)=>{

                console.log(res);

                if(res.hasOwnProperty('success') && res.success==true){
            
                     dispatch({type:LOGIN_SUCCESS,res});

                }else if(res.hasOwnProperty('success') && res.success==false) {
                    dispatch({type:LOGIN_ERROR,res});
                }
            },
            error=>{
                console.log(error);
            }
        )
    } 

}


export const clearLoginAuthState = ()=>
{
    return (dispatch)=>
    {
        dispatch({type:CLEAR_LOGIN_STATE});
    }
}



export const resetTokenExpirationValue= () =>
{
    return (dispatch)=>{

        dispatch({type:TOKEN_EXPIRED_RESET});
    }

}
