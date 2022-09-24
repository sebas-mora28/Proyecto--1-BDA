import { FormControl, Grid, InputLabel, MenuItem, TextField } from '@mui/material';
import React, { useEffect } from 'react'
import Header from '../Header';
import Modal from '../Modal';
import { useForm, Form } from '../UseForm';
import { Select, Button } from '@mui/material';
import { FormHelperText } from '@mui/material';

const CreateClub = ({open, setOpen}) => {

    const initialValues = {
        NameClub: '',
        Category: ''
    }

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        temp.NameClub = fieldValues.NameClub === "" ? "Este espacio es reqerido" : ""
        temp.Category = fieldValues.Category === "" ? "Este espacio es requerido" : ""  

        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const submit = (e) => {

        e.preventDefault();

        if(validate()){
            console.log("entra")
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
                              name="NameClub"
                              placeholder=""
                              value={values.NameClub}
                              onChange={handleInputChange}
                              InputLabelProps={{
                                  shrink: true,
                              }}
                              sx={{width: '60%'}} 
                              {...(errors.NameClub && {error:true, helperText:errors.NameClub})}
                          />
                </Grid>
                <Grid item container md={12} mt={4} justifyContent='center'>
                    <Grid item md={5}>
                        <FormControl fullWidth sx={{display:'flex',justifyContent:'center'}}> 
                            <InputLabel id="category">Category*</InputLabel>               
                            <Select
                                label="Category*"
                                name="Category"
                                id="category"
                                value={values.Category}
                                onChange={handleInputChange}
                                sx={{width: '70%' }} 
                                error={errors.Category !== '' && errors.Category !== undefined ? true : false}
                                >
                                <MenuItem value="sport">Deportes</MenuItem>
                                <MenuItem value="art">Artes</MenuItem>
                                <MenuItem value="idioms">Idiomas</MenuItem>
                                <MenuItem value="math">Matematicas</MenuItem>
                                <MenuItem value="science">Ciencias</MenuItem>
                                <MenuItem value="handcraft">Manualidades</MenuItem>
                            </Select>
                            {errors.Category && <FormHelperText htmlFor="countryBox" error> {errors.Category} </FormHelperText>}
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
