import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm, Form } from '../../components/UseForm';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../utils/api';
import axios from 'axios'
import AlertDialog from '../../components/Alert';
import { UserContext } from '../../utils/auth';

const Login = () => {

    const [authError, setAuthError] = useState(false)
    const [authErrorMessage, setAuthErrorMessage] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [openAlert, setOpenAlert] =useState(false);

    const navigate = useNavigate();
    const {user, setUser} = React.useContext(UserContext)

    useEffect(() => {
      setUser({})
    }, [])

    const initialValues = {
        user: '',
        password: ''
    }

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        temp.user = fieldValues.user === "" ? "Este espacio es reqerido" : ""
        temp.password = fieldValues.password === "" ? "Este espacio es requerido" : ""  

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
          axios({method: 'POST', url: `${baseUrl}/users/${isAdmin ? "adminLogin" :"userLogin"}`, data: values }).then((response) => {
            const user = response.data
            if(user){
              setUser(user);
              const url = user.isAdmin ? "/admin/home" : "/user/my-clubs";
              navigate(url);
            }
          }).catch((error) => {
            setOpenAlert(true)
          })
        }
    }

    return (
        <Container component="main" maxWidth="xs">
          <AlertDialog title="Usuario o contraseña incorrecta" open={openAlert} handleClose={setOpenAlert}/>
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
            <Button sx={{mt:1}} onClick={() => setIsAdmin(!isAdmin) }>{isAdmin ? "Ingresar como estudiante" : "Ingresar como administrador"}</Button>
            <Box component="form" onSubmit={submit} noValidate sx={{ mt: 1 }}>
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
              <Grid container mt={1} justifyContent='center'>
              <Button onClick={() => navigate(`/register-${isAdmin ? "admin" : "user"}`) }>Crear cuenta</Button>
              </Grid>
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