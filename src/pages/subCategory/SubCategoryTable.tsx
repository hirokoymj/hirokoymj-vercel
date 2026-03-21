import { useState } from 'react';
import { useQuery } from '@apollo/client';
import get from 'lodash/get';
import { format } from 'date-fns';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

import { SUB_CATEGORY_ALL } from '../../queries/SubCategory';
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
  const { data, loading, error } = useQuery(SUB_CATEGORY_ALL, {
    variables: { limit: PAGE_SIZE, skip: PAGE_SIZE * (page - 1) },
    fetchPolicy: 'network-only',
  });

  const totalCount = (!loading && data?.subCategoryAll?.totalCount) || 0;
  const totalPage = Math.ceil(totalCount / PAGE_SIZE);

  const mappedData =
    !loading &&
    data?.subCategoryAll?.subCategories.map(({ id, name, order, category, createdAt, updatedAt }) => {
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

      return {
        id,
        name,
        order,
        categoryId,
        categoryName,
        actions,
        created,
        updated,
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
            label: 'Sub Category',
            field: 'name',
          },
          {
            label: 'Category',
            field: 'categoryName',
          },
          {
            label: 'Sub Category order',
            field: 'order',
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
        {' '}
        {/* <div>PAGE_SIZE: {PAGE_SIZE}</div>
        <div>TOTAL COUNT: {totalCount}</div>
        <div>TOTAL PAGE: {totalPage}</div>
        <div>PAGE: {page}</div>
        <div>OFFSET: {PAGE_SIZE * (page - 1)}</div> */}
        <Pagination count={totalPage} page={page} onChange={handleChange} color="primary" />
      </Box>
    </QueryResult>
  );
};
