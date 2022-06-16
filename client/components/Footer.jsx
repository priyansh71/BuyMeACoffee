/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Center, useColorModeValue, Link, Divider } from "@chakra-ui/react";

const Footer = () => {
  const bg = useColorModeValue("red.100", "teal.100");
  const color = useColorModeValue("purple.800", "purple.200");

  return (
    <>
      <Divider mt="8" mb="4" />
      <Center
        w="100%"
        mb="4"
        fontFamily="nunito"
        borderTop="1"
        borderTopColor={bg}
      >
        Created by&nbsp;
        <Link
          href="https://github.com/priyansh71"
          color={color}
          fontFamily="Nunito"
        >
          Priyansh
        </Link>
        &nbsp;on the Goerli Network.
      </Center>
    </>
  );
};

export default Footer;
