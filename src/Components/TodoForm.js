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
            const inputValue = document.getElementById("inputValue");
            props.onAddItem(text);
            setText("");
            inputValue.focus();
        };
    }

    return(
        <form className=" d-flex flex-row justify-content-center mx-auto">
            <input className="formStyle w-75 px-2"
            id="inputValue" 
            type="text" onChange={handleChange} value={text} placeholder="new task"></input>

            <button className="formStyle w-25" onClick={addItem}>Add</button>
        </form>
    )
}

export default TodoForm;