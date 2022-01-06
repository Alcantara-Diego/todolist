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
            props.onAddItem(text);
            setText("");

            props.hideInputField();
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
        <div className="newItemField fullScreenHeight">

            <button className="mobileBtn floatBtn" id="closeNewItemField" onClick={props.hideInputField}><i className="bi bi-x"></i></button>


            <h1>New task</h1>
            <form className=" d-flex flex-column justify-content-start">
                
                {/* name */}
                <h3 className="inputDescription px-1">Name <i className="bi bi-pencil-fill"></i></h3>
                <input className="px-2"
                id="inputValue"
                type="text" onChange={handleChange} value={text} placeholder="name"></input>

                {/* important */}
                <section className="position-relative d-flex flex-row mt-4">
                    <h3 className="inputDescription">Important <i className="bi bi-star-fill"></i> :</h3>
                    <label>
                        <input type="checkbox"></input>
                    </label>
                </section>


                {/* add */}
                <button className="" onClick={addItem}>Add</button>
            </form>
        </div>
    )
}

export default TodoForm;