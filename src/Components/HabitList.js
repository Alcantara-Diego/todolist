import React from "react";
import ListItem from "./ListItem";

function HabitList(props){
    let habits = props.items.filter(it=> it.habit);

    return(
        <div className="habitsList flex-column">
            <h1 className="habitListTitle todoTitle mx-3 mt-2 mb-0 ">Habits</h1>

            <ul className="list flex-column align-items-start w-100  pt-1 px-3 mt-0">
        
                {habits.map( item=> <ListItem key={item.id} items={props.items} item={item} updateTaskDone={props.updateTaskDone}  onItemDeleted={props.onItemDeleted} setItems={props.setItems} refreshLists={props.refreshLists}></ListItem>)}
    
            </ul>
        </div>
    )
}

export default HabitList;