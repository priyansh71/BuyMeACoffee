/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Center, useColorModeValue } from '@chakra-ui/react'


const Footer = () => {
  const bg = useColorModeValue("red.100", "teal.100");

  return (
    <Center w="100%" h="20" fontFamily="nunito" borderTop="1" borderTopColor={bg}>
    Created by Priyansh for Alchemy's Road to Web3 lesson two!
</Center>
  )
}

export default Footer