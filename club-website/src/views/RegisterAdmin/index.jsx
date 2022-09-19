import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm, Form } from '../../components/UseForm';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const RegisterAdmin = () => {

    const initialValues = {
        Email: '',
        Password: '',
        Name: '',
        Group: '',
    }


    const validate = (fieldValues = values) => {
        let temp = {...errors}
        temp.Email = fieldValues.Email === "" ? "Este espacio es reqerido" : ""
        temp.Password = fieldValues.Password === "" ? "Este espacio es requerido" : ""  
        temp.Name = fieldValues.Name === "" ? "Este espacio es requerido" : ""
    
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
          name="Name"
          label="Nombre completo"
          type="text"
          id="Name"
          autoComplete="Name"
          onChange={handleInputChange}
          value={values.Password}
          {...(errors.Name && {error:true, helperText:errors.Name})}
        />
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
