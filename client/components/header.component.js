import React from 'react';
import { Flex, Box, Spacer, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { IoPersonOutline, IoCartOutline } from 'react-icons/io5';

import Logo from './logo.component';

function Header() {
  return (
    <Flex borderWidth='1px' padding='2' alignItems='center'>
      <Box paddingLeft='10'>
        <Link to='/'>
          <Logo />
        </Link>
      </Box>
      <Spacer />
      <Box paddingRight='10'>
        <Link to='/checkout'>
          <Icon as={IoCartOutline} width={22} height={22} marginLeft='5' />
        </Link>
        <Link to='/login'>
          <Icon as={IoPersonOutline} width={22} height={22} marginLeft='5' />
        </Link>
      </Box>
    </Flex>
  );
}

export default Header;
