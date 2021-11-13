import AsyncStorage from '@react-native-community/async-storage';
import { Platform } from 'react-native';


class HttpService
{
       
    setUrl = () =>
    {
       let url = "";
        if(Platform.OS=="ios")
        {
            url = "http://localhost:8000/api";
        }else{
            url = "http://10.0.2.2:8000/api";
        }
        return url;
    }

    postData = async(item ,addedUrl,postType,tokenId="") =>
    {
        const token = await AsyncStorage.getItem(tokenId);

        const requestOptions = this.postRequestOptions(token,item,postType);

        return fetch(this.setUrl()+"/"+addedUrl, requestOptions).then(
            response=>response.json());
    }


    getData = async(addedUrl,tokenId="") =>
    {
        const token = await AsyncStorage.getItem(tokenId);
        const requestOptions = this.getRequestOptions(token);

        return fetch(this.setUrl()+"/"+addedUrl, requestOptions).then(
            response=>response.json());
    }


    deleteData = async(addedUrl,tokenId="") =>
    {
        const token = await AsyncStorage.getItem(tokenId);
        const requestOptions = this.deleteRequestOptions(token);

        return fetch(this.setUrl()+"/"+addedUrl, requestOptions).then(
            response=>response.json());
    }

    getRequestOptions = (token) =>
    {
        let requestOptions = {
            method:'GET',
            headers:{
                'Authorization':'Bearer '+token,
                'Content-type':'application/json',
            }
        }

        return requestOptions;
    }


    postRequestOptions = (token,item,postType) =>
    {
        let requestOptions = {
            method:postType,
            headers:{'Authorization':'Bearer '+token,
                'Content-type':'Application/json',
            },

            body:JSON.stringify(item)
  

        }

        return requestOptions;
    }



    deleteRequestOptions = (token) =>
    {
        let requestOptions = {
            method:'DELETE',
            headers:{
                'Authorization':'Bearer '+token,
                'Content-type':'application/json',
            }
        }

        return requestOptions;
    }



}


export default HttpService;








