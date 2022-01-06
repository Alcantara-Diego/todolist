import React from "react";
import ListHeader from "./ListHeader";
import ListItem from "./ListItem";


function List(props){


    return (
        <div className="listContainer fullScreenHeight">
            
            <ListHeader></ListHeader>
            <h1 className="todoTitle mx-3 mt-2 mb-0 ">Todo</h1>

            <ul className="list d-flex flex-column align-items-start w-100  pt-1 px-3 mt-0">
                {props.items.map( item=> <ListItem key={item.id} item={item} updateTaskDone={props.updateTaskDone}  onItemDeleted={props.onItemDeleted}></ListItem>)}
            
            </ul>
        </div>
    )
}

export default List;
