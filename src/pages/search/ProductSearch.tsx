import { useMemo, useState } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { Title } from '../../components/Titles/Title';
import { TechStackHeader } from '../../components/Header/TechStackHeader';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  createdDate: string;
}

interface ProductProps {
  products: Product[];
}

const products: Product[] = [
  { id: 1, name: 'iPhone 15', category: 'Electronics', price: 999, createdDate: '2024-01-15' },
  { id: 2, name: 'Samsung TV', category: 'Electronics', price: 700, createdDate: '2024-02-20' },
  { id: 3, name: 'Coffee Mug', category: 'Home', price: 12, createdDate: '2024-03-05' },
  { id: 4, name: 'Desk Lamp', category: 'Home', price: 35, createdDate: '2024-04-10' },
  { id: 5, name: 'MacBook Air', category: 'Electronics', price: 1199, createdDate: '2024-05-22' },
  { id: 6, name: 'Office Chair', category: 'Furniture', price: 220, createdDate: '2024-06-18' },
  { id: 7, name: 'Dining Table', category: 'Furniture', price: 450, createdDate: '2024-07-30' },
  { id: 8, name: 'Headphones', category: 'Electronics', price: 199, createdDate: '2024-08-14' },
];

const headerInfo = {
  title: 'Product Search with useMemo vs computed',
  gitHub: 'https://github.com/hirokoymj/hirokoymj-vercel/tree/main/src/pages/search',
  stack: ['React', 'useMemo', 'computed'],
};

export function ProductSearch() {
  return <ProductList products={products} />;
}

function ProductList({ products }: ProductProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('asc');
  const [createdDate, setCreatedDate] = useState('');

  const computedProducts = useMemo(() => {
    let filtered: Product[] = products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    filtered = category !== 'All' ? filtered.filter((p) => p.category === category) : filtered;
    filtered = createdDate ? filtered.filter((p) => new Date(p.createdDate) < new Date(createdDate)) : filtered;
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'asc') {
        return a.price - b.price;
      } else if (sortBy === 'desc') {
        return b.price - a.price;
      }
      return 0;
    });
    return filtered;
  }, [searchTerm, category, sortBy, createdDate]);

  return (
    <Container maxWidth="md" sx={{ px: 3, pt: 1, pb: 3 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid size={12}>
          <Title text="Product Search" />
          <TechStackHeader headerInfo={headerInfo} />
          <Paper sx={{ p: 3, mt: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Home">Home</MenuItem>
                  <MenuItem value="Furniture">Furniture</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                type="date"
                label="Created Date"
                value={createdDate}
                onChange={(e) => setCreatedDate(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Box>

            <p>
              <strong>Results:</strong> {computedProducts.length}
            </p>

            <Table size="small" aria-label="a dense table">
              <TableHead sx={{ backgroundColor: 'grey.100', '& .MuiTableCell-root': { fontWeight: 'bold' } }}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell
                    onClick={() => setSortBy((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
                    sx={{ cursor: 'pointer', userSelect: 'none' }}
                  >
                    Price{' '}
                    {sortBy === 'asc' ? (
                      <ArrowUpwardIcon fontSize="inherit" />
                    ) : (
                      <ArrowDownwardIcon fontSize="inherit" />
                    )}
                  </TableCell>
                  <TableCell>Created Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {computedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.createdDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
