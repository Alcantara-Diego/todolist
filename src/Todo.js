import React, { useEffect, useState } from "react";
import Sidebar from "./Components/Sidebar"
import ListsContainer from "./Components/ListsContainer";
import TodoForm from "./Components/TodoForm";
import Settings from "./Components/Settings";
import Item from "./Components/Item"
import "./Todo.css";

const SAVED_ITEMS="savedItems";

function Todo(){

    // ---------- TASK FUNCTIONS ---------- //
    const [items, setItems] = useState([]);

    // When opening the app, if there is any task saved on the localStorage, add it to the lists.
    useEffect(()=>{
        let savedItems = JSON.parse(localStorage.getItem(SAVED_ITEMS));
        if(savedItems){
            setItems(savedItems);
        }

    },[]);


    // Every time the array with the items update...
    useEffect(()=>{
        // Save it to the localStorage
        localStorage.setItem(SAVED_ITEMS, JSON.stringify(items));

        updateTaskPanelValues();
    }, [items]);


    // Adding new task
    function onAddItem(text, important) {

        let it = new Item(text, important);

        setItems([it, ...items]);

    }
    // Deleting a task
    function onItemDeleted(item) {
        
        let filteredItems = items.filter(it => it.id !== item.id)

        setItems(filteredItems);
    }

    function updateTaskDone(item, value){
        item.done=value;
        localStorage.setItem(SAVED_ITEMS, JSON.stringify(items));

        updateTaskPanelValues();
    }

    function updateTaskPanelValues(){
        let isPanelVisible = document.getElementsByClassName("listPanel")[0];

        if(isPanelVisible){
            // task Number
            let taskNumber = items.length;
            document.getElementsByClassName("panelItemNumber")[0].innerHTML=taskNumber;

            // done number
            let doneItems = items.filter(it=>it.done);
            let completedTasksNumber = doneItems.length;
            document.getElementsByClassName("panelItemNumber")[1].innerHTML=completedTasksNumber;

            // important number
            let importantItems = items.filter(it=>it.important);
            let importantTasksNumber = importantItems.length;
            document.getElementsByClassName("panelItemNumber")[2].innerHTML=importantTasksNumber;
        }


    }
     // ------- CLOSING TASK FUNCTIONS -------- //


     function toggleSidebar(){
        const sidebar = document.getElementsByClassName("sidebar")[0];
        sidebar.classList.toggle("showSidebar");


        const overlay = document.getElementsByClassName("overlay")[0]
        overlay.classList.toggle("overlayActive");
     }

     function hideInputField(){
        let inputField = document.getElementsByClassName("newItemField")[0];
        inputField.classList.remove("showSecondaryDiv");

        document.getElementById("todayOption").checked=true;

    }

    // show and animate the top-navbar present in mobile screens 
    useEffect(()=>{
        function mobileNavAnimation(e) {
            let mobileTopNavbar = document.getElementsByClassName("top-nav")[0];
            if(!e[0].isIntersecting){
                
                mobileTopNavbar.classList.add("top-nav-scrolled");

            }else{
                mobileTopNavbar.classList.remove("top-nav-scrolled");
            }
    
        }
    
        const ob = new IntersectionObserver(mobileNavAnimation)
    
        let listHeaderH1 = document.getElementsByClassName("listHeaderH1")[0];

        ob.observe(listHeaderH1);
    }, []);

    // ---------- STYLE FUNCTIONS ---------- //
    useEffect(()=>{
        // Check if darkMode was active in the last time the app was open 
        let darkMode = localStorage.getItem("darkMode");

        if(darkMode === "true"){
            darkModeActive();
        }

    }, []);

    function cssRootInfo(requested){

        // Arrays keeps the variable names, and the selected colors to the colorTheme transition.
        switch(requested){
            case "rootItems":
                return (["--primaryLinearGradient", "--primaryColor", "--background1",
                "--background2", "--color1", "--color2", "--borderCard", "--importantTaskBackground",
                "--importantTaskCompletedBackground"]);
            
            case "darkThemeColors":
                return (["linear-gradient(to bottom right, #1e1e1e, #3d3d3d)", "#673ab7", "#1e1e1e","#2e2e2e","#ffffff",
                "#cccccc","#333333","#ff4242be", "#39c660de"]);
            
            case "lightThemeColors":
                return (["linear-gradient(to bottom, #ff5252, #bd4040)", "#ff5252", "#ffffff", "#ffffff", "black", "black", "##f7f5f5", "#ffd4e5", "#d5ffe5"]);

            default:
                console.log("cssRootInfo is not returning anything");
        }

    }

    function darkModeActive(){

        const rootItems = cssRootInfo("rootItems");

        const darkThemeColors = cssRootInfo("darkThemeColors");

        for(let i=0; i <= rootItems.length; i++){
            document.documentElement.style.setProperty(rootItems[i], darkThemeColors[i]);
        }

        document.getElementById("darkModeCheckbox").checked=true;
    }
    // ---------- CLOSING STYLE FUNCTIONS ---------- //


    return (
        <div className="container px-0 pt-0">

            {/* -----Mobile elements----- */}
            <div className="overlay"></div>

            <nav className="mobileBtn top-nav floatBtn w-100">
                <button className="mobileBtn floatBtn" id="hamburguerBtn" onClick={toggleSidebar}><i className="bi bi-list"></i></button>
            </nav>
            {/* ------------------------ */}

            {/* --------alerts---------- */}
            <div className="alert alert-success" role="alert">
            <i className="bi bi-check-circle-fill"></i> New task added successfuly
            </div>

            <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle-fill"></i> Your task should have a name
            </div>
            {/* ------------------------ */}

            <Sidebar toggleSidebar={toggleSidebar
            } hideInputField={hideInputField}></Sidebar>

            <ListsContainer updateTaskDone={updateTaskDone} onItemDeleted={onItemDeleted} items={items} setItems={setItems}></ListsContainer>

            <TodoForm onAddItem={onAddItem} hideInputField={hideInputField}></TodoForm>
            <Settings cssRootInfo={cssRootInfo}></Settings>

        </div>
    )
}




export default Todo;