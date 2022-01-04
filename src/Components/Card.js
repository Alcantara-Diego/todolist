import React from "react";


function Card(props){
    
    
    return <li onClick={props.taskClick} data-id={props.item.id}  className={props.className}>
        {props.children}
    </li>
};

export default Card;