# Search filter: computed vs useMemo

**Computed** recalculates on every render. **useMemo** caches the result and only reruns when its dependencies change.

## computed

```js
const [searchTerm, setSearchTerm] = useState('');
const [category, setCategory] = useState('All');
const [sortBy, setSortBy] = useState('default');

let computedProducts = products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

computedProducts = category !== 'All' ? products.filter((p) => p.category === category) : computedProducts;

computedProducts = [...computedProducts].sort((a, b) => {
  if (sortBy === 'price-low-high') {
    return a.price - b.price;
  } else if (sortBy === 'price-high-low') {
    return b.price - a.price;
  }
  return 0;
});
```

## useMemo

```js
  const computedProducts = useMemo(() => {
    let computedData: Product[] = category !== 'All' ? products.filter((p) => p.category === category) : products;
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
```
