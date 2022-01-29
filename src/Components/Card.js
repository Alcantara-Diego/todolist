import React from "react";


function Card(props){
    
    
    return <li onClick={props.taskClick} data-id={props.item.id} data-day={props.item.day} data-month={props.item.month} data-year={props.item.year} className={props.className}>
        {props.children}
    </li>
};

export default Card;