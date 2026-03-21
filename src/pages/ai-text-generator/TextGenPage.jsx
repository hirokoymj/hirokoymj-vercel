import { useState, useRef } from 'react';
import { GoogleGenAI, createUserContent, createPartFromUri } from '@google/genai';
import { Paper, Grid, Button, TextField, Container, Stack, Box } from '@mui/material';
import { ExamplePromptTable } from './ExamplePromptTable';
import { AiModelHeader } from '../../components/Header/AiModelHeader';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const headerInfo = {
  title: 'AI: text generator (image + text)',
  provider: 'Google',
  model: 'Gemini 2.5 Flash-Lite',
  repoUrl: 'https://github.com/hirokoymj/hirokoy-web-frontend/tree/main/src/pages/ai-text-generator',
  referenceUrl: 'https://ai.google.dev/gemini-api/docs/text-generation#multimodal-input',
  referenceLabel: 'Multimodal inputs',
  stack: ['React', 'Gemini', 'Files API', 'MUI'],
};

export const TextGenPage = () => {
  const [uploadFile, setUploadFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [prompt, setPrompt] = useState('');
  const [promptError, setPromptError] = useState('');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const uploadImageFromUrl = async (imageUrl) => {
    const imageName = imageUrl.split('/').pop();
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], imageName, {
      type: blob.type,
    });
    if (file) {
      setImagePreview(imageUrl);
      const selectedFile = await ai.files.upload({
        file: file,
        config: { mimeType: file.type || 'image/png' },
      });
      setUploadFile(selectedFile);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      const selectedFile = await ai.files.upload({
        file: file,
        config: { mimeType: file.type },
      });
      setUploadFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: createUserContent([createPartFromUri(uploadFile.uri, uploadFile.mimeType), prompt]),
      });
      const responseText = response.text;
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        result = responseText;
      }
      setOutput(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const setPromptFromTable = (text) => {
    setPrompt(text);
    setPromptError('');
  };

  const displayData = (data) => {
    if (Array.isArray(data)) {
      return (
        <ul>
          {data.map((item, i) => (
            <li key={i}>{Object.values(item).join(', ')}</li>
          ))}
        </ul>
      );
    }
    if (typeof data === 'string') {
      return <p>{data}</p>;
    }
    return null;
  };

  const handleReset = () => {
    setPrompt('');
    setPromptError('');
    setUploadFile('');
    setImagePreview('');
    setOutput('');
    fileInputRef.current.value = '';
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
              justifyContent: 'center',
              height: '100%',
              gap: 2,
              p: 2,
            }}
          >
            <input
              type="file"
              accept=".pdf, .jpg, .jpeg, .png"
              onChange={handleFileUpload}
              ref={fileInputRef}
              style={{ width: '100%' }}
            />
            {imagePreview && <img src={imagePreview} style={{ width: '100%', height: 'auto' }} alt="uploaded file" />}
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
              error={!!promptError}
              helperText={promptError}
            />
            <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={prompt.length === 0 || loading || uploadFile === null}
              >
                {loading ? 'Processing...' : 'Generate'}
              </Button>
              <Button type="reset" onClick={handleReset} variant="outlined" fullWidth>
                Reset
              </Button>
            </Stack>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <b>Output by Gemini </b>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              gap: 2,
              p: 2,
              width: '100%',
              height: '100%',
            }}
          >
            {loading ? <p>...loading</p> : <div>{output && displayData(output)}</div>}
          </Paper>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <ExamplePromptTable setPromptFromTable={setPromptFromTable} uploadImageFromUrl={uploadImageFromUrl} />
        </Grid>
      </Grid>
    </Container>
  );
};
