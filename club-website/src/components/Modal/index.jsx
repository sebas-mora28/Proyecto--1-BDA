import { Dialog } from "@mui/material";


/**
 * This component creates a dialog
 * @param {Object} props 
 * @returns 
 */
const Modal = (props) => {

    const {children, ...others} = props;
    return (
        <Dialog open={props.open} {...others} PaperProps={{
            sx: {
                minWidth: '600px',
                overflow: 'hidden'

            }
        }}>
                {props.children}
        </Dialog>
    )
}


export default Modal;