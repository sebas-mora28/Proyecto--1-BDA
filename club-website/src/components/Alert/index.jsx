import { Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

/**
 * @description This component create a new alert dialog to display information. 
 * The dialog contains a title and a body. 
 * @param {String}   title
 * @param {String}   content
 * @param {Boolean}  open 
 * @param {function} handleClose  
 * @returns 
 */

const Alert = ({title, content, open, handleClose}) => {
 
    return (

        <Dialog open={open} >

            <DialogTitle>{title}</DialogTitle>
            <DialogContent> 
                <DialogContentText>
                    {content} 
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => handleClose(false)} >Ok</Button>
            </DialogActions>



        </Dialog>

    )
}

export default Alert;