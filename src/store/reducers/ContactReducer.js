import { CLEAR_CREATE_CONTACT_STATE, 
    CREATE_CONTACT_LOADING, 
    CREATE_CONTACT_SUCCESS, 
    CREATE_CONTACT_ERROR, 
    CLEAR_GET_CONTACT_STATE,
    GET_CONTACTS_LOADING,
    GET_CONTACTS_SUCCESS,
    GET_CONTACTS_ERROR, 
    CLEAR_GET_SINGLE_CONTACT_STATE,
    GET_SINGLE_CONTACTS_LOADING,
    GET_SINGLE_CONTACTS_SUCCESS,
    GET_SINGLE_CONTACTS_ERROR,
    CLEAR_SEARCH_CONTACT_STATE,
    GET_SEARCH_CONTACTS_LOADING,
    GET_SEARCH_CONTACTS_SUCCESS,
    GET_SEARCH_CONTACTS_ERROR,
   UPDATE_CONTACT_LOADING,
   UPDATE_CONTACT_ERROR,
   UPDATE_CONTACT_SUCCESS,
   CLEAR_UPDATE_CONTACT_STATE,
   DELETE_CONTACT_ERROR,
   DELETE_CONTACT_SUCCESS,
   DELETE_CONTACT_LOADING,
   CLEAR_DELETE_CONTACT_STATE
} from "../actiontypes/Contacts"


const initState = {
    createContactState:"",
    getContactState:"",
    getSingleContactState:"",
    searchContactState:"",
    editContactState:"",
    deleteContactResponse:""
}


const ContactReducer = (state=initState, action) =>
{
    switch(action.type){
    

        case CLEAR_CREATE_CONTACT_STATE:
            return{
                ...state,
                createContactState:""
            }
            case CREATE_CONTACT_LOADING:
                return{
                    ...state,
                createContactState:"loading"
                }
        case CREATE_CONTACT_SUCCESS:
            return{
            ...state,
            createContactState:action.res
        }

        case CREATE_CONTACT_ERROR:
            return {
           ...state,
           getContactState:action.res
            }
        
        case CLEAR_GET_CONTACT_STATE:
            return{
                ...state,
                getContactState:""
            }
            case GET_CONTACTS_LOADING:
                return{
                    ...state,
                getContactState:"loading"
                }
        case GET_CONTACTS_SUCCESS:
            return{
            ...state,
            getContactState:action.res
        }

        case GET_CONTACTS_ERROR:
            return {
           ...state,
           getContactState:action.res
            }
       case CLEAR_GET_SINGLE_CONTACT_STATE:
            return{
                ...state,
                getSingleContactState:""
            }
            case GET_SINGLE_CONTACTS_LOADING:
                return{
                ...state,
                getSingleContactState:"loading"
                }
        case GET_SINGLE_CONTACTS_SUCCESS:
            return{
            ...state,
            getSingleContactState:action.res
        }

        case GET_SINGLE_CONTACTS_ERROR:
            return {
           ...state,
           getSingleContactState:action.res
            }

          case CLEAR_SEARCH_CONTACT_STATE:
            return{
                ...state,
                searchContactState:""
            } 
            case GET_SEARCH_CONTACTS_LOADING:
                return{
                ...state,
                searchContactState:"loading"
                }
        case GET_SEARCH_CONTACTS_SUCCESS:
            return{
            ...state,
            searchContactState:action.res
        }

        case GET_SEARCH_CONTACTS_ERROR:
            return {
           ...state,
           searchContactState:action.res
            }
        
            case CLEAR_UPDATE_CONTACT_STATE:
                return{
                    ...state,
                    editContactState:""
                }
                case UPDATE_CONTACT_LOADING:
                    return{
                        ...state,
                    editContactState:"loading"
                    }
            case UPDATE_CONTACT_SUCCESS:
                return{
                ...state,
                editContactState:action.res
            }
    
            case UPDATE_CONTACT_ERROR:
                return {
               ...state,
               editContactState:action.res
                }
            
             case CLEAR_DELETE_CONTACT_STATE:
                return{
                    ...state,
                    deleteContactResponse:""
                }
                case DELETE_CONTACT_LOADING:
                    return{
                        ...state,
                    deleteContactResponse:"loading"
                    }
            case DELETE_CONTACT_SUCCESS: 
              
                return{
                ...state,
                deleteContactResponse:action.res,
            }
    
            case DELETE_CONTACT_ERROR:
                return {
               ...state,
               deleteContactResponse:action.res
                }
            

        default:
            return state

    }
}


export default ContactReducer;