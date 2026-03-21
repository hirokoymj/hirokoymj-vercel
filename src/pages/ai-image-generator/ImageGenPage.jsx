import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Paper, Grid, Button, TextField, Container } from '@mui/material';
import { ExampleTable } from './ExampleTable';
import { ImageOutput } from './ImageOutput';
import { AiModelHeader } from '../../components/Header/AiModelHeader';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const headerInfo = {
  title: 'AI: Image Generation (text-to-image)',
  provider: 'Google',
  model: 'Gemini 2.5 Flash Image',
  repoUrl: 'https://github.com/hirokoymj/hirokoy-web-frontend/tree/main/src/pages/ai-image-generator',
  referenceUrl: 'https://ai.google.dev/gemini-api/docs/image-generation#image_generation_text-to-image',
  referenceLabel: 'Image generation',
  stack: ['React', 'Gemini', 'MUI'],
};

export const ImageGenPage = () => {
  const [prompt, setPrompt] = useState('');
  const [promptError, setPromptError] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const generateImage = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: prompt,
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const imageData = part.inlineData.data;
          setImageUrl(`data:image/png;base64,${imageData}`);
        }
      }
    } catch (err) {
      console.error('Error generating image:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <AiModelHeader headerInfo={headerInfo} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <b>Input</b>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              p: 2,
              height: '100%',
            }}
          >
            <TextField
              label="Prompt"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                if (prompt.trim() !== '') setPromptError('');
              }}
              onBlur={() => {
                if (prompt.trim() === '') setPromptError('prompt is required.');
              }}
              multiline
              rows={3}
              fullWidth
              autoFocus
              error={!!promptError}
              helperText={promptError}
            />
            <Button variant="contained" fullWidth onClick={generateImage} disabled={loading || prompt.length === 0}>
              {loading ? 'Processing...' : 'Generate'}
            </Button>
          </Paper>
        </Grid>{' '}
        <Grid size={{ xs: 12, md: 6 }}>
          <b>Output by Gemini</b>
          <ImageOutput imageUrl={imageUrl} />
        </Grid>
        <Grid size={{ xs: 10 }}>
          <ExampleTable setPrompt={setPrompt} setPromptError={setPromptError} />
        </Grid>
      </Grid>
    </Container>
  );
};
