import React, { useState } from 'react';
import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Text,
  Link,
  useToast,
} from '@chakra-ui/react';
import isEmail from 'validator/lib/isEmail';
import { Link as RouterLink } from 'react-router-dom';

// helpers
import { postData } from '../helpers/api-handler';
import API from '../helpers/api-list';

// components
import AuthWrapper from '../components/auth-wrapper.component';

function RegisterPage() {
  // custom hooks
  const toast = useToast();

  // states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // event handlers
  const onChangeName = e => setName(e.target.value);
  const onChangeEmail = e => setEmail(e.target.value);
  const onChangePassword = e => setPassword(e.target.value);
  const onChangeShowPassword = () => setShowPassword(!showPassword);

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
          description: 'Registered user account successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(err => {
        setIsRegistering(false);
        toast({
          title: 'Error',
          description: 'Unable to register user account',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
        console.error(err);
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

  // --- render start ---
  return (
    <AuthWrapper>
      <Input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChangeName}
        isInvalid={isNameInvalid}
      />
      <Input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChangeEmail}
        isInvalid={isEmailInvalid}
      />
      <InputGroup size='md'>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          name='password'
          value={password}
          onChange={onChangePassword}
          isInvalid={isPasswordInvalid}
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={onChangeShowPassword}>
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
        REGISTER
      </Button>

      <Text casing='uppercase' textAlign='center' fontSize='xs'>
        Do you have an account?
        <Link color='teal.500' marginLeft='1' as={RouterLink} to='/login'>
          Log In
        </Link>
      </Text>
    </AuthWrapper>
  );
}

export default RegisterPage;
