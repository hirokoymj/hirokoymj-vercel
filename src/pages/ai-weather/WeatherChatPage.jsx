import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Grid, Container, Box, Typography } from '@mui/material';
import WeatherCard from './WeatherCard';
import WeatherInput from './WeatherInput';
import { AiModelHeader } from '../../components/Header/AiModelHeader';
import { v4 as uuidv4 } from 'uuid';

const headerInfo = {
  title: 'AI: Weather Chat',
  provider: 'Google',
  model: 'Gemini 2.5 Flash',
  repoUrl: 'https://github.com/hirokoymj/hirokoy-web-frontend/tree/main/src/pages/ai-weather',
  referenceUrl: 'https://ai.google.dev/gemini-api/docs/function-calling?example=weather',
  referenceLabel: 'Function calling',
  stack: ['React', 'Function Calling', 'Weather API, MUI'],
};

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const weatherFunctionDeclaration = {
  name: 'get_current_weather',
  description: 'Gets the current weather for a given location.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      location: {
        type: Type.STRING,
        description: 'The city name, e.g. San Francisco',
      },
    },
    required: ['location'],
  },
};

// Weather API fetcher
async function getCurrentWeather({ location }) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  try {
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        location,
      )}&appid=${apiKey}&units=imperial`,
    );
    const currentData = await currentRes.json();

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
        location,
      )}&appid=${apiKey}&units=imperial`,
    );
    const forecastData = await forecastRes.json();

    const hourlyForecast = forecastData.list.slice(0, 5).map((f) => ({
      time: new Date(f.dt * 1000).toLocaleTimeString([], { hour: 'numeric' }),
      temp: Math.round(f.main.temp),
      icon: f.weather[0].icon,
    }));

    return {
      temp: Math.round(currentData.main.temp),
      high: Math.round(currentData.main.temp_max),
      low: Math.round(currentData.main.temp_min),
      description: currentData.weather[0].description,
      icon: currentData.weather[0].icon,
      location: `${currentData.name}, ${currentData.sys.country}`,
      hourly: hourlyForecast,
    };
  } catch (err) {
    console.error(err);
    return {
      temp: null,
      high: null,
      low: null,
      description: 'Unavailable',
      icon: null,
      location,
      hourly: [],
    };
  }
}
const config = {
  tools: [{ functionDeclarations: [weatherFunctionDeclaration] }],
};

export const WeatherChatPage = () => {
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    handleSend('What is the current weather in Dallas?');
  }, []); //call only on-mount

  const handleSend = async (input) => {
    if (!input.trim()) return;

    const userMessage = {
      id: uuidv4(),
      role: 'user',
      content: {
        type: 'text',
        data: input,
      },
    };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: input,
        config: config,
      });

      if (response.functionCalls?.length > 0) {
        const functionCall = response.functionCalls[0];
        if (functionCall.name === 'get_current_weather') {
          const weatherData = await getCurrentWeather(functionCall.args);
          setMessages((prev) => [
            ...prev,
            {
              id: uuidv4(),
              role: 'model',
              content: {
                type: 'text',
                data: `The current weather in ${weatherData.location} is ${weatherData.temp}°F with ${weatherData.description}.`,
              },
            },
            {
              id: uuidv4(),
              role: 'model',
              content: { type: 'weather', data: weatherData },
            },
          ]);
        }
      } else {
        const modelMessage = {
          id: uuidv4(),
          role: 'model',
          content: { type: 'text', data: response.text },
        };
        setMessages((prev) => [...prev, modelMessage]);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const renderChatMessage = () => {
    const output = messages.map((m) => {
      switch (m.content.type) {
        case 'text':
          return (
            <Box
              key={m.id}
              sx={{
                p: 1,
                borderRadius: '8px',
                bgcolor: m.role === 'user' ? '#DCF8C6' : '#F1F0F0',
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                mb: 3,
              }}
            >
              <Typography variant="body1">{m.content.data}</Typography>
            </Box>
          );
        case 'weather':
          return <WeatherCard key={m.id} weather={m.content.data} />;
        default:
          return null;
      }
    });
    return output;
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} justifyContent="center">
        <Grid size={{ xs: 12 }}>
          <AiModelHeader headerInfo={headerInfo} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box
            ref={chatRef}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              height: '60vh',
              p: 3,
              border: '1px solid #ccc',
              mb: 2,
              bgcolor: '#fff',
            }}
          >
            {renderChatMessage()}
            {loading && <Typography sx={{ fontStyle: 'italic', color: 'gray' }}>Thinking...</Typography>}
          </Box>
          <Box sx={{ display: 'flex' }}>
            <WeatherInput onSend={handleSend} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
