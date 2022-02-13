import React from "react";
import Card from "./Card";


function ListItem(props){
            
            
    function getCardElement(e) {
        const itemClass = e.target.className;
        const biTrash = itemClass.search("bi-trash");
        const trashBtn = itemClass.search("trashBtn");


        let isCheckboxClicked = false;
        // If the user clicks in the checkbox, it´s value will not change
        if(e.target.tagName === "INPUT"){
            isCheckboxClicked = true;
        }
        
        // If there is no className related to the trash button, the task state(done or not) is changed
        if(trashBtn && biTrash === -1){
            let element = e.target;
            let attr = element.getAttribute("data-id")
            console.log(attr)



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
            card.classList.add("taskDone");
            checkbox.checked =true;
        }else {
            checkbox.checked=false;
            card.classList.remove("taskDone");
        }

        props.refreshLists();
       
    }




    if(props.item.done){

        // Return an checked task
        return (
            <Card taskClick={getCardElement} className={props.item.habit? "card importantTask taskDone" : "card taskDone"} item={props.item}>
                <div id="taskContent" data-done={props.item.done} className="d-flex flex-row align-items-end w-75">
                    
                    <label>
                        <input type="checkbox" defaultChecked></input>
                    </label>

                    <div className="taskInfoContainer d-flex flex-column">
                        <p className="taskTitle text-capitalize mb-0">{props.item.habit? <i className="bi bi-star-fill"></i> : ""} {props.item.text}</p>
                        <p className="priorityText">Priority: {props.item.priority}</p>
                    </div>

                </div>

                <button className="trashBtn border-0 p-1" onClick={()=>{props.onItemDeleted(props.item)}}>
                    <i className="bi bi-trash"></i>       
                </button>
            </Card>

        )
    }else{

        // Return a normal task
        return (
            <Card taskClick={getCardElement} className={props.item.habit? "card importantTask": "card"}  item={props.item}>
                <div id="taskContent" data-done={props.item.done} className="d-flex flex-row align-items-end w-75">
                    
                    <label>
                        <input type="checkbox"></input>
                    </label>

                    <div className="taskInfoContainer d-flex flex-column">
                        <p className="taskTitle text-capitalize mb-0">{props.item.habit? <i className="bi bi-star-fill"></i> : ""} {props.item.text}</p>
                        <p className="priorityText">Priority: {props.item.priority}</p>
                    </div>

                </div>

                <button className="trashBtn border-0 p-1" onClick={()=>{props.onItemDeleted(props.item)}}>
                    <i className="bi bi-trash"></i>       
                </button>
            </Card>
        )
    }



    
};

export default ListItem;