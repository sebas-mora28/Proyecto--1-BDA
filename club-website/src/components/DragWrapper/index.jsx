import { Grid } from "@mui/material";
import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd"; 



/**
 * This components provides drag and drop functionality
 * @param {React.Component} children all children components 
 * @param {Integer} id 
 * @returns 
 */
const DragWrapper = ({children, id, type, className, addItem})  => {


    const [{isOver}, drop] = useDrop(() => ({
        accept: type,
        drop: (item) => addItem(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })

    }))


    return (
        <div 
            id={id}
            className={className}
            ref={drop}
        >
            {children}
        </div>





    )
}


export default DragWrapper;