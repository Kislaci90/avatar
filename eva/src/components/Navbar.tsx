import React from 'react';
import {Link} from 'react-router-dom';
import {gql} from '@apollo/client';
import {useQuery} from '@apollo/client/react';
import {AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography} from '@mui/material';
import {ExitToApp, LocationOn, Login, Person, PersonAdd, Search} from '@mui/icons-material';
import type {GetMeResult} from "../services/users.ts";
import LanguageSwitcher from './LanguageSwitcher';
import {useTranslation} from "react-i18next";

const GET_CURRENT_USER = gql`
    query GetMe {
        getMe {
            id
            username
            email
            fullName
        }
    }
`;

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useQuery<GetMeResult>(GET_CURRENT_USER);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
            }}
          >
            {t('navigation.brand')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            component={Link}
            to="/pitches"
            sx={{color: 'white'}}
            startIcon={<Search />}
          >
            {t('navigation.findPitches')}
          </Button>

          <Button
            component={Link}
            to="/locations"
            sx={{color: 'white'}}
            startIcon={<LocationOn />}
          >
            {t('navigation.findLocations')}
          </Button>

          <LanguageSwitcher />

          {data?.getMe? (
            <>
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
                  <Typography variant="h5">
                    {t('navigation.welcome')}, {data.getMe.username}!
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                  <ExitToApp sx={{ mr: 1 }} />
                  {t('navigation.logout')}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{color: 'white'}}
                color="primary"
                startIcon={<Login/>}
              >
                {t('navigation.login')}
              </Button>
              <Button
                component={Link}
                to="/register"
                sx={{color: 'white'}}
                color="primary"
                startIcon={<PersonAdd />}
              >
                {t('navigation.register')}
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 