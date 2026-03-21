import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const data = [
  { id: 1, text: 'a tiny astronaut hatching from an egg on the moon' },
  { id: 2, text: 'Make this monster ride a skateboard on the beach.' },
  { id: 3, text: 'Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme' },
];

export const ExampleTable = ({ setPrompt, setPromptError }) => {
  return (
    <>
      <Box sx={{ fontWeight: 'bold', mt: 3 }}>Examples</Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Prompt</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => {
                  setPrompt(item.text);
                  setPromptError('');
                }}
                hover
              >
                <TableCell>{item.text}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
