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

    // Every time the array with the items update...
    useEffect(()=>{
        // Save it to the localStorage
        localStorage.setItem(SAVED_ITEMS, JSON.stringify(items));


        updateTaskPanelValues();

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

        updateTaskPanelValues();
    }

    function updateTaskPanelValues(){
        let isPanelVisible = document.getElementsByClassName("listPanel")[0];

        if(isPanelVisible){
            // task Number
            let taskNumber = items.length;
            document.getElementsByClassName("panelItemNumber")[0].innerHTML=taskNumber;

            // done number
            let doneItems = items.filter(it=>it.done);
            let completedTasksNumber = doneItems.length;
            document.getElementsByClassName("panelItemNumber")[1].innerHTML=completedTasksNumber;
        }


    }
     // ------- CLOSING TASK FUNCTIONS -------- //


     function toggleSidebar(){
        const sidebar = document.getElementsByClassName("sidebar")[0];
        sidebar.classList.toggle("showSidebar");


        const overlay = document.getElementsByClassName("overlay")[0]
        overlay.classList.toggle("overlayActive");
     }

     function hideInputField(){
        let inputField = document.getElementsByClassName("newItemField")[0];
        inputField.classList.remove("showNewItemField");

        document.getElementById("todayOption").checked=true;

    }


    return (
        <div className="container px-0 pt-1">

            {/* -----Mobile elements----- */}
            <div className="overlay"></div>
            <button className="mobileBtn floatBtn" id="hamburguerBtn" onClick={toggleSidebar}><i className="bi bi-list"></i></button>
            {/* ------------------------ */}

            {/* --------alerts---------- */}
            <div className="alert alert-success" role="alert">
            <i className="bi bi-check-circle-fill"></i>New task added successfuly
            </div>

            <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle-fill"></i> Your task should have a name
            </div>
            {/* ------------------------ */}

            <Sidebar toggleSidebar={toggleSidebar
            } hideInputField={hideInputField}></Sidebar>

            <List updateTaskDone={updateTaskDone} onItemDeleted={onItemDeleted} items={items}></List>

            <TodoForm onAddItem={onAddItem} hideInputField={hideInputField}></TodoForm>

        </div>
    )
}




export default Todo;