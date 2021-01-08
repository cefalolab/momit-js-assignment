import React, { useState } from 'react';
import {
  Center,
  Stack,
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Icon,
  Text,
  Link,
  useToast,
} from '@chakra-ui/react';
import { IoPawSharp } from 'react-icons/io5';
import isEmail from 'validator/lib/isEmail';
import { Link as RouterLink } from 'react-router-dom';

import { postData } from '../helper/api-handler';
import API from '../helper/api-list';

function LoginPage() {
  // states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const toast = useToast();

  // event handlers
  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);
  const handleShowPassword = () => setShowPassword(!showPassword);

  // API handlers
  const register = () => {
    setShowLoader(true);

    const data = {
      email,
      password,
    };
    postData(`${API.login}`, data)
      .then(() => {
        setEmail('');
        setPassword('');
        setShowLoader(false);
        toast({
          title: 'Success',
          description: 'Login successfully.',
          status: 'success',
          duration: 10000,
          isClosable: true,
        });
      })
      .catch(err => {
        setShowLoader(false);
        toast({
          title: 'Error',
          description: 'Login Failed',
          status: 'error',
          duration: 10000,
          isClosable: true,
        });
        console.log(err);
      });
  };

  // validators
  const isEmailInvalid = Boolean(email && !isEmail(email));
  const isPasswordInvalid = Boolean(password && password.length < 8);

  const isRegisterBtnDisable =
    email && password ? isEmailInvalid || isPasswordInvalid : true;

  return (
    <Center height='100vh'>
      <Box padding={10} borderWidth='1px' borderRadius='lg'>
        <Stack spacing={5}>
          <Center>
            <Icon as={IoPawSharp} height={55} width={55} boxSize={50} />
          </Center>

          <Input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={handleEmail}
            isInvalid={isEmailInvalid}
          />
          <InputGroup size='md'>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              name='password'
              value={password}
              onChange={handlePassword}
              isInvalid={isPasswordInvalid}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleShowPassword}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>

          <Button
            colorScheme='teal'
            onClick={register}
            isDisabled={isRegisterBtnDisable}
            isLoading={showLoader}
          >
            LOG IN
          </Button>

          <Text casing='uppercase' textAlign='center' fontSize='xs'>
            Don&apos;t have an account
            <Link
              color='teal.500'
              marginLeft='1'
              as={RouterLink}
              to='/register'
            >
              sign up
            </Link>
          </Text>
        </Stack>
      </Box>
    </Center>
  );
}

export default LoginPage;
