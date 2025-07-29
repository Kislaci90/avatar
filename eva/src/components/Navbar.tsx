import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  CircularProgress,
  Avatar,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';
import { SportsSoccer, Person, ExitToApp, Search, Brightness4, Brightness7, LocationOn } from '@mui/icons-material';
import { useTheme, Theme } from '@mui/material/styles';
import { useThemeMode } from '../theme';

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      username
      email
      role
    }
  }
`;

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading } = useQuery(GET_CURRENT_USER);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme: Theme = useTheme();
  const { mode, toggleMode } = useThemeMode();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <SportsSoccer sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
              '&:hover': {
                color: '#bbf7d0'
              }
            }}
          >
            Eva - Football Pitches
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            component={Link}
            to="/pitches"
            color="inherit"
            startIcon={<Search />}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Find Pitches
          </Button>

          <Button
            component={Link}
            to="/locations"
            color="inherit"
            startIcon={<LocationOn />}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Find Locations
          </Button>

          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : data?.currentUser ? (
            <>
              <Button
                component={Link}
                to="/my-pitches"
                color="inherit"
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                My Pitches
              </Button>
              
              <IconButton
                onClick={handleMenu}
                color="inherit"
                sx={{ ml: 1 }}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
                  <Person />
                </Avatar>
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem disabled>
                  <Typography variant="body2" color="text.secondary">
                    Welcome, {data.currentUser.username}!
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                  <ExitToApp sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                color="primary"
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                color="primary"
              >
                Register
              </Button>
            </>
          )}
          <IconButton sx={{ ml: 2 }} color="inherit" onClick={toggleMode}>
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 