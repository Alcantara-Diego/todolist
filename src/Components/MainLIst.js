import React from "react";
import ListItem from "./ListItem";


function MainList(props){


    return(
    <main className="mainList flex-column">
        <h1 className="todoTitle mx-3 mt-2 mb-0 ">Todo</h1>

        <ul className="list flex-column align-items-start w-100  pt-1 px-3 mt-0">
            {props.items.map( item=> <ListItem key={item.id} item={item} updateTaskDone={props.updateTaskDone}  onItemDeleted={props.onItemDeleted} refreshLists={props.refreshLists}></ListItem>)}
        
        </ul>
    </main>
    )
}

export default MainList;