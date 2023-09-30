import React, { useState, useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';

const DelayedInput = () => {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState(''); // Added state for selected crypto

  const contentEditableRef = useRef(null);

  const debouncedUpdateTextA = debounce((value) => {
    setTextA(value);
  }, 500);

  const handleInput = () => {
    const newValue = contentEditableRef.current.textContent;
    const reversedValue = newValue.split('').reverse().join('');

    // Update textA immediately
    setTextA(newValue);

    // Update the content immediately
    contentEditableRef.current.textContent = reversedValue;

    // Debounced update for textA
    debouncedUpdateTextA(newValue);

    // Instant update for textB with the reversed value
    setTextB(reversedValue);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCrypto(event.target.value);
  };

  useEffect(() => {
    document.body.addEventListener('click', handleClick);
    document.body.addEventListener('keydown', handleKeyDown);

    return () => {
      debouncedUpdateTextA.cancel();
      document.body.removeEventListener('click', handleClick);
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClick = () => {
    contentEditableRef.current.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace' && contentEditableRef.current) {
      event.preventDefault();
      const currentValue = contentEditableRef.current.textContent;
      const newValue = currentValue.slice(1);
      contentEditableRef.current.textContent = newValue;
      handleInput();
    }
  };

  const handleClearInput = () => {
    setTextA('');
    setTextB('');
    debouncedUpdateTextA.cancel();
  };

  return (
    <div>
      {/* Dropdown for selecting crypto currencies */}
      <label>
        Select Asset:
        <select value={selectedCrypto} onChange={handleCurrencyChange}>
          <option value="BTC">Bitcoin</option>
          <option value="ETH">Ethereum</option>
          {/* Add more options for other crypto currencies */}
        </select>
      </label>

      <div
        ref={contentEditableRef}
        contentEditable
        style={{
          padding: '5px',
          cursor: 'text',
          color: 'transparent',
          outline: 'none',
          backgroundColor: '#242424',
          borderBottom: 'none', // Remove the default underline
        }}
        onInput={handleInput}
      >
        {textA}
      </div>
      Borrow Amount: 
      <input
  type="text"
  value={`${textA}`}
  readOnly
  style={{
    marginTop: '10px',
    padding: '5px',
    border: '1px solid #ccc',
    width: '100%',
  }}
/>   Label:  {textB}
      <br/>
      <button>Execute</button>
    </div>
  );
};

export default DelayedInput;
