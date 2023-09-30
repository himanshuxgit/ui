import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';

const DelayedInput = () => {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState(''); // Added state for selected crypto
  const [delayedTextB, setDelayedTextB] = useState(textB); // New state


  useEffect(() => {
    // Update delayedTextB after 2 seconds
    const timeout = setTimeout(() => {
      setDelayedTextB(textB);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [textB]);
  const contentEditableRef = useRef(null);

  const debouncedUpdateTextA = _.debounce((value) => {
    setTextA(value);
  }, 2000);

  const handleInput = () => {
    const newValue = contentEditableRef.current.textContent;
    const reversedValue = newValue.split('').reverse().join('');

    // Update textA immediately
    // setTextA(newValue);
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
          opacity:0,
          color: 'transparent',
          outline: 'none',
          backgroundColor: '#242424',
        //   transition: 'background-color 2s', // Add transition property

        }}
        onInput={handleInput}
      >
        {textA}
      </div>
      Borrow Amount: 
      {delayedTextB}
      <p>{textA.split('').reverse().join('')}</p>
      <br/>
      <button>Execute</button>
    </div>
  );
};

export default DelayedInput;