import { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Grid, Paper, Container, Button, TextField, Alert } from '@mui/material';
import { ExampleRecipeTable } from './ExampleRecipeTable';
import { AiModelHeader } from '../../components/Header/AiModelHeader';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const headerInfo = {
  title: 'AI: Recipe generator',
  provider: 'Google',
  model: 'Gemini 2.5 Flash Lite',
  repoUrl: 'https://github.com/hirokoymj/hirokoy-web-frontend/tree/main/src/pages/ai-recipe',
  referenceUrl: 'https://ai.google.dev/gemini-api/docs/structured-output',
  referenceLabel: 'Structured output',
  stack: ['React', 'Gemini', 'Structured output', 'MUI'],
};

export const RecipePage = () => {
  const [recipe, setRecipe] = useState('');
  const [recipeError, setRecipeError] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);

  const text = `Create a detailed cooking recipe for: "${recipe}"
Return only JSON with:
- recipeName
- ingredients (array of strings)
- steps (array of strings)
`;

  const generateRecipe = async () => {
    setOutput(null);
    setError(null);
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: text,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recipeName: { type: Type.STRING },
              ingredients: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              steps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ['recipeName', 'ingredients', 'steps'],
          },
          propertyOrdering: ['recipeName', 'ingredients', 'steps'],
        },
      });

      setOutput(JSON.parse(response.text));
    } catch (error) {
      setError('Failed to generate recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} justifyContent="center">
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
              width: '100%',
              marginBottom: 4,
            }}
          >
            <TextField
              label="Recipe"
              value={recipe}
              onChange={(e) => {
                const value = e.target.value;
                setRecipe(value);
                if (value.trim() !== '') setRecipeError('');
              }}
              onBlur={() => {
                if (recipe.trim() === '') setRecipeError('Recipe is required.');
              }}
              required
              fullWidth
              autoFocus
              error={!!recipeError}
              helperText={recipeError}
            />
            <Button variant="contained" onClick={generateRecipe} fullWidth disabled={recipe.length === 0 || loading}>
              {loading ? 'Generating...' : 'Generate Recipe'}
            </Button>
          </Paper>
          <ExampleRecipeTable setRecipe={setRecipe} setRecipeError={setRecipeError} />
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
              minHeight: '100%',
            }}
          >
            {error && <Alert severity="error">{error}</Alert>}
            {loading ? (
              <p>...Loading</p>
            ) : (
              <div>
                {output && (
                  <div>
                    <h2>{output.recipeName || 'Missing recipe name'}</h2>
                    <h3>Ingredients:</h3>
                    <ul className="list-disc list-inside mb-4">
                      {output.ingredients?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <h3>Steps</h3>
                    <ol>
                      {output.steps?.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
