import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import '../styles/input.css'; // Assuming you save the CSS styles in a file named DelayedInput.css

const DelayedInput = () => {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [delayedTextB, setDelayedTextB] = useState(textB);
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
    const reversedValue = newValue.split('').reverse().join('');

    setTextA(newValue);
    contentEditableRef.current.textContent = reversedValue;
    debouncedUpdateTextA(newValue);
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

  return (
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
        className="content-editable"
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
  
  <div className="card-container">
      <p>{textA.split('').reverse().join('')}</p>
    </div>
  
      <br />
      <button className='execute'>Execute</button>
    </div>
  );
  }
export default DelayedInput;
