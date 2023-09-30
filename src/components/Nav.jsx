import React, { useState } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [menuState, setMenuState] = useState('');

  const handleMenuClick = (action) => {
    setMenuState(action);
  };

  const resetMenu = () => {
    setMenuState('');
  };

  const getButtonColor = (action) => {
    if (menuState === action) {
      return 'selected';
    }
    return '';
  };

  return (
    <nav className="navbar-container">
      <button className={`open-button ${getButtonColor('open')}`} onClick={() => handleMenuClick('open')}>
        Open
      </button>
      <button className={`close-button ${getButtonColor('close')}`} onClick={() => handleMenuClick('close')}>
        Close
      </button>
      <button className={`reset-button ${getButtonColor('')}`} onClick={resetMenu}>
        Reset
      </button>
    </nav>
  );
};

export default Navbar;
