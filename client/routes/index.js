import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// routes
import PrivateRoutes from './private-routes';
import PublicRoutes from './public-routes';

// helpers
import { getLocalItem } from '../helpers/local-storage-handler';
import { loginUser } from '../redux/modules/auth.store';

function Routes({ loggedIn, dispatch }) {
  // effects
  useEffect(() => {
    const token = getLocalItem('token');
    const user = getLocalItem('user');
    if (token && user) {
      dispatch(loginUser(token, user));
    }
  }, []);

  // ---- render start ----

  // public routes only
  if (!loggedIn) {
    return <PublicRoutes />;
  }

  // public with private routes only
  return <PrivateRoutes />;
}

Routes.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({ loggedIn: store.auth.loggedIn });

export default connect(mapStateToProps)(Routes);
