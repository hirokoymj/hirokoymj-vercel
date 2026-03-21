import { Box, Typography, Paper } from '@mui/material';

export default function WeatherCard({ weather }) {
  if (!weather || weather.temp === null) return null;
  const { temp, high, low, description, icon, location, hourly } = weather;

  return (
    <Paper
      sx={{
        mb: 4,
        p: 2,
        borderRadius: '12px',
        bgcolor: '#60a5fa',
        color: 'white',
        width: '65%',
      }}
    >
      {/* Main weather info */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={`https://openweathermap.org/img/wn/${icon}.png`}
            alt="weather icon"
            style={{ width: 60, height: 60, marginRight: 10 }}
          />
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {temp}°F
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="body2">
            H:{high}° L:{low}°
          </Typography>
          <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
            {description}
          </Typography>
          <Typography variant="body2">{location}</Typography>
        </Box>
      </Box>
      {/* Hourly block */}
      <Box sx={{ mt: 2, display: 'flex', overflowX: 'auto', pb: 1 }}>
        {hourly.map((h, i) => (
          <Box
            key={i}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: '#3b82f6',
              p: 1,
              borderRadius: '12px',
              minWidth: '70px',
              mr: 2,
              '&:last-child': { mr: 0 },
            }}
          >
            <Typography variant="body2">{h.time}</Typography>
            <Box
              component="img"
              src={`https://openweathermap.org/img/wn/${h.icon}.png`}
              alt="weather icon"
              sx={{ width: 40, height: 40, my: 0.5 }} // Added vertical margin
            />
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {h.temp}°F
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
