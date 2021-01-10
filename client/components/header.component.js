import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Flex, Box, Spacer } from '@chakra-ui/react';

// components
import Logo from './logo.component';

function Header({ leftChildren, rightChildren }) {
  return (
    <Flex borderWidth='1px' padding='2' alignItems='center'>
      <Box paddingLeft='10'>
        <Link to='/'>
          <Logo />
        </Link>
        {leftChildren}
      </Box>
      <Spacer />
      <Box paddingRight='10'>{rightChildren}</Box>
    </Flex>
  );
}

Header.defaultProps = {
  leftChildren: '',
  rightChildren: '',
};

Header.propTypes = {
  leftChildren: PropTypes.node,
  rightChildren: PropTypes.node,
};

export default Header;
