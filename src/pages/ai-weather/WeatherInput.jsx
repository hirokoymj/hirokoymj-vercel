import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function WeatherInput({ onSend }) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    onSend(input);
    setInput('');
  };

  return (
    <>
      <TextField
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="You can ask AI about the weather."
        variant="outlined"
        style={{ backgroundColor: 'white' }}
      />
      <Button variant="contained" onClick={handleSubmit} endIcon={<SendIcon />}>
        Send
      </Button>
    </>
  );
}
