import { useState } from "react";


      

export const disableSubmitButton = (dataObject,setDisable)=>
   {
    for(var objects in dataObject)
    {
      /**
       * if  an empty field exist then disable submit button
       */
     if(dataObject[objects]=="" || dataObject[objects]==null)
     {
       
        return  setDisable(true);
     }
     /**
       * if  an invalid email exists in the form then disable submit button
       */
     if(objects=="email")
     {
         if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(dataObject[objects]))
         {
          return  setDisable(true);
         }
     }

     if(objects==false)
     {
         return  setDisable(true);
     }

    }
   /**
    * all forms fields have been submited then we return false and set disable property to true
    */
     return setDisable(false);
   }