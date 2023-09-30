import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [content, setContent] = useState('');
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');

  const contentEditableRef = useRef(null);

  const handleInput = () => {
    const newValue = content;
    const reversedValue = newValue.split('').reverse().join('');

    // Update textB immediately with the reversed value
    setTextB(reversedValue);

    // Clear textA after a delay
    setTimeout(() => {
      setTextA('');
    }, 500);
  };

  useEffect(() => {
    document.body.addEventListener('click', handleClick);
    document.body.addEventListener('keydown', handleKeyDown);

    return () => {
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
      const newValue = content.slice(0, -1);
      setContent(newValue);
      handleInput();
    }
  };

  const handleClearInput = () => {
    setContent('');
    setTextA('');
    setTextB('');
  };

  return (
    <div>
      <div
        ref={contentEditableRef}
        contentEditable
        style={{
          border: '1px solid #ccc',
          padding: '5px',
          cursor: 'text',
          outline: 'none',
          backgroundColor: 'white',
        }}
        onInput={(e) => setContent(e.currentTarget.textContent)}
      >
        {textB}
      </div>

      <p>Instant Display (textB): {textB}</p>

      <div
        style={{
          border: '1px solid #ccc',
          padding: '5px',
          margin: '10px 0',
        }}
      >
        {textA ? (
          <input
            type="text"
            value={textA}
            readOnly
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
            }}
          />
        ) : (
          <div style={{ color: '#aaa' }}>Enter your amount</div>
        )}
      </div>

      <button onClick={handleClearInput}>Clear Input</button>
    </div>
  );
};

export default App;
