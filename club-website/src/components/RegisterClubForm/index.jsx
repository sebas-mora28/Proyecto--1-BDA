import React from 'react'
import { Button, Grid, List } from '@mui/material'
import Header from '../Header'
import DragWrapper from '../DragWrapper'
import { useState } from 'react'
import ItemDraggable from '../ItemDraggable'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import CreateClub from '../CreateClub'
import ItemClub from '../ItemClub'
import { useEffect } from 'react'
import axios from 'axios'
import { baseUrl } from '../../utils/api'
import { getCurrentUser, UserContext } from '../../utils/auth'
import Alert from '../Alert'
import { addStatusAttr } from '../../utils/util'
import { useContext } from 'react'

const RegisterClubForm = ({clubs, setClubs, finishRegisterUser}) => {
    const [open, setOpen] = useState(false);
    const [dragAndDropData, setDragAndDropData] = useState({});
    const [currentUser , setCurrentUser] = useState({});
    const [openError, setOpenError] = useState(false);
    const [myClubs, setMyClubs] = useState([]);

    const {user, setUser} = useContext(UserContext)

    const updateStatus = () => {

        axios({method: 'GET', url: `${baseUrl}/clubs/${currentUser._id}`})
        .then((response) =>{
            if(response.data){

                const newClubs = clubs.map(c => {
                    if(myClubs.find(mc => mc._id === c._id)){
                        c.status = "subscribed"
                    }
                    return c;
                })
                setClubs(newClubs)
            }
        })

    }

    useEffect(() => {
        if(!open){
            updateStatus();
        }
    }, [open])




    useEffect(() => {
        const {clubId, board} = dragAndDropData;
        if(board === "board-available"){
            console.log("Entra a cursos disponibles")
            const updatedClubs = clubs.map(c => {
                        if(c._id === clubId){
                            c.status = "available"
                        }
                        return c;
                })
            setClubs(updatedClubs)
        }

        if(board === "board-subscribed"){
            console.log("Entra a cursos suscritos")
                const updatedClubs = clubs.map(c => {
                        if(c._id === clubId){
                            c.status = "subscribed"
                        }
                        return c;
                })
                setClubs(updatedClubs)
            }        
    }, [dragAndDropData])


    const updateClubs = (id, board) => {
        setDragAndDropData({clubId: id, board: board})
    }

    const finalize = () => {

        const myClubs = clubs.filter(c => c.status === "subscribed")
        if(myClubs.length !== 0){
            finishRegisterUser();

        } else {
            setOpenError(true);
        }
    }



    return (
        <DndProvider backend={HTML5Backend}>
            <Alert title={"Debe registrar al menos un club"} open={openError} handleClose={setOpenError} />
            <CreateClub open={open} setOpen={setOpen}/>
            <Grid container>
                <Grid item container md={12} justifyContent='center'>
                    <h2>Registrar clubs</h2>
                </Grid>
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
                                                        number_of_suggestions={club.followers}
                                                        />
                                            </ItemDraggable> : <></>
                                        }
                                    )
                                }
                            </List>
                        </DragWrapper>
                    </Grid>
                </Grid>
                <Grid item container md={6} justifyContent='center' mt={3}>
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
                                                        number_of_suggestions={club.followers}
                                                        />
                                            </ItemDraggable> : <></>
                                        }
                                    )
                                }
                            </List>
                        </DragWrapper>
                    </Grid>
                </Grid>  
                <Grid item container md={12} justifyContent='center' mt={2}>
                    <Button variant='contained' onClick={() => finalize()}>Finalizar</Button>
                </Grid>                
            </Grid>
        </DndProvider>
    )
}

export default RegisterClubForm