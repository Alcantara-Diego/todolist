import React, { useState } from "react";

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
            

            props.onAddItem(text, habitCheckbox);
            setText("");

            props.hideInputField();
            document.getElementById("importantCheckbox").checked=false;

            
            alertAnimation("success");
        }else{
            alertAnimation("danger");
        }

    };

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