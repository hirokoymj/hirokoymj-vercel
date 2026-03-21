import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const data = [
  { id: 1, text: 'Chocolate Chip Cookies' },
  { id: 2, text: 'Peanut Butter Cookies' },
  { id: 3, text: 'Spagettie Carbonara' },
];

export const ExampleRecipeTable = ({ setRecipe, setRecipeError }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Example</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => {
                  setRecipe(item.text);
                  setRecipeError('');
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
