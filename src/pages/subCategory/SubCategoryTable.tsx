import { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import get from 'lodash/get';
import { format } from 'date-fns';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { SUB_CATEGORIES } from '../../queries/SubCategory';
import { CATEGORIES } from '../../queries/Category';
import { Table } from '../../components/Tables/Table';
import { ActionRouterButton } from '../../components/Buttons/ActionRouterButton';
import { ActionButton } from '../../components/Buttons/ActionButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { QueryResult } from '../../components/query-result';

interface SubCategoryTableProps {
  openDialog: (id: string) => void;
}

const PAGE_SIZE = 10;

export const SubCategoryTable = ({ openDialog }: SubCategoryTableProps) => {
  const [page, setPage] = useState(1);
  const [filterCategoryId, setFilterCategoryId] = useState('');

  const { data, loading, error } = useQuery(SUB_CATEGORIES);
  const { data: categoryData } = useQuery(CATEGORIES);

  const categories = categoryData?.categories ?? [];

  const filtered = useMemo(() => {
    const all = data?.subCategories ?? [];
    if (!filterCategoryId) return all;
    return all.filter((sc) => sc.category?.id === filterCategoryId);
  }, [data, filterCategoryId]);

  const totalCount = filtered.length;
  const totalPage = Math.ceil(totalCount / PAGE_SIZE);
  const pageSlice = filtered.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page);

  const mappedData = pageSlice.map(({ id, name, order, category, createdAt, updatedAt }) => {
    const categoryId = get(category, 'id', '');
    const categoryName = get(category, 'name', '');
    const actions = (
      <>
        <ActionRouterButton to={`/subCategory/${id}`}>
          <EditIcon style={{ color: 'white' }} />
        </ActionRouterButton>
        <ActionButton onClick={() => openDialog(id)}>
          <DeleteIcon style={{ color: 'white' }} />
        </ActionButton>
      </>
    );
    const created = format(new Date(createdAt), 'MM/dd/yyyy');
    const updated = format(new Date(updatedAt), 'MM/dd/yyyy');

    return { id, name, order, categoryId, categoryName, actions, created, updated };
  });

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleCategoryChange = (value: string) => {
    setFilterCategoryId(value);
    setPage(1);
  };

  return (
    <QueryResult error={error} loading={loading} data={data}>
      <Box sx={{ mb: 2, pt: 2 }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select value={filterCategoryId} label="Category" onChange={(e) => handleCategoryChange(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Table
        data={mappedData}
        loading={loading}
        columns={[
          { label: 'Sub Category', field: 'name' },
          { label: 'Category', field: 'categoryName' },
          { label: 'Sub Category order', field: 'order' },
          { label: 'Created', field: 'created' },
          { label: 'Updated', field: 'updated' },
          { label: 'Actions', field: 'actions', align: 'center' },
        ]}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          py: 2,
        }}
      >
        <Pagination count={totalPage} page={page} onChange={handlePageChange} color="primary" />
      </Box>
    </QueryResult>
  );
};
