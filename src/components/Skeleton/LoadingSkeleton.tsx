import Skeleton from '@mui/material/Skeleton';

export const TechCardSkeleton = () => {
  return (
    <>
      <Skeleton variant="text" component="h1" />
      <Skeleton variant="rectangular" width="100%" height="250px" />
      <Skeleton variant="text" component="h1" />
      <Skeleton variant="rectangular" width="100%" height="250px" />
    </>
  );
};

export const TableSkeleton = () => {
  return (
    <>
      <Skeleton variant="text" component="h1" />
      <Skeleton variant="rectangular" height="250px" />
    </>
  );
};
