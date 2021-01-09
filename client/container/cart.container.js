import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Badge } from '@chakra-ui/react';

function UserMenu({ cart, icon }) {
  const totalItem = cart.length;
  return (
    <span>
      {icon}
      <Badge fontSize='xs' colorScheme='teal' as='sup'>
        {totalItem}
      </Badge>
    </span>
  );
}

UserMenu.propTypes = {
  cart: PropTypes.array.isRequired,
  icon: PropTypes.node.isRequired,
};

const mapStateToProps = store => ({ cart: store.cart });

export default connect(mapStateToProps)(UserMenu);
