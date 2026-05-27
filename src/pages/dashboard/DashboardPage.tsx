import { useAuth0 } from '@auth0/auth0-react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const DashboardPage = () => {
  const { user, logout } = useAuth0();

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography gutterBottom>
          Welcome back, <strong>{user?.email}</strong>
        </Typography>
        <Paper sx={{ p: 3, my: 3 }}>
          <Typography variant="h6" gutterBottom>
            User Profile
          </Typography>
          {user?.picture && (
            <Avatar src={user.picture} alt="avatar" sx={{ width: 64, height: 64, mb: 2 }} />
          )}
          <List dense>
            <ListItem>
              <strong>Name:</strong>&nbsp;{user?.name}
            </ListItem>
            <ListItem>
              <strong>Email:</strong>&nbsp;{user?.email}
            </ListItem>
            <ListItem>
              <strong>Email verified:</strong>&nbsp;{user?.email_verified ? 'Yes' : 'No'}
            </ListItem>
            <ListItem>
              <strong>Sub:</strong>&nbsp;{user?.sub}
            </ListItem>
          </List>
        </Paper>
        <Button
          variant="contained"
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default DashboardPage;
