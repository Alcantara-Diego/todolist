import React from 'react';
import Sidebar from './Sidebar';

function SidebarOptions(props){
    return(

        <div className="sidebar-optionsDiv mt-4 px-2">

                <input type="radio" name="sidebarOptions" id="newTasksOption"></input>
                <label htmlFor="newTasksOption"><i className="bi bi-plus"></i> Create new task</label>
                <hr></hr>

                <input type="radio" name="sidebarOptions" id="allTasksOption"></input>
                <label htmlFor="allTasksOption"  checked><i className="bi bi-check-all"></i> All tasks</label>

                <input type="radio" name="sidebarOptions" id="todayOption"></input>
                <label htmlFor="todayOption">
                    <i className="bi bi-calendar2"></i> Today
                </label>

                <input type="radio" name="sidebarOptions" id="importantOption"></input>
                <label htmlFor="importantOption">
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