import { FormControl, Grid, InputLabel, MenuItem, TextField } from '@mui/material';
import React, { useEffect } from 'react'
import Header from '../Header';
import Modal from '../Modal';
import { useForm, Form } from '../UseForm';
import { Select, Button } from '@mui/material';
import { FormHelperText } from '@mui/material';
import axios from 'axios';
import { baseUrl } from '../../utils/api';
import { UserContext } from '../../utils/auth';
import { useContext } from 'react';

const CreateClub = ({open, setOpen}) => {

    const {user, setUser} = useContext(UserContext)

    const initialValues = {
        name: '',
        category: ''
    }

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        temp.name = fieldValues.name === "" ? "Este espacio es reqerido" : ""
        temp.category = fieldValues.category === "" ? "Este espacio es requerido" : ""  

        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const submit = (e) => {

        e.preventDefault();

        if(validate()){
            const body = {...values, idUser: user._id}
            console.log(body)
            axios({method: 'POST', url:`${baseUrl}/clubs/CreateClub`, data: body})
            setOpen(false);
        }
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialValues, true, validate);


    return (
      <Modal open={open}>
        <Form onSubmit={submit}>
          <Grid container>
            <Grid item container md={12} justifyContent='center'>
              <h2>Crear club</h2>
            </Grid>
            <Grid item container md={12} mt={3}>
                <Grid item container md={12} justifyContent='center'>
                    <TextField 
                              label="Nombre del club"
                              name="name"
                              placeholder=""
                              value={values.name}
                              onChange={handleInputChange}
                              InputLabelProps={{
                                  shrink: true,
                              }}
                              sx={{width: '60%'}} 
                              {...(errors.name && {error:true, helperText:errors.name})}
                          />
                </Grid>
                <Grid item container md={12} mt={4} justifyContent='center'>
                    <Grid item md={5}>
                        <FormControl fullWidth sx={{display:'flex',justifyContent:'center'}}> 
                            <InputLabel id="category">Category*</InputLabel>               
                            <Select
                                label="Category*"
                                name="category"
                                id="category"
                                value={values.category}
                                onChange={handleInputChange}
                                sx={{width: '70%' }} 
                                error={errors.category !== '' && errors.category !== undefined ? true : false}
                                >
                                <MenuItem value="sport">Deportes</MenuItem>
                                <MenuItem value="art">Artes</MenuItem>
                                <MenuItem value="idioms">Idiomas</MenuItem>
                                <MenuItem value="math">Matematicas</MenuItem>
                                <MenuItem value="science">Ciencias</MenuItem>
                                <MenuItem value="handcraft">Manualidades</MenuItem>
                            </Select>
                            {errors.category && <FormHelperText htmlFor="countryBox" error> {errors.category} </FormHelperText>}
                        </FormControl>

                    </Grid>

                </Grid>
                <Grid item container md={12} mt={4} mb={4} justifyContent='center'>
                    <Button variant='contained' type="submit">Crear</Button>
                </Grid>
            </Grid>
          </Grid>
        </Form>
      </Modal>
  )
}

export default CreateClub;
