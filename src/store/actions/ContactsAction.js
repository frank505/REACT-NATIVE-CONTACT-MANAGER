import { CREATE_CONTACT_SUCCESS, CREATE_CONTACT_ERROR,CREATE_CONTACT_LOADING, 
    CLEAR_CREATE_CONTACT_STATE, GET_CONTACTS_LOADING, GET_CONTACTS_SUCCESS,
     GET_CONTACTS_ERROR, GET_SINGLE_CONTACTS_LOADING, GET_SINGLE_CONTACTS_SUCCESS,
      GET_SINGLE_CONTACTS_ERROR, 
      GET_SEARCH_CONTACTS_LOADING,
      GET_SEARCH_CONTACTS_SUCCESS,
      GET_SEARCH_CONTACTS_ERROR,
    CLEAR_SEARCH_CONTACT_STATE,
    CLEAR_UPDATE_CONTACT_STATE,
    UPDATE_CONTACT_SUCCESS,
    UPDATE_CONTACT_ERROR,
    UPDATE_CONTACT_LOADING,
    DELETE_CONTACT_ERROR,
    DELETE_CONTACT_SUCCESS,
    CLEAR_DELETE_CONTACT_STATE,
    DELETE_CONTACT_LOADING
    } from "../actiontypes/Contacts";
import { addNewContactService, loadContactService, loadSingleContactService,loadSearchContactService, editContactService, deleteContactService } from "../../services/ContactService";



export const CreateContactAction = (credentials) =>
{

    return (dispatch)=>{

        dispatch({type:CREATE_CONTACT_LOADING});

        addNewContactService(credentials).then((res)=>{

                console.log(res);

                if(res.hasOwnProperty('success') && res.success==true){

                    dispatch({type:CREATE_CONTACT_SUCCESS,res});

                }else if(res.hasOwnProperty('success') && res.success==false) {
                    dispatch({type:CREATE_CONTACT_ERROR,res});
                }
            },
            error=>{
                console.log(error);
            }
        )
    } 

}




export const clearCreateContactState = () =>
{
    return (dispatch)=>{

        dispatch({type:CLEAR_CREATE_CONTACT_STATE});
    }

}



export const GetContactActions = (id) =>
{

    return (dispatch)=>{

        dispatch({type:GET_CONTACTS_LOADING});
        
        loadContactService(id).then((res)=>{

                console.log(res);

                if(res.hasOwnProperty('success') && res.success==true){

                    dispatch({type:GET_CONTACTS_SUCCESS,res});

                }else if(res.hasOwnProperty('success') && res.success==false) {
                    dispatch({type:GET_CONTACTS_ERROR,res});
                }
            },
            error=>{
                console.log(error);
            }
        )
    } 

}


export const GetSingleContactAction = (id) =>
 {

    return (dispatch)=>{

        dispatch({type:GET_SINGLE_CONTACTS_LOADING});
        
        loadSingleContactService(id).then((res)=>{

                console.log(res);

                if(res.hasOwnProperty('success') && res.success==true){

                    dispatch({type:GET_SINGLE_CONTACTS_SUCCESS,res});

                }else if(res.hasOwnProperty('success') && res.success==false) {
                    dispatch({type:GET_SINGLE_CONTACTS_ERROR,res});
                }
            },
            error=>{
                console.log(error);
            }
        )
    } 

 } 



 export const GetSearchContactAction = (searchData,page) =>
 {

    return (dispatch)=>{

        dispatch({type:GET_SEARCH_CONTACTS_LOADING});
        
        loadSearchContactService(searchData,page).then((res)=>{

                console.log(res);

                if(res.hasOwnProperty('success') && res.success==true){

                    dispatch({type:GET_SEARCH_CONTACTS_SUCCESS,res});

                }else if(res.hasOwnProperty('success') && res.success==false) {
                    dispatch({type:GET_SEARCH_CONTACTS_ERROR,res});
                }
            },
            error=>{
                console.log(error);
            }
        )
    } 

 } 


 

export const clearSearchContactState = () =>
{
    return (dispatch)=>{

        dispatch({type:CLEAR_SEARCH_CONTACT_STATE});
    }

}



export const EditContactAction = (credentials,id) =>
{

    return (dispatch)=>{

        dispatch({type:UPDATE_CONTACT_LOADING});

        editContactService(credentials,id).then((res)=>{

                console.log(res);

                if(res.hasOwnProperty('success') && res.success==true){

                    dispatch({type:UPDATE_CONTACT_SUCCESS,res});

                }else if(res.hasOwnProperty('success') && res.success==false) {
                    dispatch({type:UPDATE_CONTACT_ERROR,res});
                }
            },
            error=>{
                console.log(error);
            }
        )
    } 

}

export const clearEditContactState = () =>
{
    return (dispatch)=>{

        dispatch({type:CLEAR_UPDATE_CONTACT_STATE});
    }

}

  

export const DeleteContactAction = (id)=>
{
    return (dispatch)=>
    {

        dispatch({type:DELETE_CONTACT_LOADING});
        
        deleteContactService(id).then((res)=>{

                console.log(res);

                if(res.hasOwnProperty('success') && res.success==true){

                    res.id = id;

                    dispatch({type:DELETE_CONTACT_SUCCESS,res});

                }else if(res.hasOwnProperty('success') && res.success==false) {
                    dispatch({type:DELETE_CONTACT_ERROR,res});
                }
            },
            error=>{
                console.log(error);
            }
        )
    } 
}




