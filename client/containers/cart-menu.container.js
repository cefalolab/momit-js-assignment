import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  PopoverArrow,
  PopoverFooter,
  PopoverBody,
  Text,
  Center,
} from '@chakra-ui/react';
import CartItemCount from '../components/cart-item-count.component';

// components

function CartMenu({ totalItem, loggedIn }) {
  // ---- render starts from here ----
  if (loggedIn) {
    return (
      <Link to='/checkout'>
        <CartItemCount count={totalItem} />
      </Link>
    );
  }

  return (
    <Popover size='sm' trigger='hover' placement='bottom-end'>
      <PopoverTrigger>
        <Button size='xs' variant='ghost'>
          <CartItemCount count={totalItem} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Center>
            <Link to='/login'>
              <Button colorScheme='teal'>LOGIN</Button>
            </Link>
          </Center>
        </PopoverBody>
        <PopoverFooter>
          <Center>
            <Text fontSize='xs' textTransform='uppercase'>
              To checkout please login
            </Text>
          </Center>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

CartMenu.propTypes = {
  totalItem: PropTypes.number.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = store => ({
  totalItem: store.cart.length,
  loggedIn: store.auth.loggedIn,
});

export default connect(mapStateToProps)(CartMenu);
