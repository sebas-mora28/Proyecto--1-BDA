import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm, Form } from '../../components/UseForm';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const Login = () => {

    const [authError, setAuthError] = useState(false)
    const [authErrorMessage, setAuthErrorMessage] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const navigate = useNavigate();

    const initialValues = {
        Email: '',
        Password: ''
    }


    const validate = (fieldValues = values) => {
        let temp = {...errors}
        temp.Email = fieldValues.Email === "" ? "Este espacio es reqerido" : ""
        temp.Password = fieldValues.Password === "" ? "Este espacio es requerido" : ""  

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



    /**
     * If the validate function returns true, then run the auth function.
    */
    const submit = (e) => {
        e.preventDefault();
        if(validate()){
        }
    }

    return (
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Ingresa a tu cuenta
            </Typography>
            <Typography component="h1" variant="h5">
             {isAdmin ? "Administrador" : "Estudiante"}
            </Typography>
            <Typography component="span" variant="subtitle2" style={{display: (authError ? "" : "none"), color: '#D11616', fontWeight: 'bold', marginTop: '3%'}}>
              {authErrorMessage}
            </Typography>
            <Box component="form" onSubmit={submit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="Email"
                autoComplete="email"
                autoFocus
                onChange={handleInputChange}
                value={values.Email}
                {...(errors.Email && {error:true, helperText:errors.Email})}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleInputChange}
                value={values.Password}
                {...(errors.Password && {error:true, helperText:errors.Password})}
              />
              <Button sx={{mt:0}} onClick={() => setIsAdmin(!isAdmin) }>{isAdmin ? "Ingresar como estudiante" : "Ingresar como administrador"}</Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ background: '#118CE7' }}
              >
                Ingresar
              </Button>
            </Box>
          </Box>
        </Container>
    )
}

export default Login;