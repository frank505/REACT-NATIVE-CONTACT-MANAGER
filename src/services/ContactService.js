import HttpService from './HttpService';
import AsyncStorage from '@react-native-community/async-storage';



 export const addNewContactService = async(credentials) =>
 {  
    const http = new HttpService();
  let Url = "user/contact/add";
  let tokenId = "user";

  const token = await AsyncStorage.getItem(tokenId);
  console.log(token);
/**
 * token field is required
 */  
  credentials["token"] = token;

return http.postData(credentials,Url,"POST",tokenId).then((data)=>{
    return data;
}).catch((error)=> {console.log(error)
    return error; 
     });
 }

//load contacts with pagination
 export  const loadContactService = async (page) =>
 {  
    const http = new HttpService();
  let tokenId="user";
  let pager =15;
  const token = await AsyncStorage.getItem(tokenId);

  let  Url = "user/contact/get-all/"+token+"/"+pager+"?page="+page;

  return http.getData(Url,tokenId).then((data)=>{
    return data;
}).catch((error)=> {console.log(error)
    return error; 
     });

 }

 export const loadSingleContactService = (id) =>
 {
    const http = new HttpService();
   let tokenId = "user";
    let Url = "user/contact/get-single/"+id;
    return http.getData( Url,tokenId).then((data)=>
    {
      return data;
  }).catch((error)=> {console.log(error)
    return error; 
     });
 }


 export const loadSearchContactService = async(searchData,page) =>
 {
  const http = new HttpService();
  let tokenId = "user";
  let pager =15;
   let Url = "user/contact/search/"+searchData+"/"+pager+"?page="+page;
   console.log(Url);
   return http.getData( Url,tokenId).then((data)=>
   {
     return data;
 }).catch((error)=> {console.log(error)
   return error; 
    });
}
 

export const editContactService = (credentials,id)=>
{
  const http = new HttpService();
  let Url = "user/contact/update/"+id;
  let tokenId = "user";
  
return http.postData(credentials,Url,"POST",tokenId).then((data)=>{
    return data;
}).catch((error)=> {console.log(error)
    return error; 
     });
}


export const deleteContactService = (id) =>
{
  const http = new HttpService();
  let Url = "user/contact/delete/"+id;
  let tokenId = "user";
  let data = {};
  
return http.postData(data,Url,"POST",tokenId).then((data)=>{
    return data;
}).catch((error)=> {console.log(error)
    return error; 
     });
}

