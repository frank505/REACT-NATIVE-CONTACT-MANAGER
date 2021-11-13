import { Toast } from "native-base";

 const EmailCheckRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
 
export const cleanUpData = (abortController) =>
{
    abortController.abort();
}

export const instantiateAbort = () =>
{
    const abortController = new AbortController();
    const signal = abortController.signal;
    return abortController;
}


export const setBottomColor = (itemRef,textTyped,elemType)=>
{
  if(elemType=="email")
  {
    if(EmailCheckRegex.test(textTyped)===false)
    {
      itemRef.setNativeProps({ style: { borderBottomColor: 'red' } })
    }else
    {
     itemRef.setNativeProps({ style: { borderBottomColor: 'green' } })
    }
  }
  else if(elemType==null)
  {
    if(textTyped=="")
    {
      itemRef.setNativeProps({ style: { borderBottomColor: 'red' } })
    }else
    {
     itemRef.setNativeProps({ style: { borderBottomColor: 'green' } })
    }
  }
  
}


export const ResponseToast = (position,buttonText,type,text,duration)=>
{
  return Toast.show({
    position:position,
    buttonText:buttonText,
    text:text,
    type:type,
    duration:duration
  });
}

export const LoadingToast = (position,text,type)=>
{
  return Toast.show({
    position:position,
    text:text,
    type:type,
  });
}