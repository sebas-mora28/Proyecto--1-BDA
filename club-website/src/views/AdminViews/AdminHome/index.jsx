import React, { useContext } from 'react'
import { Grid, Button } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../utils/auth'

const AdminHome = () => {

    const navigate = useNavigate();
    const user = useContext(UserContext)

    return (
        <Grid container>
            <Grid container mt={3} justifyContent='center'>
                <h1>Bievenido: {user.names} </h1>
            </Grid>
            <Grid container mt={3} justifyContent='center' alignItems='center' rowSpacing={4}>
                <Grid item container md={6} justifyContent='center'>
                    <Button variant='contained' 
                            size='large' 
                            sx={{padding: '1.5rem'}}
                            onClick={() => navigate("/admin/clubs-by-category")}
                            >
                                Clubes por categoría</Button>
                </Grid>
                <Grid item container md={6} justifyContent='center'>
                    <Button variant='contained' 
                            size='large' 
                            sx={{padding: '1.5rem'}}
                            onClick={() => navigate("/admin/student-more-suggestions")}
                            >
                            Estudiantes con más sugerencias</Button>
                </Grid>
                <Grid item container md={6} justifyContent='center'>
                    <Button variant='contained' 
                            size='large' 
                            sx={{padding: '1.5rem'}}
                            onClick={() => navigate("/admin/top5-clubs")}
                            >
                            Top 5 clubes</Button>
                </Grid>
                <Grid item container md={6} justifyContent='center'>
                    <Button variant='contained' 
                            size='large' 
                            sx={{padding: '1.5rem'}}
                            onClick={() => navigate("/admin/bottom3-clubs")}
                            >
                            Bottom 3 clubes</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AdminHome;
