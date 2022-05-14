/* eslint-disable react/no-unescaped-entities */
import abi from '../utils/BuyMeACoffee.json';
import { ethers } from "ethers";
import Head from 'next/head'
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Box, Button, Center, Flex, Heading, Input, Text, Textarea, useColorModeValue, VStack } from '@chakra-ui/react';
import Footer from '../components/Footer';

export default function Home() {
  // Contract Address & ABI
  const contractAddress = "0x2B1989B7a4E5723399bBB350B45D12654C2E46A8";
  const contractABI = abi.abi;

  const bg = useColorModeValue("red.100", "teal.100");
  const buttonBg1 = useColorModeValue("red.800", "teal.800");
  const buttonBg2 = useColorModeValue("teal.800", "red.800");
  const buttonBg1Hover = useColorModeValue("red.600", "teal.600");
   const buttonBg2Hover = useColorModeValue("teal.600", "red.600");

  // Component state
  const [currentAccount, setCurrentAccount] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [memos, setMemos] = useState([]);

  const onNameChange = (event) => {
    setName(event.target.value);
  }

  const onMessageChange = (event) => {
    setMessage(event.target.value);
  }

  // Wallet connection logic
  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;

      const accounts = await ethereum.request({ method: 'eth_accounts' })
      console.log("accounts: ", accounts);

      if (accounts.length > 0) {
        const account = accounts[0];
        console.log("Found an authorized account : " + account);
      } else {
        console.log("Make sure MetaMask is connected");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("please install MetaMask");
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const buySmallCoffee = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("Buying small coffee..")
        const coffeeTxn = await buyMeACoffee.buyCoffee(
          name ? name : "Anonymous",
          message ? message : "Enjoy your small coffee!",
          { value: ethers.utils.parseEther("0.001") }
        );

        await coffeeTxn.wait();

        console.log("Mined with hash as ", coffeeTxn.hash);
        setName("");
        setMessage("");
        console.log("Small coffee purchased!");

        // Clear the form fields.
       
      }
    } catch (error) {
      console.log(error);
    }
  };

    const buyLargeCoffee = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("Buying large coffee..")
        const coffeeTxn = await buyMeACoffee.buyCoffee(
          name ? name : "Anonymous",
          message ? message : "Enjoy your large coffee!",
          { value: ethers.utils.parseEther("0.005") }
        );

        await coffeeTxn.wait();

        console.log("Mined with hash as ", coffeeTxn.hash);
        // Clear the form fields.
        setName("");
        setMessage("");
        console.log("Large coffee purchased!");

        
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  // Function to fetch all memos stored on-chain.
  const getMemos = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("Fetching memos from the blockchain..");
        const memos = await buyMeACoffee.getMemos();
        console.log("Fetched all!");
        setMemos(memos);
      } else {
        console.log("Metamask is not connected");
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let buyMeACoffee;
    isWalletConnected();
    getMemos();

    // Create an event handler function for when someone sends
    // us a new memo.
    const onNewMemo = (from, timestamp, name, message) => {
      console.log("Memo received: ", from, timestamp, name, message);
      setMemos((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message,
          name
        }
      ]);
    };

    const { ethereum } = window;

    // Listen for new memo events.
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      const signer = provider.getSigner();
      buyMeACoffee = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      buyMeACoffee.on("NewMemo", onNewMemo);
    }

    return () => {
      if (buyMeACoffee) {
        buyMeACoffee.off("NewMemo", onNewMemo);
      }
    }
  }, []);

  return (
    <>
    <Header />
    <Flex flexDir="column" justifyContent="center" alignItems="center">
      <Head>
        <title>Buy Me A Coffee</title>
      </Head>


      <Box pt="16" pb="10">
        <Center flexDir="column" my="2">
          <Text
            fontFamily="Quicksand"
            color={useColorModeValue("red.900", "teal.200")}
            my="2"
            fontSize="1.5em"
          >
            I am Priyansh.
            <br />I like working with the Web.
          </Text>
        </Center>

        {currentAccount ? (
          <div>
            <form>
              <div>
                <label htmlFor="name">
                  Name
                </label>
                <br />

                <Input
                  my="2"
                  id="name"
                  type="text"
                  borderColor="gray.300"
                  focusBorderColor="gray.700"
                  placeholder="Anonymous"
                  onChange={onNameChange}
                />
              </div>
              <br />
              <div>
                <label htmlFor="message">
                  Send Priyansh a message.
                </label>
                <br />

                <Textarea
                  my="4"
                  fontSize="lg"
                  borderColor="gray.300"
                  focusBorderColor="gray.700"
                  spellCheck="false"
                  placeholder="Enjoy your coffee!"
                  rows={6}
                  cols={40}
                  id="message"
                  onChange={onMessageChange}
                  required
                />
              </div>
              <div>
                <Center>
                  <Button
                    onClick={buySmallCoffee}
                    bg={buttonBg1}
                    color="white"
                    _hover={{
                      bg: buttonBg1Hover,
                    }}
                    minW="14vw"
                    maxW="fit-content"
                    my="3"
                    fontSize="1.1em"
                  >
                    Send a small coffee for 0.001ETH
                  </Button>
                </Center>
                <Center>
                  <Button
                    onClick={buyLargeCoffee}
                    bg={buttonBg2}
                    color="white"
                    _hover={{
                      bg: buttonBg2Hover,
                    }}
                    minW="14vw"
                    maxW="fit-content"
                    my="3"
                    fontSize="1.1em"
                  >
                    Send a large coffee for 0.005ETH
                  </Button>
                </Center>
              </div>
            </form>
          </div>
        ) : (
          <Center>
            <Button
              onClick={connectWallet}
              minW="fit-content"
              maxW="20vw"
              fontSize="1.1em"
              bg="teal"
              my="5"
              color="white"
              _hover={{
                bg: "teal.400",
              }}
            >
              Connect Wallet
            </Button>
          </Center>
        )}
      </Box>

      {currentAccount && (
        <Text
          textAlign="center"
          className="waves"
          fontFamily="nunito"
          fontSize="1.3em"
          fontWeight="bold"
        >
          Memos recieved
        </Text>
      )}

      {currentAccount && (memos.map((memo, idx) => {
        return (
          <VStack
            key={idx}
            bg={bg}
            minW="50vw"
            my="5"
            color="black"
            borderRadius="5"
            fontSize="1em"
            p="6"
            fontFamily="nunito"
            spacing="4"
          >
            <Text>
              <strong
                style={{
                  fontSize: "1em",
                  padding: "5px",
                }}
              >
                From :
              </strong>
              {memo.name}
            </Text>
            
            <Text>
              <strong
                style={{
                  fontSize: "1em",
                  padding: "5px",
                }}
              >
                Message :
              </strong>
              {memo.message}
            </Text>
            <Text>
              <strong
                style={{
                  fontSize: "1em",
                  padding: "5px",
                }}
              >
                Timestamp :
              </strong>
              {memo.timestamp.toString()}
            </Text>
          </VStack>
        )
      }))}

      <Footer />
    </Flex>
    </>
  )
}
