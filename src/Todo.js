import React, { useEffect, useState } from "react";
import List from "./Components/List";
import TodoForm from "./Components/TodoForm";
import Item from "./Components/Item"
import "./Todo.css";

const SAVED_ITEMS="savedItems";

function Todo(){

    const [items, setItems] = useState([]);

    

    useEffect(()=>{
        let savedItems = JSON.parse(localStorage.getItem(SAVED_ITEMS));
        if(savedItems){
            setItems(savedItems);
        }
        

    },[]);

    useEffect(()=>{
        localStorage.setItem(SAVED_ITEMS, JSON.stringify(items));
    }, [items]);


    function onAddItem(text) {

        let it = new Item(text);

        setItems([it, ...items]);

    }
    
    function onItemDeleted(item) {
        
        let filteredItems = items.filter(it => it.id !== item.id)

        setItems(filteredItems);
    }

    function updateTaskDone(item, value){
        item.done=value;
        localStorage.setItem(SAVED_ITEMS, JSON.stringify(items));
    }



    return (
        <div className="container px-3 pt-5">

            <TodoForm onAddItem={onAddItem}></TodoForm>

            {/* -----Mobile buttons----- */}
            <button className="mobileBtn" id="hamburguerBtn"><i className="bi bi-list"></i></button>

            <button className="mobileBtn justify-content-center align-items-center" id="addBtn"><i className="bi bi-plus"></i></button>
            {/* ------------------------ */}


            <h1 className="todoTitle mt-4 mb-0 ">Todo</h1>

            <List updateTaskDone={updateTaskDone} onItemDeleted={onItemDeleted} items={items}></List>

        </div>
    )
}




export default Todo;