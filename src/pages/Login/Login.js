import React,{useEffect} from 'react'
import  LoginForm  from './components/LoginForm'
import { Container } from 'native-base'
import Header from './components/Header'



export default function Login() 
 {

  
   

    return (
        <Container>
        <Header />
       <LoginForm  />
        </Container>
       
    )
}
