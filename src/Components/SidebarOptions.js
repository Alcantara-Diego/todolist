import React from 'react';

function SidebarOptions(props){


    function showInputField(){
        let inputField = document.getElementsByClassName("newItemField")[0];
        inputField.classList.add("showNewItemField");

        props.toggleSidebar();

        // Focus on the input value after some time to avoid animation bugs 
        setTimeout(()=>{document.getElementById("inputValue").focus();}, 800);
    }

    function showList(){
        document.getElementsByClassName("importantList")[0].style.display="none";
        document.getElementsByClassName("mainList")[0].style.display="flex";

        props.hideInputField();
        props.toggleSidebar();
    }

    function showImportantList(){
        document.getElementsByClassName("importantList")[0].style.display="flex";
        document.getElementsByClassName("mainList")[0].style.display="none";

        props.hideInputField();
        props.toggleSidebar()
    }




    return(

        <div className="sidebar-optionsDiv px-2">

                <input type="radio" name="sidebarOptions" id="newTasksOption"></input>
                <label htmlFor="newTasksOption" onClick={showInputField}><i className="bi bi-plus"></i> Create new task
                </label>
                <hr></hr>


                <input type="radio" name="sidebarOptions" id="todayOption" defaultChecked></input>
                <label htmlFor="todayOption" onClick={showList}>
                    <i className="bi bi-calendar2"></i> Today
                </label>

                <input type="radio" name="sidebarOptions" id="importantOption"></input>
                <label htmlFor="importantOption" onClick={showImportantList}>
                    <i className="bi bi-star"></i> Important
                </label>

                <input type="radio" name="sidebarOptions" id="archivedOption"></input>
                <label htmlFor="archivedOption">
                    <i className="bi bi-archive"></i> Archived
                </label>

                <hr></hr>
                <input type="radio" name="sidebarOptions" id="aboutOption"></input>
                <label htmlFor="aboutOption">
                    <i className="bi bi-info-circle"></i> About
                </label>
                <input type="radio" name="sidebarOptions" id="settingsOption"></input>
                <label htmlFor="settingsOption">
                    <i className="bi bi-gear"></i> Settings
                </label>


            </div>

    )
}

export default SidebarOptions;