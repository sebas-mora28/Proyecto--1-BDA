import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm, Form } from '../../../components/UseForm';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { baseUrl } from '../../../utils/api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../utils/auth';

const RegisterUser = () => {

    const navigate = useNavigate()
    const {user, setUser} = useContext(UserContext)

    const initialValues = {
        user: '',
        password: '',
        names: '',
        lastnames: '',
        section: '',
    }

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        temp.user = fieldValues.user === "" ? "Este espacio es requerido" : ""
        temp.password = fieldValues.password === "" ? "Este espacio es requerido" : ""  
        temp.names = fieldValues.names === "" ? "Este espacio es requerido" : ""
        temp.lastnames = fieldValues.lastnames === "" ? "Este espacio es requerido" : ""
       
        setErrors({
            ...temp
        })
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
  
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialValues, true, validate);


    const nextStep = () => {
        console.log("entra: ", validate())
        if(validate()){
            axios({method: 'POST', url: `${baseUrl}/users/createUser`, data: {
                ...values, isAdmin: false
              }}).then((response) => {
                const user = response.data
                setUser(user)
                navigate("/user/register-club")


                })
        }
    }
  
  return (
    <>
    <Container component="main" maxWidth="xs">
        <CssBaseline />
              <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Crear cuenta : Usuario
            </Typography>
            <Typography component="h1" variant="h5">
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                name="names"
                label="Nombre"
                type="text"
                id="names"
                onChange={handleInputChange}
                value={values.names}
                {...(errors.names && {error:true, helperText:errors.names})}
              />
            <TextField
                margin="normal"
                required
                fullWidth
                name="lastnames"
                label="Apellidos"
                type="text"
                id="lastnames"
                onChange={handleInputChange}
                value={values.lastnames}
                {...(errors.lastnames && {error:true, helperText:errors.lastnames})}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label="Usuario"
                name="user"
                autoComplete="user"
                autoFocus
                onChange={handleInputChange}
                value={values.user}
                {...(errors.user && {error:true, helperText:errors.user})}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleInputChange}
                value={values.password}
                {...(errors.password && {error:true, helperText:errors.password})}
              />

              <TextField
                margin="normal"
                fullWidth
                name="section"
                label="Seccion"
                type="text"
                id="group"
                onChange={handleInputChange}
                value={values.section}
              />

          
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ background: '#118CE7' }}
                onClick={() => nextStep()}
              >
                Siguiente
              </Button>
            </Box>
        </Box>
    </Container>
  </>
  )
}

export default RegisterUser;