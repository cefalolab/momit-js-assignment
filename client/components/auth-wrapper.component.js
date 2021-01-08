import React from 'react';
import PropTypes from 'prop-types';
import { Center, Stack, Box } from '@chakra-ui/react';

import Header from './header.component';
import Logo from './logo.component';

function AuthWrapper({ children }) {
  return (
    <>
      <Header />
      <Center marginTop='100px'>
        <Box padding={10} borderWidth='1px' borderRadius='lg'>
          <Stack spacing={5}>
            <Center>
              <Logo />
            </Center>
            {children}
          </Stack>
        </Box>
      </Center>
    </>
  );
}

AuthWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthWrapper;
