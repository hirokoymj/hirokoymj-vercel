# Search filter: computed vs useMemo

**Computed** recalculates on every render. **useMemo** caches the result and only reruns when its dependencies change.

## computed

```js
const [searchTerm, setSearchTerm] = useState('');
const [category, setCategory] = useState('All');
const [sortBy, setSortBy] = useState('asc');
const [createdDate, setCreatedDate] = useState('');

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
```

## useMemo

```js
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
```
