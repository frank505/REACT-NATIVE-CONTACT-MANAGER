import React from 'react'
import {Header as CreateContactHeader, Left, Body, Right, Title } from 'native-base'
import Options from '../../../../layout/Dashboard/Options'


export default function Header() {
    return (
        <CreateContactHeader>
          <Left/>
          <Body>
            <Title>Create Contact</Title>
          </Body>
          <Right>
            <Options/>
            </Right>
        </CreateContactHeader>
    )
}
