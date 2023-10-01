import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import '../styles/input.css'; 

const DelayedInput = () => {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [delayedTextB, setDelayedTextB] = useState(textB);
  const [isValid, setIsValid] = useState(true);
  const contentEditableRef = useRef(null);

  const debouncedUpdateTextA = _.debounce((value) => {
    setTextA(value);
  }, 2000);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayedTextB(textB);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [textB]);
  const handleInput = () => {
    const newValue = contentEditableRef.current.textContent;
  
    // Validation: Check if the new value is a valid number
    const isValidInput = /^\d+$/.test(newValue) || newValue === '';
  
    if (isValidInput) {
      setIsValid(true); // Reset the isValid state
      setTextA(newValue);
      const reversedValue = newValue.split('').reverse().join('');
      contentEditableRef.current.textContent = reversedValue;
      debouncedUpdateTextA(newValue);
      setTextB(reversedValue);
    } else {
      setIsValid(false);
  
      setTimeout(() => {
        setIsValid(true); // Reset the isValid state after showing the message
      }, 1000);
    }
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
    const key = event.key;
  
    if (key === 'Backspace' && contentEditableRef.current) {
      event.preventDefault();
      const currentValue = contentEditableRef.current.textContent;
      const newValue = currentValue.slice(0, -1);
      contentEditableRef.current.textContent = ''; 
      handleInput();
      contentEditableRef.current.textContent = newValue; 
    } else if (key !== 'Backspace' && !/^\d+$/.test(key) && key !== '.' && !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
      setIsValid(false);
  
      setTimeout(() => {
        setIsValid(true);
      }, 1000);
  
      event.preventDefault();
    }
  };

  return (
    <div className="card-container">
      <div className="delayed-input-container">
        <label>
          Select Asset:
          <select
            value={selectedCrypto}
            onChange={handleCurrencyChange}
            className="asset-menu"
          >
            <option value="BTC">Bitcoin</option>
            <option value="ETH">Ethereum</option>
            {/* Add more options for other crypto currencies */}
          </select>
        </label>

        <div
          ref={contentEditableRef}
          contentEditable
          className={`content-editable ${isValid ? '' : 'invalid'}`}
          onInput={handleInput}
        >
          {textA}
        </div>
        <p className="borrow-amount">
          Borrow Money: <span className="amount-button-container"><button className='amt'>Max Held Amount: 200</button></span>
        </p>

        <input
          type="text"
          value={delayedTextB}
          readOnly
          placeholder='Enter your value'
          className="readonly-textbox"
        />
        <br />
       <div className='exec'>
        <button className='execute'>Execute</button>
        {isValid ? null : <p className="invalid-message">Invalid Input</p>}
        </div>
      </div>

      {/* Add the card for the reversed text */}
      <div className="card-rev">
        <p>{textA.split('').reverse().join('')}</p>
      </div>
    </div>
  );
}

export default DelayedInput;
