import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import { UserContext } from '../../utils/auth';
import { Grid } from '@mui/material';

const Navbar = () => {

  const navigate = useNavigate();
  const {user, setUser} = React.useContext(UserContext)

  return (
    <AppBar position="static" style={{ background: '#118CE7' }}>
      <Grid container maxWidth="xl" justifyContent='space-between'>
        <Toolbar disableGutters>
            {
              user.isAdmin === false ?          
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>              
                  <Button
                    onClick={() => navigate("/user/register-club")}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                    Registrarse a un club
                </Button>
              </Box> : <></>
            }
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'}}}>              
                  <Button
                    onClick={() => navigate("/login")}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                    Log out
                </Button>
              </Box>
        </Toolbar>
      </Grid>
    </AppBar>
  );
};
export default Navbar;

