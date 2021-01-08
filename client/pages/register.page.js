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

function RegisterPage() {
  // states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const toast = useToast();

  // event handlers
  const handleName = e => setName(e.target.value);
  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);
  const handleShowPassword = () => setShowPassword(!showPassword);

  // API handlers
  const register = () => {
    setIsRegistering(true);

    const data = {
      name,
      email,
      password,
    };
    postData(`${API.register}`, data)
      .then(() => {
        setName('');
        setEmail('');
        setPassword('');
        setIsRegistering(false);
        toast({
          title: 'Successful',
          description: 'Registered account successfully.',
          status: 'success',
          duration: 10000,
          isClosable: true,
        });
      })
      .catch(err => {
        setIsRegistering(false);
        toast({
          title: 'Error',
          description: 'Unable to create user account',
          status: 'warning',
          duration: 10000,
          isClosable: true,
        });
        console.log(err);
      });
  };

  // validators
  const isNameInvalid = Boolean(name && name.length < 2);
  const isEmailInvalid = Boolean(email && !isEmail(email));
  const isPasswordInvalid = Boolean(password && password.length < 8);

  const isRegisterBtnDisable =
    name && email && password
      ? isNameInvalid || isEmailInvalid || isPasswordInvalid
      : true;

  return (
    <Center height='100vh'>
      <Box padding={10} borderWidth='1px' borderRadius='lg'>
        <Stack spacing={5}>
          <Center>
            <Icon as={IoPawSharp} height={55} width={55} boxSize={50} />
          </Center>
          <Input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={handleName}
            isInvalid={isNameInvalid}
          />
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
            isLoading={isRegistering}
          >
            Register
          </Button>

          <Text casing='uppercase' textAlign='center' fontSize='xs'>
            Do you have an account?
            <Link color='teal.500' marginLeft='1' as={RouterLink} to='/login'>
              Log In
            </Link>
          </Text>
        </Stack>
      </Box>
    </Center>
  );
}

export default RegisterPage;
