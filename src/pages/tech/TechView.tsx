import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import groupBy from 'lodash/groupBy';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import { TOPIC_BY_CATEGORY_ABBR } from '../../queries/Topic';
import { Category, SubCategory } from '../../__generated__/graphql';
import { QueryResult } from '../../components/query-result';

interface TechCardProps {
  mappedData: {
    [key: string]: Array<{
      id: string;
      title: string;
      url: string;
      createdAt: number;
      updatedAt: number;
      category: Category;
      subCategory: SubCategory;
      order: number;
    }>;
  };
}

const TechCard = ({ mappedData }: TechCardProps) => {
  return (
    <div>
      {Object.entries(mappedData).map(([key, arrayValues]) => (
        <div key={key}>
          <Typography variant="h5" style={{ marginTop: '15px' }}>
            {key}
          </Typography>
          {arrayValues.map((d) => (
            <div key={d.id}>
              <Link
                href={d.url}
                target="_blank"
                rel="noreferrer"
                color="secondary"
                underline="none"
                style={{ display: 'block', padding: '15px 0' }}
              >
                {d.title}
              </Link>
              <Divider />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const TechView = () => {
  const { abbr = 'js' } = useParams();
  const { data, loading, error } = useQuery(TOPIC_BY_CATEGORY_ABBR, {
    variables: {
      abbr,
    },
  });

  //   if (loading) return 'Loading...';
  //   if (error) return <p>Error : {error.message}</p>;

  const mappedData: TechCardProps | {} = !loading ? groupBy(data?.topicByCategoryAbbr, 'subCategory.name') : {};

  return (
    <Grid container spacing={3} justifyContent="center" style={{ margin: '16px 0' }}>
      <QueryResult error={error} loading={loading} data={data}>
        <Grid size={{ xs: 12, md: 8 }}>
          <TechCard mappedData={mappedData} />
        </Grid>
      </QueryResult>
    </Grid>
  );
};
