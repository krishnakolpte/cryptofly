import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import imgSrc from '../assets/btc.png';

function Home() {
  return (
    <Box bgColor={'blackAlpha.900'} w={'full'} p={4}>
      <Image
        w={'full'}
        h={'85vh'}
        objectFit={'contain'}
        src={imgSrc}
        filter={'grayscale(1)'}
      />
      <Text
        fontSize={'6xl'}
        textAlign={'center'}
        fontWeight={'thin'}
        color={'white'}
      >
        CryptoFly
      </Text>
    </Box>
  );
}

export default Home;
