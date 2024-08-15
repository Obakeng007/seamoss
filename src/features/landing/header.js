import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import { logo } from '../../assets/index'; // Adjust the path as needed

export const Header = ({ isProductList = false }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  // Navigation settings
  const navigationLinks = [
    { name: 'Home', to: '/seasmoss' },
   // { name: 'Shop', to: '/shop' },
    { name: 'Login', to: '/login' },
    { name: 'Sign Up', to: '/signup' }
  ];

  return (
    <AppBar position="sticky" sx={{ backgroundColor: theme.palette.primary.main, boxShadow: "none", color: "text.primary" }}>
      <Toolbar sx={{ p: 1, height: "4rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Company Logo or Image */}
        <Avatar component="a" href="/seasmoss" sx={{ textDecoration: 'none' }} alt="Company Logo" src={logo} />

        <Typography variant="h6" noWrap component="a" href="/seasmoss" sx={{ display: { xs: 'none', md: 'flex' }, fontWeight: 700, letterSpacing: '.3rem', color: 'White', textDecoration: 'none' }}>
          Seamoss Primed
        </Typography>

        {/* Navigation Buttons */}
        <Stack direction="row" spacing={2}>
          {navigationLinks.map((link) => (
            <Button
              key={link.name}
              component={Link}
              to={link.to}
              variant="outlined"
              sx={{ color: 'white', borderColor: 'white' }}
            >
              {link.name}
            </Button>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
