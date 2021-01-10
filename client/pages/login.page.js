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
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

// actions
import { loginUser } from '../redux/modules/auth.store';

// helpers
import { postData } from '../helpers/api-handler';
import API from '../helpers/api-list';
import { setLocalItem } from '../helpers/local-storage-handler';

// components
import AuthWrapper from '../components/auth-wrapper.component';

function LoginPage({ dispatch }) {
  // custom hooks
  const history = useHistory();
  const toast = useToast();

  // states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  // event handlers
  const onChangeEmail = e => setEmail(e.target.value);
  const onChangePassword = e => setPassword(e.target.value);
  const onChangeShowPassword = () => setShowPassword(!showPassword);

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
        console.error(err);
      });
  };

  // validators
  const isEmailInvalid = Boolean(email && !isEmail(email));
  const isPasswordInvalid = Boolean(password && password.length < 8);

  const isRegisterBtnDisable =
    email && password ? isEmailInvalid || isPasswordInvalid : true;

  // --- render start ---
  return (
    <AuthWrapper>
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
        isLoading={showLoader}
      >
        LOG IN
      </Button>

      <Text casing='uppercase' textAlign='center' fontSize='xs'>
        Don&apos;t have an account?
        <Link color='teal.500' marginLeft='1' as={RouterLink} to='/register'>
          REGISTER
        </Link>
      </Text>
    </AuthWrapper>
  );
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(LoginPage);
