import React, { useEffect, useState } from "react";
import ListHeader from "./ListHeader";
import MainList from "./MainLIst";
import ImportantList from "./ImportantList";


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

            <MainList updateTaskDone={props.updateTaskDone} onItemDeleted={props.onItemDeleted} items={props.items} refreshLists={refreshLists}></MainList>

            <ImportantList updateTaskDone={props.updateTaskDone} onItemDeleted={props.onItemDeleted} items={props.items} refreshLists={refreshLists}></ImportantList>
        </div>
    )
}

export default ListsContainer;
