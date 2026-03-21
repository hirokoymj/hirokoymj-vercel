import React, { useState, useRef, useEffect } from 'react';

const Demo = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleIncrement = () => {
    setCount(count + 1);
    countRef.current++;
    console.log('State', count); //0
    console.log('Ref:', countRef.current); //1
  };

  return (
    <div>
      Count : {count}
      <button onClick={handleIncrement}>Increment</button>
      <input ref={inputRef} type="text" />
    </div>
  );
};

export default Demo;
