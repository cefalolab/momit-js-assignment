import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  useToast,
  Center,
  Box,
  Spinner,
  Text,
  Stack,
  Flex,
  Divider,
  Tag,
  Icon,
  Spacer,
  Button,
} from '@chakra-ui/react';
import {
  IoColorPaletteOutline,
  IoResizeOutline,
  IoCashOutline,
  IoSadOutline,
} from 'react-icons/io5';
import { connect } from 'react-redux';

import { getData } from '../helper/api-handler';
import API from '../helper/api-list';
import { addToCart } from '../redux/modules/cart.store';

function ProductDetails({ id, cart, dispatch }) {
  // custom hooks
  const toast = useToast();

  // states
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');

  // side effects
  useEffect(() => {
    getData(`${API.products}/${id}`)
      .then(({ data }) => {
        const { product } = data.data;
        setProduct(product);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);

        setLoading(false);
        toast({
          title: 'Error',
          description: 'Login Failed',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }, [toast, id]);

  // event handlers
  const selectColor = color => setColor(color);
  const selectSize = size => setSize(size);
  const onAddToCart = () => {
    // product title
    const { name } = product;
    const title = `${name} - ${color} color, ${size}`;

    // check item exist in cart
    const uniqueId = `${id}.${color}.${size}}`;
    const isItemExist = Boolean(cart.find(item => item.id === uniqueId));

    if (isItemExist) {
      toast({
        title: 'Warning',
        description: `${title} size already added to your cart`,
        status: 'warning',
        duration: '3000',
        isClosable: true,
      });
      return;
    }
    // update cart for new item
    dispatch(addToCart(id, { color, size }));
    toast({
      title: 'Success',
      description: `${title} added to cart successfully.`,
      status: 'success',
      duration: '3000',
      isClosable: true,
    });
  };

  // render start from here
  if (loading) {
    return (
      <Center>
        <Spinner size='xl' />
      </Center>
    );
  }

  const { name, price, available, variants } = product;

  // Find colors and sizes
  const colors = variants.map(item => item.color);
  const sizes = (() => {
    const variant = variants.find(variant => {
      const currentColor = color || colors[0];
      if (currentColor !== color) {
        setColor(currentColor);
      }
      return variant.color === currentColor;
    });
    return variant ? variant.size : [];
  })();

  return (
    <Box padding={2}>
      <Stack spacing={3}>
        <Flex flexDirection='column'>
          <Text color='gray.500' fontSize='xs' textTransform='uppercase'>
            Available
          </Text>
          <Text fontSize='2xl'>{name}</Text>
        </Flex>
        <Divider />

        {available ? (
          <div>
            <Box marginBottom={3}>
              <Flex alignItems='center' marginBottom={1}>
                <Icon as={IoColorPaletteOutline} marginRight={2} boxSize={5} />
                <Text fontSize='lg'>Color</Text>
              </Flex>
              <Flex>
                {colors.map(item => (
                  <Tag
                    key={item}
                    padding={1}
                    marginRight={2}
                    textTransform='uppercase'
                    size='sm'
                    cursor='pointer'
                    variant={item === color ? 'solid' : 'outline'}
                    onClick={() => selectColor(item)}
                  >
                    {item}
                  </Tag>
                ))}
              </Flex>
            </Box>
            <Box marginBottom={3}>
              <Flex alignItems='center' marginBottom={1}>
                <Icon as={IoResizeOutline} marginRight={2} boxSize={5} />
                <Text fontSize='lg'>Size</Text>
              </Flex>

              <Flex>
                {sizes.map(item => (
                  <Tag
                    key={item}
                    padding={1}
                    marginRight={2}
                    textTransform='uppercase'
                    size='sm'
                    cursor='pointer'
                    variant={item === size ? 'solid' : 'outline'}
                    onClick={() => selectSize(item)}
                  >
                    {item}
                  </Tag>
                ))}
              </Flex>
            </Box>
            <Divider />
            <Flex alignItems='center' marginTop={2}>
              <Icon as={IoCashOutline} marginRight={2} boxSize={5} />
              <Text fontSize='lg'>
                Price:
                {price}
              </Text>
              <Spacer />
            </Flex>
            <Flex marginTop={5}>
              <Button
                colorScheme='teal'
                variant='outline'
                size='sm'
                textTransform='uppercase'
                disabled={!(color && size)}
                onClick={onAddToCart}
              >
                Add to cart
              </Button>
              <Spacer />
            </Flex>
          </div>
        ) : (
          <Flex flexDirection='column' alignItems='center'>
            <Icon as={IoSadOutline} marginRight={2} boxSize={10} />
            <Text color='red.500' size='lg'>
              Not Available
            </Text>
          </Flex>
        )}
      </Stack>
    </Box>
  );
}

ProductDetails.propTypes = {
  id: PropTypes.number.isRequired,
  cart: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({ cart: store.cart });

export default connect(mapStateToProps)(ProductDetails);
