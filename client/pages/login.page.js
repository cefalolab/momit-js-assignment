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
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { postData } from '../helper/api-handler';
import API from '../helper/api-list';

import { loginUser } from '../redux/modules/auth.store';
import { setLocalItem } from '../helper/local-storage-handler';

import AuthWrapper from '../components/auth-wrapper.component';

function LoginPage({ dispatch }) {
  const history = useHistory();
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
      .then(({ data }) => {
        toast({
          title: 'Success',
          description: 'Login successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        //  update redux store
        const { token, user } = data.data;
        setLocalItem('token', token);
        setLocalItem('user', user);
        dispatch(loginUser(token, user));

        // redirect to home
        history.push('/');
      })
      .catch(err => {
        setShowLoader(false);
        toast({
          title: 'Error',
          description: 'Login Failed',
          status: 'error',
          duration: 5000,
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
    <AuthWrapper>
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
        <Link color='teal.500' marginLeft='1' as={RouterLink} to='/register'>
          Register
        </Link>
      </Text>
    </AuthWrapper>
  );
}

export default connect()(LoginPage);
