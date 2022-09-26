import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm, Form } from '../../../components/UseForm';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { baseUrl } from '../../../utils/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const RegisterAdmin = () => {

    const navigate = useNavigate();

    const initialValues = {
        user: '',
        password: '',
        names: '',
        lastnames: '',
    }


    const validate = (fieldValues = values) => {
        let temp = {...errors}
        temp.user = fieldValues.user === "" ? "Este espacio es reqerido" : ""
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



    /**
     * If the validate function returns true, then run the auth function.
    */
    const submit = (e) => {
        e.preventDefault();
        if(validate()){
          axios({method: 'POST', url: `${baseUrl}/users/CreateUser`, data: {
            ...values, section: '', isAdmin: true
          }}).then((response) => {
            navigate("/login")
            
            
          })
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
        <AccountCircleIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Crear cuenta : Administrador
      </Typography>
      <Typography component="h1" variant="h5">
      </Typography>
      <Box component="form" onSubmit={submit} noValidate sx={{ mt: 1 }}>
      <TextField
          margin="normal"
          required
          fullWidth
          name="user"
          label="Usuario"
          type="text"
          id="user"
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
          required
          fullWidth
          name="names"
          label="Nombre"
          type="text"
          id="names"
          autoComplete="Name"
          onChange={handleInputChange}
          value={values.names}
          {...(errors.names && {error:true, helperText:errors.names})}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastnames"
          label="Apellidos"
          name="lastnames"
          autoComplete="email"
          autoFocus
          onChange={handleInputChange}
          value={values.lastnames}
          {...(errors.lastnames && {error:true, helperText:errors.lastnames})}
        />
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

export default RegisterAdmin
