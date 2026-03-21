import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import Pagination from '@mui/material/Pagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';

import { CATEGORY_ALL } from '../../queries/Category';
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
  const { data, loading, error } = useQuery(CATEGORY_ALL, {
    variables: {
      limit: PAGE_SIZE,
      skip: PAGE_SIZE * (page - 1),
    },
    fetchPolicy: 'network-only',
  });
  const totalCount = (!loading && data?.categoryAll?.totalCount) || 0;
  const TOTAL_PAGE = Math.ceil(totalCount / PAGE_SIZE);

  const mappedData =
    !loading &&
    data?.categoryAll?.categories.map(({ id, name, abbr, createdAt, updatedAt }) => {
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

      return {
        id,
        name,
        abbr,
        created,
        updated,
        actions,
      };
    });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <QueryResult error={error} loading={loading} data={data}>
      <Table
        data={mappedData}
        loading={loading}
        columns={[
          {
            label: 'Category',
            field: 'name',
          },
          {
            label: 'Abbreviation',
            field: 'abbr',
          },
          {
            label: 'Created',
            field: 'created',
          },
          {
            label: 'Updated',
            field: 'updated',
          },
          {
            label: 'Actions',
            field: 'actions',
            align: 'center',
          },
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
        {/* <div>PAGE_SIZE: {PAGE_SIZE}</div>
        <div>TOTAL COUNT: {totalCount}</div>
        <div>TOTAL PAGE: {TOTAL_PAGE}</div>
        <div>PAGE: {page}</div>
        <div>OFFSET: {PAGE_SIZE * (page - 1)}</div> */}
        <Pagination count={TOTAL_PAGE} page={page} onChange={handleChange} color="primary" />
      </Box>
    </QueryResult>
  );
};
