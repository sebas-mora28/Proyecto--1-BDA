import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Header =({title, backUrl}) => {

    const navigate = useNavigate();
    return (
      <Grid item container md={12} mt={4} ml={4}>
      <Grid item container md={1}>
        <IconButton onClick={() => navigate(backUrl)}>        
          <ArrowBackIosNewIcon/>
        </IconButton>
      </Grid>
      <Grid item container md={10} justifyContent='center' ml={1}>
        <h1>{title}</h1>
      </Grid>
    </Grid>
    )
}

export default Header;