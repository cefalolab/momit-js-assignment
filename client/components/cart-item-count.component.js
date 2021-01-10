import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Badge } from '@chakra-ui/react';
import { IoCartOutline } from 'react-icons/io5';

function CartItemCount({ count }) {
  return (
    <>
      <Icon as={IoCartOutline} width={22} height={22} marginLeft='5' />
      {count > 0 ? (
        <Badge fontSize='xs' colorScheme='teal' as='sup'>
          {count}
        </Badge>
      ) : null}
    </>
  );
}

CartItemCount.propTypes = {
  count: PropTypes.number.isRequired,
};

export default CartItemCount;
