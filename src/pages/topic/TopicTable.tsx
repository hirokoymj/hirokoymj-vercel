import { useState } from 'react';
import { useQuery } from '@apollo/client';
import get from 'lodash/get';
import { format } from 'date-fns';
import Link from '@mui/material/Link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

import { TOPIC_ALL } from '../../queries/Topic';
import { Table } from '../../components/Tables/Table';
import { ActionRouterButton } from '../../components/Buttons/ActionRouterButton';
import { ActionButton } from '../../components/Buttons/ActionButton';
import { QueryResult } from '../../components/query-result';

interface TopicTableProps {
  openDialog: (id: string) => void;
}

const PAGE_SIZE = 10;

export const TopicTable = ({ openDialog }: TopicTableProps) => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery(TOPIC_ALL, {
    variables: { limit: PAGE_SIZE, skip: PAGE_SIZE * (page - 1) },
    fetchPolicy: 'network-only',
  });

  const totalCount = (!loading && data?.topicAll?.totalCount) || 0;
  const totalPage = Math.ceil(totalCount / PAGE_SIZE);
  const mappedData =
    !loading &&
    data?.topicAll?.topics.map(({ id, title, url, order, category, subCategory, createdAt, updatedAt }) => {
      const categoryName = get(category, 'name', '');
      const subCategoryName = get(subCategory, 'name', '');
      const subCategoryOrder = get(subCategory, 'order', '');
      const categoryId = get(category, 'id', '');

      const titleLink = (
        <Link href={url} variant="body2" target="_blank" rel="noreferrer" color="secondary">
          {title}
        </Link>
      );

      const actions = (
        <>
          <ActionRouterButton to={`/topic/${id}/${categoryId}`}>
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
        titleLink,
        url,
        order,
        categoryName,
        subCategoryName,
        subCategoryOrder,
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
        hover={true}
        columns={[
          {
            label: 'Title',
            field: 'titleLink',
          },
          //   {
          //     label: 'order',
          //     field: 'order',
          //   },
          {
            label: 'Category',
            field: 'categoryName',
          },
          {
            label: 'SubCategory',
            field: 'subCategoryName',
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
        <div>TOTAL PAGE: {totalPage}</div>
        <div>PAGE: {page}</div>
        <div>OFFSET: {PAGE_SIZE * (page - 1)}</div> */}
        <Pagination count={totalPage} page={page} onChange={handleChange} color="primary" />
      </Box>
    </QueryResult>
  );
};
