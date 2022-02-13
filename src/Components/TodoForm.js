import React, { useState } from "react";

let priority = "";
function TodoForm(props){
    const [text, setText] = useState("");


    function handleChange(){
        const inputValue = document.getElementById("inputValue");
        let t = inputValue.value;
        setText(t);
    }

    function addItem(event) {
        event.preventDefault();
        
        if(text) {
            let habitCheckbox = document.getElementById("importantCheckbox").checked;
            
            if(!priority) priority = "moderate";

            props.onAddItem(text, habitCheckbox, priority);
            setText("");

            
            resetForm();
            alertAnimation("success");
        }else{
            alertAnimation("danger");
        }

    };

    function resetForm(){

        props.hideInputField();
        document.getElementById("importantCheckbox").checked=false;

        document.getElementById("opcModerate").checked=true;
        const arrow = document.querySelector(".priorityArrow");
        arrow.classList.remove("highSelected");
        arrow.classList.remove("lowSelected");
        priority = "moderate";
    }

    function alertAnimation(alert){

        let alertSuccess = document.getElementsByClassName("alert-success")[0];
        let alertDanger = document.getElementsByClassName("alert-danger")[0];

        switch(alert){
            default:case "success":
                alertSuccess.style.animation="showAlert 4s";

                setTimeout(()=>{

                    alertSuccess.style.animation="none";
                }, 4100);

                break;
            
            case "danger":
                alertDanger.style.animation="showAlert 4s";

                setTimeout(()=>{

                    alertDanger.style.animation="none";
                }, 4100);

                break;
        }


    }

    function changePriority(opc){
        const arrow = document.querySelector(".priorityArrow");

        switch(opc){
            case "low":
                arrow.classList.remove("highSelected");
                arrow.classList.add("lowSelected");
                priority ="low";
                break;
            case "moderate":
                arrow.classList.remove("highSelected");
                arrow.classList.remove("lowSelected");
                priority = "moderate";
                break;
            case "high":
                arrow.classList.remove("lowSelected");
                arrow.classList.add("highSelected");
                priority = "high";
                break;
            default:
                console.log("error")
        }
        
    }



    return(
        <div className="newItemField secondaryDiv">

            <button className="mobileBtn floatBtn" id="closeNewItemField" onClick={props.hideInputField}><i className="bi bi-x"></i></button>


            <h1 className="newTaskFieldTitle sectionTitle">New task</h1>
            <form className=" d-flex flex-column justify-content-start">
                
                {/* name */}
                <h3 className="nameInputDescription inputDescription px-1">Name <i className="bi bi-pencil-fill"></i></h3>
                <input className="px-2"
                id="inputValue"
                type="text" onChange={handleChange} value={text}></input>

                {/* priority */}
                <div className="d-flex flex-row align-items-center mt-4">
                    <h3 className="priorityDescription inputDescription px-1">Priority:</h3>
                    <div className="priorityOptionsDiv d-flex flex-row align-items-center mx-1">
                        <input type="radio" name="priority" id="opcLow"></input>
                        <label htmlFor="opcLow" onClick={()=> changePriority("low")}>Low</label>
                        <input type="radio" name="priority" id="opcModerate" defaultChecked></input>
                        <label htmlFor="opcModerate" onClick={()=> changePriority("moderate")} >Moderate</label>
                        <input type="radio" name="priority" id="opcHigh"></input>
                        <label htmlFor="opcHigh" onClick={()=> changePriority("high")}>High</label>
                        <div className="priorityArrow"></div>
                    </div>
                </div>

                {/* habit */}
                <section className="position-relative d-flex flex-column mt-4">
                    <p className="habitsQuickDescription quick-description fw-bold mb-0">Habits repeats everyday, while normal tasks are automatically deleted in the next day after they get done.</p>
                    <div className="d-flex flex-row">
                        <h3 className="habitInputDescription inputDescription">Habit <i className="bi bi-star-fill"></i> :</h3>
                        <label className="position-relative mx-2">
                            <input type="checkbox" className="customCheckbox" id="importantCheckbox"></input>
                        </label>
                    </div>
                </section>


                {/* add */}
                <button className="addNewTaskBtn" onClick={addItem}>Add</button>
            </form>
        </div>
    )
}

export default TodoForm;