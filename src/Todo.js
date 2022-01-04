import React, { useEffect, useState } from "react";
import Sidebar from "./Components/Sidebar"
import List from "./Components/List";
import TodoForm from "./Components/TodoForm";
import Item from "./Components/Item"
import "./Todo.css";

const SAVED_ITEMS="savedItems";

function Todo(){

 
    // ---------- TASK FUNCTIONS ---------- //
    const [items, setItems] = useState([]);

    // When opening the app, if there is any task saved on the localStorage, add it to the list.
    useEffect(()=>{
        let savedItems = JSON.parse(localStorage.getItem(SAVED_ITEMS));
        if(savedItems){
            setItems(savedItems);
        }
    },[]);

    // Every time the array with the items update, save it to the localStorage
    useEffect(()=>{
        localStorage.setItem(SAVED_ITEMS, JSON.stringify(items));
    }, [items]);


    // Adding new task
    function onAddItem(text) {

        let it = new Item(text);

        setItems([it, ...items]);

    }
    // Deleting a task
    function onItemDeleted(item) {
        
        let filteredItems = items.filter(it => it.id !== item.id)

        setItems(filteredItems);
    }

    function updateTaskDone(item, value){
        item.done=value;
        localStorage.setItem(SAVED_ITEMS, JSON.stringify(items));
    }
     // ------- CLOSING TASK FUNCTIONS -------- //


     function toggleSidebar(){
        const sidebar = document.getElementsByClassName("sidebar")[0];
        sidebar.classList.toggle("showSidebar");
        

        const overlay = document.getElementsByClassName("overlay")[0]
        overlay.classList.toggle("overlayActive");
     }


    return (
        <div className="container px-0 pt-1">

            {/* <TodoForm onAddItem={onAddItem}></TodoForm> */}

            {/* -----Mobile elements----- */}
            <div className="overlay"></div>
            <button className="mobileBtn" id="hamburguerBtn" onClick={toggleSidebar}><i className="bi bi-list"></i></button>
            {/* ------------------------ */}

            <Sidebar toggleSidebar={toggleSidebar}></Sidebar>

            <List updateTaskDone={updateTaskDone} onItemDeleted={onItemDeleted} items={items}></List>

        </div>
    )
}




export default Todo;