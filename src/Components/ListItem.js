import React from "react";

import Card from "./Card";


function ListItem(props){
            
            
    function getCardElement(e) {
        const itemClass = e.target.className;
        const biTrash = itemClass.search("bi-trash");
        const trashBtn = itemClass.search("trashBtn")
        
        // If there is no className related to the trash button, the task checkbox is changed
        if(trashBtn && biTrash === -1){
            let element = e.target;
            let attr = element.getAttribute("data-id")
            console.log(attr)

            let isCheckboxClicked = false;

            if(attr == null){
                element = element.parentNode;
                attr = element.getAttribute("data-id");
                console.log("segunda tentativa")
                console.log(attr)

                if(attr == null){
                    element = element.parentNode;
                    attr = element.getAttribute("data-id");
                    console.log("terceira tentativa")
                    console.log(attr)
                    
                    if(attr == null){
                        element = element.parentNode;
                        attr = element.getAttribute("data-id");
                        console.log("quarta tentativa")
                        console.log(attr)

                        isCheckboxClicked =true;
                    }
                }
            }

            isTaskDone(element, isCheckboxClicked);

        }
    }

    function isTaskDone(card, checkboxClicked){

        let checkbox = card.childNodes[0].childNodes[0].childNodes[0];


        // Switch the checkbox value when clicking in any part of the card but the trash button.  
        if((checkbox.checked && checkboxClicked) || (!checkboxClicked && !checkbox.checked)){
            // set the checkbox as checked
            
            // Updating task visualy.
            taskDoneToggle(true, checkbox, card);

            // Updating the object and saving to localStorage.
            props.updateTaskDone(props.item, true);
        }else{
            // set the checkbox as not checked

             // Updating task visualy.
            taskDoneToggle(false, checkbox, card);

            // Updating the object and saving to localStorage.
            props.updateTaskDone(props.item, false);
        }
    }


    // Change the task visual based on if it's done or not.
    function taskDoneToggle(done, checkbox, card){
        if(done){
            card.className="card taskDone";
            checkbox.checked =true;
        }else {
            checkbox.checked=false;
            card.className="card";
        }
    }



    if(props.item.done){

        // Return the task as checked
        return (
            <Card taskClick={getCardElement} className="card taskDone" item={props.item}>
                <div id="taskContent" data-done={props.item.done} className="d-flex flex-row align-items-end w-75">
                    
                    <label>
                        <input type="checkbox" defaultChecked></input>
                    </label>

                    <p className="taskTitle text-capitalize fs-3 mb-0">{props.item.text}</p>

                </div>

                <button className="trashBtn border-0 p-1" onClick={()=>{props.onItemDeleted(props.item)}}>
                    <i className="bi bi-trash"></i>       
                </button>
            </Card>

        )
    }else{

        // Return the task as not checked
        return (
            <Card taskClick={getCardElement} className="card"  item={props.item}>
                <div id="taskContent" data-done={props.item.done} className="d-flex flex-row align-items-end w-75">
                    
                    <label>
                        <input type="checkbox"></input>
                    </label>

                    <p className="taskTitle text-capitalize mb-0">{props.item.text}</p>

                </div>

                <button className="trashBtn border-0 p-1" onClick={()=>{props.onItemDeleted(props.item)}}>
                    <i className="bi bi-trash"></i>       
                </button>
            </Card>
        )
    }



    
};

export default ListItem;