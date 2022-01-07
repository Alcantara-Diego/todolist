import React from "react";
import ListItem from "./ListItem";

function ImportantList(props){
    let importantItems = props.items.filter(it=> it.important);

    return(
        <div className="importantList flex-column">
            <h1 className="todoTitle mx-3 mt-2 mb-0 ">Important</h1>

            <ul className="list flex-column align-items-start w-100  pt-1 px-3 mt-0">
        
                {importantItems.map( item=> <ListItem key={item.id} items={props.items} item={item} updateTaskDone={props.updateTaskDone}  onItemDeleted={props.onItemDeleted} setItems={props.setItems} refreshLists={props.refreshLists}></ListItem>)}
    
            </ul>
        </div>
    )
}

export default ImportantList;