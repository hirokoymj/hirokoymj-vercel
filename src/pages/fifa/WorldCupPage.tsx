import { Container, Grid, Paper } from '@mui/material';
import StadiumCapacityChart from './StadiumCapacityChart';

export default function WorldCupPage() {
  return (
    <Container maxWidth="md" sx={{ px: 3, pt: 1, pb: 3 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid size={12}>
          <Paper sx={{ p: 3, mt: 2 }}>
            <StadiumCapacityChart />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
