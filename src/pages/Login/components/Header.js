import React from 'react'
import {Header as LoginHeader, Left, Body, Right, Title } from 'native-base'

export default function Header() {
    return (
        <LoginHeader>
          <Left/>
          <Body>
            <Title>Login Here</Title>
          </Body>
          <Right />
        </LoginHeader>
    )
}
