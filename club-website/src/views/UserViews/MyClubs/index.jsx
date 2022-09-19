import React from 'react'
import { Grid, List } from '@mui/material';
import ItemClub from '../../../components/ItemClub';
import { useState } from 'react';
const MyClubs = () => {

    const [myClubs, setMyClubs] = useState([{name: "yoga", category: "sport", number_of_suggestions: 10}]);

    return (
      <Grid container justifyContent='center'>

          <Grid item container md={12} mt={2} justifyContent='center'>
              <h1>Mis clubes</h1>

          </Grid>

          <Grid item container md={12} mt={2} justifyContent='center'>
              <List sx={{height: 400, width:600, overflow: 'auto', border:'4px solid #B8B8B8', borderRadius:'5px' ,justifyContent:'center'}}>
                  {
                    myClubs.map(club => (
                        <ItemClub   name={club.name} 
                                    category={club.category} 
                                    number_of_suggestions={club.number_of_suggestions}
                        />
                    ))
                  }

              </List>
          </Grid>
      </Grid>
    )
}

export default MyClubs;
