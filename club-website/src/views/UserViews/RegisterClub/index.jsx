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
import { useEffect } from 'react'
import axios from 'axios'
import { baseUrl } from '../../../utils/api'
import { useContext } from 'react'
import { UserContext } from '../../../utils/auth'
import Alert from '../../../components/Alert'
import { Navigate, useNavigate } from 'react-router-dom'

const RegisterClub = () => {
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [clubs, setClubs] = useState([]);
    const [dragAndDropData, setDragAndDropData] = useState({});

    const {user, setUser} = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
        updateStatus(user._id)
    }, [])


    useEffect(() => {
        if(!open){
            updateStatus(user._id)
        }
    }, [open])


    const updateStatus = (userId) => {

        axios({method: 'GET', url: `${baseUrl}/clubs`})
        .then((response) =>{
            if(response.data){
                const clubs = response.data
                axios({method: 'GET', url: `${baseUrl}/clubs/myClubs/${userId}`})
                .then((responseMyClubs) => {
                    if(response.data){
                        const myClubs = responseMyClubs.data
                        console.log("myClubs: ", myClubs)
                        const newClubs = clubs.map(c => {
                            c.status = myClubs.find(mc => mc._id === c._id) ? "subscribed" : "available"  
                            return c

                        })
                        console.log("newClubs: ", newClubs)
                        setClubs(newClubs)
                    }
                })
            }
        })
    }

    useEffect(() => {

        const {clubId, board} = dragAndDropData;
        if(board === "board-available"){
            console.log("Entra a cursos disponibles")
            axios({ method: 'PUT', 
                    url: `${baseUrl}/clubs/unsubscribe`, 
                    data: { id: clubId, idU: user._id}})
                .then((response) => {
                updateStatus(user._id)
            })
        }
        if(board === "board-subscribed"){
            console.log("Entra a cursos suscritos")
            axios({ method: 'PUT', 
                    url: `${baseUrl}/clubs/subscribe`, 
                    data: { id: clubId, idU: user._id}})
                .then((response) => {
                    updateStatus(user._id)
            })
        }        
    }, [dragAndDropData])


    const updateClubs = (id, board) => {
        setDragAndDropData({clubId: id, board: board})
    }

    useEffect(() => {
        console.log("clubs: ", clubs)
    }, [clubs])


    const save = () => {

        if(clubs.find(c => c.status === "subscribed")){
             navigate("/user/my-clubs")
        }else {
            setOpenError(true)
        }
    }



    return (
        <DndProvider backend={HTML5Backend}>
            <Alert title="Debe encontrarse registrado en al menos un curso" open={openError} handleClose={setOpenError} />
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
                            addItem={updateClubs}
                            type={"subscribed"}
                        >
                            <List sx={{height: 400, width:450, overflow: 'auto', border:'4px solid #B8B8B8', borderRadius:'5px' ,justifyContent:'center'}}>
                            {
                                    clubs.map((club, i) => {
                                        return club.status ==="available" ?                  
                                            <ItemDraggable key={i} id={club._id} type={"available"}>
                                                <ItemClub 
                                                        name={club.name} 
                                                        category={club.category}
                                                        number_of_suggestions={club.followers.length}
                                                        />
                                            </ItemDraggable> : <></>
                                        }
                                    )
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
                            addItem={updateClubs}
                            type={"available"}
                        >
                            <List sx={{height: 400, width:450, overflow: 'auto', border:'4px solid #B8B8B8', borderRadius:'5px' ,justifyContent:'center'}}>
                                {
                                    clubs.map((club, i) => {
                                        return club.status ==="subscribed" ?                  
                                            <ItemDraggable key={i} id={club._id} type={"subscribed"}>
                                                <ItemClub 
                                                        name={club.name} 
                                                        category={club.category}
                                                        number_of_suggestions={club.followers.length}
                                                        />
                                            </ItemDraggable> : <></>
                                        }
                                    )
                                }
                            </List>
                        </DragWrapper>
                    </Grid>
                </Grid> 
                <Grid item container md={12} justifyContent='center'>
                    <Button variant="contained" onClick={() => save()}>Guardar</Button>

                </Grid>               
            </Grid>
        </DndProvider>
    )
}

export default RegisterClub