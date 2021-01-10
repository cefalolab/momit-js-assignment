import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useToast, Center, Flex, Box, Spinner, Text } from '@chakra-ui/react';

// helpers
import { getData } from '../helpers/api-handler';
import API from '../helpers/api-list';

function Products({ setActiveProductId }) {
  // custom hooks
  const toast = useToast();

  // states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // side effects
  useEffect(() => {
    // get product details
    getData(`${API.products}`)
      .then(({ data }) => {
        const { products } = data.data;
        setProducts(products);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);

        setLoading(false);
        toast({
          title: 'Error',
          description: 'Something went wrong',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });

        // set product id null to close modal
        setActiveProductId(null);
      });
  }, [toast, setActiveProductId]);

  // event handlers
  const setProductId = id => setActiveProductId(id);

  // render start from here
  if (loading) {
    return (
      <Center>
        <Spinner size='xl' />
      </Center>
    );
  }

  return (
    <Flex flexWrap='wrap' justifyContent='space-evenly'>
      {products.map(({ _id, id, name }) => (
        <Box
          key={_id}
          width='30%'
          background='gray.50'
          margin={3}
          borderWidth='1px'
          borderRadius='lg'
          cursor='pointer'
          onClick={() => setProductId(id)}
        >
          <Text fontSize={['xl', '2xl', '3xl', '4xl']} padding={3}>
            {name}
          </Text>
        </Box>
      ))}
    </Flex>
  );
}

Products.propTypes = {
  setActiveProductId: PropTypes.func.isRequired,
};

export default Products;
