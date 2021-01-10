import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  useToast,
  Box,
  Center,
  Spinner,
  Icon,
  Text,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
} from '@chakra-ui/react';
import { IoCartOutline, IoTrashOutline } from 'react-icons/io5';

// actions
import { removeFromCart, updateToCart } from '../redux/modules/cart.store';

// helpers
import { postData } from '../helpers/api-handler';
import API from '../helpers/api-list';
import { withAuthorizationHeader } from '../helpers/utility';

function CheckoutPage({ cart, dispatch }) {
  // custom hooks
  const toast = useToast();

  // states
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  // effects
  useEffect(() => {
    checkout(cart);
  }, []);

  function checkout(cart) {
    // Avoid data fetching for empty cart
    if (!cart.length) {
      setLoading(false);
      return;
    }

    //  set loader and start fetching data
    setLoading(true);

    postData(`${API.checkout}`, { cart }, withAuthorizationHeader())
      .then(({ data }) => {
        setLoading(false);

        const { totalPrice, cart: updatedCart } = data.data;
        // set total price
        setTotalPrice(totalPrice);

        // update cart store according from server response
        updatedCart.forEach(
          ({ uid, id, name, color, size, price, quantity, quantityLeft }) => {
            dispatch(
              updateToCart(
                uid,
                id,
                name,
                color,
                size,
                price,
                quantity,
                quantityLeft
              )
            );
          }
        );
      })
      .catch(err => {
        setLoading(false);
        toast({
          title: 'Error',
          description: 'Unable to update cart',
          status: 'warning',
          duration: 10000,
          isClosable: true,
        });
        console.log(err);
      });
  }

  // event handlers
  const onQuantityChange = (uid, action) => {
    const updatedCart = cart.map(item => {
      // inc or dec quantity
      let updatedQuantity;
      if (action === 'inc') {
        updatedQuantity = item.quantity + 1;
      } else if (action === 'dec') {
        updatedQuantity = item.quantity - 1;
      }

      // update quantity
      if (item.uid === uid && updatedQuantity <= item.quantityLeft) {
        return { ...item, quantity: updatedQuantity };
      }

      // default return
      return item;
    });
    checkout(updatedCart);
  };

  const onDeleteItem = uid => {
    // remove from cart
    dispatch(removeFromCart(uid));

    // fetch data for updated cart
    const updatedCart = cart.filter(item => item.uid !== uid);
    checkout(updatedCart);
  };

  const onCheckout = () => {
    toast({
      title: 'Success',
      description: 'Your order created successfully. Thank You.',
      status: 'success',
      duration: 10000,
      isClosable: true,
    });
  };

  // ---- render start ----
  if (loading) {
    return (
      <Center marginTop='10'>
        <Spinner size='xl' />
      </Center>
    );
  }

  // for empty cart
  if (!cart.length) {
    return (
      <Flex
        marginTop='10'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Icon as={IoCartOutline} marginRight={2} boxSize={10} />
        <Text color='red.500' marginTop='3' textTransform='uppercase'>
          Your cart is empty
        </Text>
      </Flex>
    );
  }

  // cart
  return (
    <Box margin='10' overflow='auto'>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Color</Th>
            <Th>Size</Th>
            <Th>Quantity</Th>
            <Th>Left</Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>Total</Th>
            <Th isNumeric>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cart.map(
            ({ uid, name, color, size, quantity, quantityLeft, price }) => (
              <Tr key={uid}>
                <Td textTransform='capitalize'>{name}</Td>
                <Td textTransform='capitalize'>{color}</Td>
                <Td textTransform='capitalize'>{size}</Td>
                <Td textTransform='capitalize'>
                  <NumberInput
                    size='sm'
                    inputMode='numeric'
                    value={quantity}
                    width='80px'
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper
                        onClick={() => onQuantityChange(uid, 'inc')}
                      />
                      <NumberDecrementStepper
                        onClick={() => onQuantityChange(uid, 'dec')}
                      />
                    </NumberInputStepper>
                  </NumberInput>
                </Td>
                <Td>{quantityLeft}</Td>
                <Td isNumeric>{price}</Td>
                <Td isNumeric>{price * quantity} </Td>
                <Td isNumeric>
                  <Icon
                    as={IoTrashOutline}
                    boxSize='5'
                    cursor='pointer'
                    onClick={() => onDeleteItem(uid)}
                  />
                </Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
      <Divider />
      <Box position='absolute' right='30' marginTop='5'>
        <Text fontSize='lg'>
          Total:
          {`$${totalPrice}`}
        </Text>
        <Button
          variant='solid'
          colorScheme='teal'
          size='md'
          textTransform='uppercase'
          marginTop='2'
          onClick={onCheckout}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
}

CheckoutPage.propTypes = {
  cart: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({ cart: store.cart });

export default connect(mapStateToProps)(CheckoutPage);
