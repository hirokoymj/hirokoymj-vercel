import { NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

import { Title } from '../../components/Titles/Title';

export const NotFound = () => {
  return (
    <Box component="p">
      <Title text="Page not found!" />
      Go to the{' '}
      <Link component={NavLink} to="/">
        Homepage
      </Link>
      .
    </Box>
  );
};
