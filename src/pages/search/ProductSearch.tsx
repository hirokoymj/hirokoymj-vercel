import { useMemo, useState } from 'react';
import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Title } from '../../components/Titles/Title';
import { TechStackHeader } from '../../components/Header/TechStackHeader';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

interface ProductProps {
  products: Product[];
}

const products: Product[] = [
  { id: 1, name: 'iPhone 15', category: 'Electronics', price: 999 },
  { id: 2, name: 'Samsung TV', category: 'Electronics', price: 700 },
  { id: 3, name: 'Coffee Mug', category: 'Home', price: 12 },
  { id: 4, name: 'Desk Lamp', category: 'Home', price: 35 },
  { id: 5, name: 'MacBook Air', category: 'Electronics', price: 1199 },
  { id: 6, name: 'Office Chair', category: 'Furniture', price: 220 },
  { id: 7, name: 'Dining Table', category: 'Furniture', price: 450 },
  { id: 8, name: 'Headphones', category: 'Electronics', price: 199 },
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
  const [sortBy, setSortBy] = useState('default');

  //   let computedProducts = products.filter((p) =>
  //     p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  //   );

  //   computedProducts =
  //     category !== 'All'
  //       ? products.filter((p) => p.category === category)
  //       : computedProducts;

  //   computedProducts = [...computedProducts].sort((a, b) => {
  //     if (sortBy === 'price-low-high') {
  //       return a.price - b.price;
  //     } else if (sortBy === 'price-high-low') {
  //       return b.price - a.price;
  //     }
  //     return 0;
  //   });

  const computedProducts = useMemo(() => {
    let computedData: Product[] = products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    computedData = category !== 'All' ? computedData.filter((p) => p.category === category) : computedData;
    return [...computedData].sort((a, b) => {
      if (sortBy === 'price-low-high') {
        return a.price - b.price;
      } else if (sortBy === 'price-high-low') {
        return b.price - a.price;
      }
      return 0;
    });
    return computedData;
  }, [searchTerm, category, sortBy]);

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

              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select label="Sort By" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <MenuItem value="default">Default</MenuItem>
                  <MenuItem value="price-low-high">Price: Low to High</MenuItem>
                  <MenuItem value="price-high-low">Price: High to Low</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <p>
              <strong>Results:</strong> {computedProducts.length}
            </p>

            <ul className="product-list">
              {computedProducts.map((product) => (
                <li key={product.id} className="product-item">
                  <span>{product.name}</span>
                  <span>{product.category}</span>
                  <span>${product.price}</span>
                </li>
              ))}
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
