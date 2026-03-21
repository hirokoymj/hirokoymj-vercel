import { useState } from 'react';
import { GoogleGenAI, createUserContent } from '@google/genai';
import { Grid, Paper, Container, Button, Stack, Box } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { AiModelHeader } from '../../components/Header/AiModelHeader';

const useStyles = makeStyles()((theme) => ({
  demoForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    width: '100%',
    padding: 0,
    '& textarea, select': {
      padding: theme.spacing(1),
    },
  },
}));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const sampleText1 =
  'The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest man-made structure in the world, a title it held for 41 years until the Chrysler Building in New York City was finished in 1930. It was the first structure to reach a height of 300 metres. Due to the addition of a broadcasting aerial at the top of the tower in 1957, it is now taller than the Chrysler Building by 5.2 metres (17 ft). Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct.';

const headerInfo = {
  title: 'AI: Text Summarizer (text to text)',
  provider: 'Google',
  model: 'Gemini 2.5 Flash Lite',
  repoUrl: 'https://github.com/hirokoymj/hirokoy-web-frontend/tree/main/src/pages/ai-summary',
  referenceUrl: 'https://ai.google.dev/gemini-api/docs/text-generation',
  referenceLabel: 'Text generation',
  stack: ['React', 'Gemini', 'MUI'],
};

export const SummaryPage = () => {
  const { classes } = useStyles();
  const [prompt, setPrompt] = useState('');
  const [promptError, setPromptError] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('default'); //default, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: [createUserContent(['Summarize the following text in less than 300 characters.', prompt])],
        config: {
          temperature: 0.3,
        },
      });
      setStatus('success');
      setOutput(response.text);
    } catch (error) {
      console.error('Gemini API error:', error);
      setStatus('error');
    }
  };
  const handleReset = () => {
    setPrompt('');
    setPromptError('');
    setSelectedText('');
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} justifyContent="center">
        <Grid size={{ md: 12 }}>
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
              width: '100%',
              height: '100%',
            }}
          >
            <form onSubmit={handleSubmit} className={classes.demoForm}>
              <select
                value={selectedText}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedText(value);
                  setOutput('');
                  setPrompt(value);
                  if (value !== '') setPromptError('');
                }}
                autoFocus
              >
                <option value="">---Please choose a sample text---</option>
                <option value={sampleText1}>Sample text 1</option>
              </select>
              <textarea
                value={prompt}
                placeholder="Your sentence here..."
                rows="10"
                cols="50"
                onChange={(e) => {
                  const value = e.target.value;
                  setPrompt(value);
                  if (value.trim() !== '') setPromptError('');
                }}
                onBlur={() => prompt.trim() === '' && setPromptError('Prompt field is required.')}
              ></textarea>
              {promptError && <p style={{ color: 'red', margin: 0, padding: 0 }}>Prompt field is required.</p>}
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  disabled={prompt.length === 0 || status === 'loading'}
                >
                  {status === 'loading' ? 'Processing...' : 'Generate'}
                </Button>
                <Button variant="outlined" onClick={handleReset}>
                  Reset
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <b>Output by Gemini</b>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              p: 2,
              width: '100%',
              height: '100%',
            }}
          >
            {status === 'loading' && <p>Generating summary...</p>}
            {status === 'success' && <p>{output}</p>}
            {status === 'error' && <p style={{ color: 'red' }}>{output}</p>}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
