import React from 'react'
import {Header as RegisterHeader, Left, Body, Right, Title } from 'native-base'

export default function Header() {
    return (
        <RegisterHeader>
          <Left/>
          <Body>
            <Title>Register Here</Title>
          </Body>
          <Right />
        </RegisterHeader>
    )
}
