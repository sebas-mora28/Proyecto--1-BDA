import { useDrag } from "react-dnd"; 


/**
 * This components makes a item draggable
 * @param {Integer} id item id 
 * @param {String} type item type 
 * @param {String} children children component
 * @returns 
 */
const ItemDraggable = ({id, type, children }) => {

    const [{isDragging}, drag] = useDrag(() => ({
        type: type,
        item: {id: id},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),

        }),
    }))


    return (
      <div
        ref={drag}
      >
          {children}

      </div>
    )
}

export default ItemDraggable;