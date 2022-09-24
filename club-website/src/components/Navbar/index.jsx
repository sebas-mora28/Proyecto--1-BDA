import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SpeedIcon from '@mui/icons-material/Speed';
import ProfileIcon from '@mui/icons-material/Person';
import {Link} from 'react-router-dom';
import {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { UserContext } from '../../App';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElRace, setAnchorElRace] = React.useState(null);



  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenRaceMenu = (event) => {
    setAnchorElRace(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static" style={{ background: '#118CE7' }}>
      <Container maxWidth="xl">
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
