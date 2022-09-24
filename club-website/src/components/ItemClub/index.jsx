import { Grid, ListItem } from "@mui/material";


const ItemClub = ({name, category, number_of_suggestions}) => {

    return (
        <ListItem>
            <Grid style={{backgroundColor: 'rgba(231, 231, 231, 0.9)' }}  container sx={{border: 'transparent', borderRadius: '5px', backgroundColor: 'white'}} padding={2}>
               <Grid item container md={6}>
                    <Grid item md={12} ml={1}>
                        <span><strong>Nombre: </strong> {name} </span>
                    </Grid>
                    <Grid item md={12} ml={1} mt={1}>
                        <span><strong>Categoría:</strong> {category}</span>
                    </Grid>
               </Grid>
               <Grid item container md={6}>
                    <Grid item container md={12} justifyContent='center'>
                        <span>Número de sugerencias</span>
                    </Grid>
                    <Grid item container md={12} justifyContent='center'>
                        <h1 style={{marginBlockStart: 0, marginBlockEnd:0}}>{number_of_suggestions}</h1>
                    </Grid>
               </Grid>
            </Grid>
        </ListItem>

    )





}


export default ItemClub;