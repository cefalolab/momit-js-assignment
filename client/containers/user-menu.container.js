import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import {
  useToast,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { IoPersonOutline } from 'react-icons/io5';

// actions
import { logoutUser } from '../redux/modules/auth.store';

function UserMenu({ user, loggedIn, dispatch }) {
  // custom hooks
  const toast = useToast();
  const history = useHistory();

  // event handlers
  const logout = () => {
    // clear auth store and local storage
    dispatch(logoutUser());
    localStorage.clear();
    // redirect to home
    history.push('/');

    toast({
      title: 'Info',
      description: 'Logout Successfully.',
      status: 'info',
      duration: '3000',
      isClosable: true,
    });
  };

  const { name } = user;
  // ---- render starts ----
  const UserIcon = () => (
    <Icon as={IoPersonOutline} width={22} height={22} marginLeft='5' />
  );

  if (!loggedIn) {
    return (
      <Link to='/login'>
        <UserIcon />
      </Link>
    );
  }

  return (
    <Menu>
      <MenuButton>
        <UserIcon />
      </MenuButton>
      <MenuList>
        <MenuItem>{name}</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}

UserMenu.propTypes = {
  user: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  user: store.auth.user,
  loggedIn: store.auth.loggedIn,
});

export default connect(mapStateToProps)(UserMenu);
