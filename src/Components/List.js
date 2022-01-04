import React from "react";
import ListItem from "./ListItem";


function List(props){


    return (
        <div className="listContainer fullScreenHeight py-3">
            <h1 className="todoTitle mt-2 mb-0 ">Todo</h1>

            <ul className="list d-flex flex-column align-items-start w-100 px-0 pt-1 mt-0">
                {props.items.map( item=> <ListItem key={item.id} item={item} updateTaskDone={props.updateTaskDone} onItemDeleted={props.onItemDeleted}></ListItem>)}
            
            </ul>
        </div>
    )
}

export default List;
