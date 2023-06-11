import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { server } from '../index';
import CoinCard from './CoinCard';
import ErrorComponent from './ErrorComponent';
import Loader from './Loader';

function Coins() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('inr');
  const currencySymbol =
    currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$';

  const btnArr = new Array(20).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setErr(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (err) return <ErrorComponent message={'Error While Fetching Coins'} />;

  const changePage = page => {
    setPage(page);
    setLoading(true);
  };

  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency}>
            <HStack spacing={'4'} p={'8'}>
              <Radio value={'inr'}>INR</Radio>
              <Radio value={'usd'}>USD</Radio>
              <Radio value={'eur'}>EUR</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {coins.map(i => (
              <CoinCard
                id={i.id}
                name={i.name}
                image={i.image}
                symbol={i.symbol}
                price={i.current_price}
                currencySymbol={currencySymbol}
                key={i.id}
              />
            ))}
          </HStack>
          <HStack
            w={'full'}
            overflowX={'auto'}
            p={'8'}
            justifyContent={['', 'center']}
          >
            {btnArr.map((item, index) => (
              <Button
                color={'white'}
                bgColor={'blackAlpha.900'}
                onClick={() => changePage(index + 1)}
                key={index}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
}

export default Coins;
