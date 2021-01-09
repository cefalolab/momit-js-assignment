import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Flex, Box, Spacer, Icon } from '@chakra-ui/react';
import { IoCartOutline, IoPersonOutline } from 'react-icons/io5';

import Logo from '../components/logo.component';
import UserMenu from './user-menu.container';
import Cart from './cart.container';

function Header({ loggedIn }) {
  const CartIcon = () => (
    <Icon as={IoCartOutline} width={22} height={22} marginLeft='5' />
  );
  const UserIcon = () => (
    <Icon as={IoPersonOutline} width={22} height={22} marginLeft='5' />
  );
  return (
    <Flex borderWidth='1px' padding='2' alignItems='center'>
      <Box paddingLeft='10'>
        <Link to='/'>
          <Logo />
        </Link>
      </Box>
      <Spacer />
      <Box paddingRight='10'>
        {/* checkout */}
        <Link to='/checkout'>
          <Cart icon={<CartIcon />} />
        </Link>

        {/* user  */}
        {!loggedIn ? (
          <Link to='/login'>
            <UserIcon />
          </Link>
        ) : (
          <UserMenu icon={<UserIcon />} />
        )}
      </Box>
    </Flex>
  );
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = store => ({ loggedIn: store.auth.loggedIn });

export default connect(mapStateToProps)(Header);
