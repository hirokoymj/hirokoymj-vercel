import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import type { TooltipItem } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { venues } from './venues';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'FIFA World Cup 2026 — US Venue Capacities',
      font: {
        size: 18,
        weight: 'bold',
      },
      padding: { bottom: 20 },
    },
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<'bar'>) => ` ${(context.parsed.x ?? 0).toLocaleString()} seats`,
        afterLabel: (context: TooltipItem<'bar'>) => venues[context.dataIndex].stadium,
      },
    },
  },
  scales: {
    x: {
      beginAtZero: false,
      min: 60000,
      ticks: {
        callback: (value: number | string) => `${(Number(value) / 1000).toFixed(0)}k`,
      },
      grid: {
        color: 'rgba(0,0,0,0.06)',
      },
    },
    y: {
      ticks: {
        font: { size: 13 },
      },
      grid: {
        display: false,
      },
    },
  },
};

const data = {
  labels: venues.map((v) => v.city),
  datasets: [
    {
      label: 'Capacity',
      data: venues.map((v) => v.capacity),
      backgroundColor: venues.map((_, i) => `hsla(${220 + i * 8}, 70%, ${52 - i * 2}%, 0.85)`),
      borderColor: venues.map((_, i) => `hsla(${220 + i * 8}, 70%, ${42 - i * 2}%, 1)`),
      borderWidth: 1,
      borderRadius: 4,
    },
  ],
};

export default function StadiumCapacityChart() {
  return (
    <Box sx={{ bgcolor: 'white' }}>
      <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', py: 3 }}>
        <Box sx={{ height: 440 }}>
          <Bar options={options} data={data} />
        </Box>
        <Typography variant="caption" display="block" textAlign="center" color="text.secondary" mt={1.5}>
          Sorted by capacity · 11 venues · FIFA World Cup 2026
        </Typography>
        <Table sx={{ mt: 4 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Stadium</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Capacity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {venues.map((v, i) => (
              <TableRow key={v.stadium} hover>
                <TableCell>
                  <Link href={v.url} target="_blank" rel="noreferrer" underline="hover">
                    {v.stadium}
                  </Link>
                </TableCell>
                <TableCell>{v.city}</TableCell>
                <TableCell align="right" sx={{ fontVariantNumeric: 'tabular-nums' }}>
                  {v.capacity.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
