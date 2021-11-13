import React,{useState} from 'react'
import { Container ,Root } from 'native-base';
import SearchBar from './components/SearchBar';
import ItemList from './components/ItemList';



export default function ContactSearch() {

 
   const [searchValue, setSearchValue] = useState("");

    const getSearchData = (Value) =>
    {
      setSearchValue(Value);
    }

    return (
    
      <Container>
       <SearchBar parentCallBack={getSearchData}/>
       
   <ItemList props={searchValue}/>
      
       

      </Container>
   
    )
}
