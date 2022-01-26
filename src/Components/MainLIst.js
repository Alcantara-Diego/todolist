import React from "react";
import ListItem from "./ListItem";
import logo from '../assets/svg1.svg';


function MainList(props){


    return(
    <main className="mainList flex-column">
        <h1 className="todoTitle mx-3 mt-2 mb-0 ">Todo</h1>

        <aside className="emptyListMsg">
            <img src={logo} alt=""></img>
            <p className="emptyListMsgPTag">You have no tasks yet :( <br></br> Create a new one to remember your goals! </p>
        </aside>

        <ul className="list flex-column align-items-start w-100  pt-1 px-3 mt-0">
            {props.items.map( item=> <ListItem key={item.id} item={item} updateTaskDone={props.updateTaskDone}  onItemDeleted={props.onItemDeleted} refreshLists={props.refreshLists}></ListItem>)}
        
        </ul>
    </main>
    )
}

export default MainList;