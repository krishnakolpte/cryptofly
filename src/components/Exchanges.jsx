import { Container, HStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { server } from '../index';
import ExchngeCard from './ExchngeCard';
import ErrorComponent from './ErrorComponent';
import Loader from './Loader';

function Exchanges() {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setErr(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);

  if (err) return <ErrorComponent message={'Error While Fetching Exchnges'} />;

  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {exchanges.map(i => (
              <ExchngeCard
                name={i.name}
                image={i.image}
                rank={i.trust_score_rank}
                url={i.url}
                key={i.id}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
}

export default Exchanges;
