import React from 'react'
import { Container } from 'native-base'
import Header from './components/Header'
import EditForm from './components/EditForm'

export default function EditContact() {
    return (
       <Container>
           <Header/>
           <EditForm/>
       </Container>
    )
}
