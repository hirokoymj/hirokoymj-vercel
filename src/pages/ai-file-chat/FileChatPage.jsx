import { Grid, Container } from '@mui/material';
import { Chat } from './Chat';
import { FileUpload } from './FileUpload';
import { AiModelHeader } from '../../components/Header/AiModelHeader';
import { useBase64Image } from './useBase64Image';

const headerInfo = {
  title: 'AI: Chat with File',
  provider: 'Google',
  model: 'Gemini 2.5 Flash-Lite',
  repoUrl: 'https://github.com/hirokoymj/hirokoy-web-frontend/tree/main/src/pages/ai-file-chat',
  referenceArray: [
    {
      label: 'Multi-turn conversations',
      url: 'https://ai.google.dev/gemini-api/docs/text-generation#multi-turn-conversations',
    },
    { label: 'System instructions', url: 'https://ai.google.dev/gemini-api/docs/text-generation#system-instructions' },
  ],
  stack: ['Gemini', 'React', 'Custom Hooks', 'Chat session'],
};

export const FileChatPage = () => {
  const { fileData, fileError, handleUpload } = useBase64Image();

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} justifyContent="center">
        <Grid size={{ xs: 12 }}>
          <AiModelHeader headerInfo={headerInfo} />
        </Grid>
        <Grid size={{ xs: 8 }}>
          {fileData ? <Chat file={fileData} /> : <FileUpload handleUpload={handleUpload} fileError={fileError} />}
        </Grid>
      </Grid>
    </Container>
  );
};
