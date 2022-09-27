import React from 'react'
import { Grid, List } from '@mui/material';
import ItemClub from '../../../components/ItemClub';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../utils/api';
import { UserContext } from '../../../utils/auth';
import { useContext } from 'react';
const MyClubs = () => {

    const [myClubs, setMyClubs] = useState([]);
    const {user, setUser} = useContext(UserContext);


    useEffect(() => {
        axios({method: 'GET', url: `${baseUrl}/clubs/myClubs/${user._id}`}).then((response) => {
            if(response.data){
                setMyClubs(response.data);
            }
        })
    }, [])
    
    return (
      <Grid container justifyContent='center'>

        <Grid item container md={12} mt={2} justifyContent='center'>
            <h1>Bievenido: {user.names} {user.lastnames}</h1>
        </Grid>

          <Grid item container md={12} mt={2} justifyContent='center'>
              <h1>Mis clubes</h1>

          </Grid>

          <Grid item container md={12} mt={2} justifyContent='center'>
              <List sx={{height: 400, width:600, overflow: 'auto', border:'4px solid #B8B8B8', borderRadius:'5px' ,justifyContent:'center'}}>
                  {
                    myClubs.map(club => (
                        <ItemClub   name={club.name} 
                                    category={club.category} 
                                    number_of_suggestions={club.followers.length}
                        />
                    ))
                  }

              </List>
          </Grid>
      </Grid>
    )
}

export default MyClubs;
