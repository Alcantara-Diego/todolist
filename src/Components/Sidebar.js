import React from "react";
import SidebarOptions from "./SidebarOptions";

function Sidebar(props){



    return (
            <section className="sidebar fullScreenHeight">
                <button className="mobileBtn floatBtn" id="closeHamburguer" onClick={props.toggleSidebar}><i className="bi bi-x"></i></button>


                <header className="sidebarHeader px-3">
                    <h1>Todo List</h1>
                    <h6 className="sidebarMsg">What´s up today?</h6>
                </header>


                <SidebarOptions toggleSidebar={props.toggleSidebar} hideInputField={props.hideInputField}></SidebarOptions>

                
            </section>
    )
}


export default Sidebar;