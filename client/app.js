import React, { useState, useEffect } from 'react';

// routes
import Routes from './routes';

// components
import Header from './components/header.component';
import CartMenu from './containers/cart-menu.container';
import UserMenu from './containers/user-menu.container';

function App() {
  // states
  const [mounted, setMounted] = useState(false);

  // effects
  useEffect(() => {
    setMounted(true);
  }, []);

  // ----  render start from here ----
  if (!mounted) {
    return null;
  }

  return (
    <>
      <Header
        rightChildren={
          <>
            <CartMenu />
            <UserMenu />
          </>
        }
      />
      <Routes />
    </>
  );
}

export default App;
