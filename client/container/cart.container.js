import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Badge } from '@chakra-ui/react';

function UserMenu({ cart, icon }) {
  // render starts from here
  const totalItem = cart.length;
  return (
    <span>
      {icon}
      {totalItem > 0 ? (
        <Badge fontSize='xs' colorScheme='teal' as='sup'>
          {totalItem}
        </Badge>
      ) : null}
    </span>
  );
}

UserMenu.propTypes = {
  cart: PropTypes.array.isRequired,
  icon: PropTypes.node.isRequired,
};

const mapStateToProps = store => ({ cart: store.cart });

export default connect(mapStateToProps)(UserMenu);
