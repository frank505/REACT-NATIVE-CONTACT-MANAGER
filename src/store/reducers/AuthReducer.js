import { 
    CLEAR_REGISTER_STATE, 
    REGISTER_SUCCESS, 
    REGISTER_ERROR, 
    REGISTER_LOADING, 
    CLEAR_LOGIN_STATE,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    TOKEN_EXPIRED,
    TOKEN_EXPIRED_RESET
 } from "../actiontypes/Auth"

const initState = {
    loginState:"",
    registerState:"",
    tokenExpired:false
}


const AuthReducer = (state=initState, action) =>
{
    switch(action.type){
    

        case CLEAR_REGISTER_STATE:
            return{
                ...state,
                registerState:""
            }
            case REGISTER_LOADING:
                return{
                    ...state,
                    registerState:"loading"
                }
        case REGISTER_SUCCESS:
            return{
            ...state,
            registerState:action.res,
        }

        case REGISTER_ERROR:
            return {
           ...state,
           registerState: action.res
            }

            case CLEAR_LOGIN_STATE:
                return{
                    ...state,
                    loginState:""
                }
                case LOGIN_LOADING:
                    return{
                        ...state,
                        loginState:"loading"
                    }
            case LOGIN_SUCCESS:
                return{
                ...state,
                loginState:action.res
            }
            
            case LOGIN_ERROR:
                return {
               ...state,
               loginState: action.res
                }

                case TOKEN_EXPIRED:
                return{
                    ...state,
                    tokenExpired:true
                }
                case TOKEN_EXPIRED_RESET:
                return{
                    ...state,
                    tokenExpired:false
                }


        default:
            return state

    }
}


export default AuthReducer;