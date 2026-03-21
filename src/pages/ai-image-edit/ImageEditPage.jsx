import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Paper, Grid, Button, TextField, Container, Stack } from '@mui/material';
import { ImgOutput } from './ImgOutput';
import { useBase64 } from './useBase64';
import { FileUploadZone } from './FileUploadZone';
import { ExampleTable } from './ExampleTable';
import { AiModelHeader } from '../../components/Header/AiModelHeader';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const headerInfo = {
  title: 'AI: Image editing (image + text to image)',
  provider: 'Google',
  model: 'Gemini 2.5 Flash Image',
  repoUrl: 'https://github.com/hirokoymj/hirokoy-web-frontend/tree/main/src/pages/ai-image-edit',
  referenceUrl: 'https://ai.google.dev/gemini-api/docs/image-generation#gemini-image-editing',
  referenceLabel: 'Image editing',
  stack: ['Gemini API', 'React/Custom Hooks'],
};

export const ImageEditPage = () => {
  const [prompt, setPrompt] = useState('');
  const [promptError, setPromptError] = useState('');
  const { fileData, fileError, handleUpload, loadImageFromUrl, resetFile } = useBase64();
  const [outputImage, setOutputImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setOutputImage(null);
    try {
      const contents = [
        {
          text: 'Edit the provided image using the instruction: ' + prompt,
        },
        {
          inlineData: {
            mimeType: fileData.type,
            data: fileData.base64,
          },
        },
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: contents,
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const imageData = part.inlineData.data;
          setOutputImage(`data:image/png;base64,${imageData}`);
        }
      }
    } catch (err) {
      console.error('Error generating image:', err);
      setError(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };
  const handleReset = () => {
    setPrompt('');
    setPromptError('');
    setOutputImage('');
    resetFile();
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <AiModelHeader headerInfo={headerInfo} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <b>Input</b>
          <Paper sx={{ p: 2 }}>
            <Stack spacing={2}>
              {fileData ? (
                <img src={fileData.imageUrl} alt="Uploaded preview" style={{ maxWidth: '100%' }} />
              ) : (
                <FileUploadZone handleUpload={handleUpload} fileError={fileError} />
              )}
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
                rows={2}
                fullWidth
                error={!!promptError}
                helperText={promptError}
              />

              <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleGenerate}
                  disabled={prompt.length === 0 || fileData === null || loading}
                >
                  {loading ? 'Processing...' : 'Generate'}
                </Button>
                <Button type="reset" onClick={handleReset} variant="outlined" fullWidth>
                  Reset
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <b>Output by AI</b>
          <ImgOutput outputImage={outputImage} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <ExampleTable setPrompt={setPrompt} loadImageFromUrl={loadImageFromUrl} />
        </Grid>
      </Grid>
    </Container>
  );
};
