import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const data = [
  { id: 1, text: 'Describe this image.', imageUrl: '/images/airport-board.png' },
  {
    id: 2,
    text: "Parse the time and city from the airport board image. Return ONLY a JSON array of objects with 'time' and 'city' keys, without markdown.",
    imageUrl: '/images/airport-board.png',
  },
];

export const ExamplePromptTable = ({ setPromptFromTable, uploadImageFromUrl }) => {
  return (
    <>
      <Box sx={{ fontWeight: 'bold', mt: 3 }}>Examples</Box>
      <TableContainer component={Paper}>
        <Table>
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
                  setPromptFromTable(item.text);
                  uploadImageFromUrl(item.imageUrl);
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
