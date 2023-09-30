import React, { useState } from 'react';
import '../styles/Navbar.css'

const Navbar = () => {
  const [menuState, setMenuState] = useState('');

  const handleMenuClick = (action) => {
    setMenuState(action);
  };

  const resetMenu = () => {
    setMenuState('');
  };

  return (
    <nav className="navbar-container">
      <button onClick={() => handleMenuClick('open')}>Open</button>
      <button onClick={() => handleMenuClick('close')}>Close</button>
      <button onClick={resetMenu}>Reset</button>
    </nav>
  );
};

export default Navbar;
