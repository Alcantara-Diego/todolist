import React from 'react';

function SidebarOptions(props){

    function hideSettings(){
        let settings = document.getElementsByClassName("settings")[0];
        settings.classList.remove("showSecondaryDiv");
    }

    function showSection(section){

        props.toggleSidebar();

        switch(section){

            case "list":
                document.getElementsByClassName("importantList")[0].style.display="none";
                document.getElementsByClassName("mainList")[0].style.display="flex";
        
                hideSettings()
                props.hideInputField();
                break;
            
            case "importantList":
                document.getElementsByClassName("importantList")[0].style.display="flex";
                document.getElementsByClassName("mainList")[0].style.display="none";

                hideSettings();
                props.hideInputField();
                break;

            case "settings":
                let settings = document.getElementsByClassName("settings")[0];
                settings.classList.add("showSecondaryDiv");
        
                props.hideInputField();
                break;

            case "newItemField":
                let inputField = document.getElementsByClassName("newItemField")[0];
                inputField.classList.add("showSecondaryDiv");
        
                // Focus on the input value after some time to avoid animation bugs 
                setTimeout(()=>{document.getElementById("inputValue").focus();}, 800);

                hideSettings();
                break;

            default:
                document.getElementsByClassName("importantList")[0].style.display="none";
                document.getElementsByClassName("mainList")[0].style.display="flex";
        
                hideSettings();
                props.hideInputField();

        }
    }




    return(

        <div className="sidebar-optionsDiv px-2">

                <input type="radio" name="sidebarOptions" id="newTasksOption"></input>
                <label htmlFor="newTasksOption" onClick={()=>{showSection("newItemField")}}><i className="bi bi-plus"></i> Create new task
                </label>
                <hr></hr>


                <input type="radio" name="sidebarOptions" id="todayOption" defaultChecked></input>
                <label htmlFor="todayOption" onClick={()=>{showSection("list")}}>
                    <i className="bi bi-calendar2"></i> Today
                </label>

                <input type="radio" name="sidebarOptions" id="importantOption"></input>
                <label htmlFor="importantOption" onClick={()=>{showSection("importantList")}}>
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
                <label htmlFor="settingsOption" onClick={()=>{showSection("settings")}}>
                    <i className="bi bi-gear"></i> Settings
                </label>


            </div>

    )
}

export default SidebarOptions;