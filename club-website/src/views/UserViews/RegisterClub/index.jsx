import React from 'react'
import { Button, Grid, List } from '@mui/material'
import Header from '../../../components/Header'
import DragWrapper from '../../../components/DragWrapper'
import { useState } from 'react'
import ItemDraggable from '../../../components/ItemDraggable'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import CreateClub from '../../../components/CreateClub'
import ItemClub from '../../../components/ItemClub'
import { Subscript } from '@mui/icons-material'

const RegisterClub = () => {
    const [open, setOpen] = useState(false);
    const [clubs, setClubs] = useState([{name: "yoga", category: "sport", number_of_suggestions: 10, status: "available"}]);
    const [myClubs, setMyClubs] = useState([{name: "soccer", category: "sport", number_of_suggestions: 10, status: "available"}]);

    const subscribeClub = (name) => {

        const club = clubs.find(c => c.name === name);
        const newClubs = clubs.filter(c => c.name !== name); 
        const newMyClubs = [...myClubs, club];

        setClubs(newClubs)
        setMyClubs(newMyClubs)


    }

    const unsubscribeClub = (name) => {
        const club = myClubs.find(c => c.name === name);
        const newMyClubs = myClubs.filter(c => c.name !== name); 
        const newClubs = [...clubs, club];

        setClubs(newClubs)
        setMyClubs(newMyClubs)

    }

    return (
        <DndProvider backend={HTML5Backend}>
            <CreateClub open={open} setOpen={setOpen}/>
            <Grid container>
                <Header title="Registrar club" backUrl="/user/my-clubs"/>
                <Grid item container md={12} justifyContent='center'>
                    <Button variant='contained' onClick={() => setOpen(true)}>Crear club</Button>
                </Grid>
                <Grid item container md={6} justifyContent='center' mt={3}>
                    <Grid item container md={12} justifyContent='center'>
                        <h3>Cursos disponibles</h3>
                    </Grid>
                    <Grid item container md={12} justifyContent='center'>
                        <DragWrapper
                            id="board-available" 
                            className="board" 
                            addItem={unsubscribeClub}
                            type={"subscribed"}
                        >
                            <List sx={{height: 450, width:450, overflow: 'auto', border:'4px solid #B8B8B8', borderRadius:'5px' ,justifyContent:'center'}}>
                                  {
                                      clubs.map((club, i) => (
                                        <ItemDraggable key={i} id={club.name} type={"available"}>
                                            <ItemClub 
                                                        name={club.name} 
                                                        category={club.category}
                                                        number_of_suggestions={club.number_of_suggestions}
                                            />
                                        </ItemDraggable>
                                    ))
                                  }
                            </List>
                        </DragWrapper>
                    </Grid>
                </Grid>
                <Grid item container md={6} justifyContent={'center'} mt={3}>
                    <Grid item container md={12} justifyContent={'center'}>
                        <h3>Cursos inscritos</h3>
                    </Grid>
                    <Grid item container md={12} justifyContent={'center'}>
                        <DragWrapper
                            id="board-subscribed" 
                            className="board" 
                            addItem={subscribeClub}
                            type={"available"}
                        >
                            <List sx={{height: 450, width:450, overflow: 'auto', border:'4px solid #B8B8B8', borderRadius:'5px' ,justifyContent:'center'}}>
                                  {
                                      myClubs.map((club, i) => (
                                        <ItemDraggable key={i} id={club.name} type={"subscribed"}>
                                            <ItemClub 
                                                        name={club.name} 
                                                        category={club.category}
                                                        number_of_suggestions={club.number_of_suggestions}
                                                        />
                                        </ItemDraggable>
                                    ))
                                  }
                            </List>
                        </DragWrapper>
                    </Grid>
                </Grid>                 
            </Grid>
        </DndProvider>
    )
}

export default RegisterClub