import { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Box, Typography, TextField, Button, Paper, CircularProgress } from '@mui/material';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const Chat = ({ file }) => {
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const initChat = () => {
      try {
        const chatSession = ai.chats.create({
          model: 'gemini-2.5-flash-lite',
          config: {
            systemInstruction:
              'You are a chatbot that answers questions about an uploaded image. Answer in short, text-only messages, no markdown or symbols.',
          },
          history: [
            {
              role: 'user',
              parts: [
                {
                  inlineData: {
                    mimeType: file.type,
                    data: file.base64,
                  },
                },
              ],
            },
          ],
        });

        setChat(chatSession);
        setMessages([
          {
            role: 'info',
            parts: [{ text: '✅ Image uploaded. You can start asking questions!' }],
          },
        ]);
      } catch (err) {
        console.error('Failed to start chat:', err);
        alert('Failed to initialize chat. Please try again.');
      }
    };

    initChat();
  }, [file]);

  const handleSend = async () => {
    if (!chat || !input.trim()) return;
    setLoading(true);

    const userMsg = { role: 'user', parts: [{ text: input }] };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    try {
      const response = await chat.sendMessage({ message: input });
      const modelMsg = { role: 'model', parts: [{ text: response.text }] };

      chat.history.push(userMsg, modelMsg);

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err) {
      console.error('Send message error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', margin: '0 auto' }}>
      {file.imageUrl && (
        <Box mb={2} display="flex" justifyContent="center">
          <img src={file.imageUrl} alt="Uploaded preview" style={{ maxWidth: '100%' }} />
        </Box>
      )}

      <Paper
        elevation={2}
        sx={{
          height: 200,
          overflowY: 'auto',
          padding: 2,
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.role === 'user' ? 'You:' : 'Gemini:'}</strong> {msg.parts[0].text}
          </div>
        ))}

        {loading && (
          <Box display="flex" justifyContent="flex-start" mt={1}>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            <Typography variant="body2" color="textSecondary">
              Gemini is thinking...
            </Typography>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Paper>

      <Box display="flex" gap={1} sx={{ backgroundColor: '#fff' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ask a question about the uploaded image..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={loading}
        />
        <Button variant="contained" color="primary" onClick={handleSend} disabled={loading}>
          Send
        </Button>
      </Box>
    </Box>
  );
};
