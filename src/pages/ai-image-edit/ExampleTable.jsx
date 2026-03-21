import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const data = [
  { id: 1, text: 'Turn the flowers into sunflowers.', imageUrl: '/images/flower.png' },
  { id: 2, text: 'Add people playing around a tree.', imageUrl: '/images/tree.png' },
];

export const ExampleTable = ({ setPrompt, loadImageFromUrl }) => {
  return (
    <>
      <Box sx={{ fontWeight: 'bold' }}>Examples</Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Prompt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => {
                  setPrompt(item.text);
                  loadImageFromUrl(item.imageUrl);
                }}
                hover
              >
                <TableCell>
                  <img src={item.imageUrl} style={{ objectFit: 'cover', width: '76px', height: '76px' }} />
                </TableCell>
                <TableCell>{item.text}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
