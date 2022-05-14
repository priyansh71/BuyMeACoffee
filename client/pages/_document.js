import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';

export default class Document extends NextDocument {
   render() {
      return (
         <Html>
            <Head>
                <meta name="description" content="Tipping site" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
                <link
                    href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&family=Quicksand:wght@300&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body>
               <ColorModeScript initialColorMode="light" />
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}