import React, { useEffect, useState } from "react";
import ListHeader from "./ListHeader";
import MainList from "./MainLIst";
import HabitList from "./HabitList";


function ListsContainer(props){

    // Update all lists at the same time----------
    const [update, setUpdate] = useState(true);

    useEffect(()=>{
    }, [update]);

    function refreshLists(){
        setUpdate(!update);
    }
    // ------------------------------------------ 


    return (
        <div className="listContainer fullScreenHeight">
            
            <ListHeader></ListHeader>

            <MainList updateTaskDone={props.updateTaskDone} onItemDeleted={props.onItemDeleted} items={props.items} setItems={props.setItems} refreshLists={refreshLists}></MainList>

            <HabitList updateTaskDone={props.updateTaskDone} onItemDeleted={props.onItemDeleted} items={props.items} refreshLists={refreshLists}></HabitList>
        </div>
    )
}

export default ListsContainer;
