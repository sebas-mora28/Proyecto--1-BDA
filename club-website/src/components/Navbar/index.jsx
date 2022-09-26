import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <AppBar position="static" style={{ background: '#118CE7' }}>
      <Container maxWidth="xl" justifyContext='center'>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Formula1',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#FFFFFF',
              textDecoration: 'none',
              '&:hover': {
                color: "#000000",
             }
            }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>              
              <Button
                  onClick={() => navigate("/user/register-club")}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                  Registrarse a un club
              </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
