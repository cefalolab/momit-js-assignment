import React from 'react';
import PropTypes from 'prop-types';
import { Center, Stack, Box } from '@chakra-ui/react';

// components
import Logo from './logo.component';

function AuthWrapper({ children }) {
  return (
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
  );
}

AuthWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthWrapper;
