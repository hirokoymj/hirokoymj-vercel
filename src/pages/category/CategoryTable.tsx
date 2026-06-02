import { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import Pagination from '@mui/material/Pagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { CATEGORIES } from '../../queries/Category';
import { Table } from '../../components/Tables/Table';
import { ActionRouterButton } from '../../components/Buttons/ActionRouterButton';
import { ActionButton } from '../../components/Buttons/ActionButton';
import { QueryResult } from '../../components/query-result';

interface CategoryTableProps {
  openDialog: (id: string) => void;
}

const PAGE_SIZE = 5;

export const CategoryTable = ({ openDialog }: CategoryTableProps) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, loading, error } = useQuery(CATEGORIES);

  const filtered = useMemo(() => {
    const all = data?.categories ?? [];
    if (!searchTerm) return all;
    return all.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [data, searchTerm]);

  const totalCount = filtered.length;
  const TOTAL_PAGE = Math.ceil(totalCount / PAGE_SIZE);
  const pageSlice = filtered.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page);

  const mappedData = pageSlice.map(({ id, name, abbr, createdAt, updatedAt }) => {
    const actions = (
      <>
        <ActionRouterButton to={`/category/${id}`}>
          <EditIcon style={{ color: 'white' }} />
        </ActionRouterButton>
        <ActionButton onClick={() => openDialog(id)}>
          <DeleteIcon style={{ color: 'white' }} />
        </ActionButton>
      </>
    );
    const created = format(new Date(createdAt), 'MM/dd/yyyy');
    const updated = format(new Date(updatedAt), 'MM/dd/yyyy');

    return { id, name, abbr, created, updated, actions };
  });

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  return (
    <QueryResult error={error} loading={loading} data={data}>
      <Box sx={{ mb: 2, pt: 2 }}>
        <TextField
          size="small"
          label="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ minWidth: 200 }}
        />
      </Box>
      <Table
        data={mappedData}
        loading={loading}
        columns={[
          { label: 'Category', field: 'name' },
          { label: 'Abbreviation', field: 'abbr' },
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
        <Pagination count={TOTAL_PAGE} page={page} onChange={handlePageChange} color="primary" />
      </Box>
    </QueryResult>
  );
};
