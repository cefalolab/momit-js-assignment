import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

import { logoutUser } from '../redux/modules/auth.store';

function UserMenu({ user, dispatch, icon }) {
  const history = useHistory();

  const logout = () => {
    // clear auth store
    dispatch(logoutUser());
    // redirect to home
    history.push('/');
  };

  const { name } = user;
  return (
    <Menu>
      <MenuButton>{icon}</MenuButton>
      <MenuList>
        <MenuItem>{name}</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}

UserMenu.propTypes = {
  user: PropTypes.object.isRequired,
  icon: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({ user: store.auth.user });

export default connect(mapStateToProps)(UserMenu);
