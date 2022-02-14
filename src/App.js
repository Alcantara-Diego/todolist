import React, { useEffect, useState } from "react"
import Sidebar from "./Components/Sidebar"
import ListsContainer from "./Components/ListsContainer"
import TodoForm from "./Components/TodoForm"
import About from "./Components/About"
import Settings from "./Components/Settings"
import Item from "./Components/Item"
import words from "./Components/Language"
import "./Todo.css"


const SAVED_ITEMS="savedItems";
function App(){

    // ---------- DATES ---------- //
    function getDate(){
        const d = new Date();
        const date = {
            day: d.getDate(),
            month: d.getMonth() + 1,
            year: d.getFullYear()
        }
        return date;
    }

    function compareDates(lastLogin, today){
        console.log(lastLogin);
        console.log(today);
        
        if(today.day === lastLogin.day && today.month === lastLogin.month && today.year === lastLogin.year) {
            return true

        } else return false
    }

    function isItTheFirstLoginToday(){
        let todayDate = getDate();

        const savedLastLogin = "TODOLIST_lastLogin";

        let checkingUserLastLogin = JSON.parse(localStorage.getItem(savedLastLogin));
        

        if(checkingUserLastLogin) {

            const datesAreTheSame = compareDates(checkingUserLastLogin, todayDate);

            // Update the last login for todays date
            localStorage.setItem(savedLastLogin, JSON.stringify(todayDate));

            if(datesAreTheSame){

                return false
            }else{

                return true
            }
            
        } else{
            
            localStorage.setItem(savedLastLogin, JSON.stringify(todayDate));
        }
    }
    // ---------- CLOSING DATES ---------- //









    // ---------- LANGUAGE ---------- //
    useEffect(()=>{
        let language = localStorage.getItem("TODOLIST_language");

        switch (language) {
            case "english":
                loadLanguage("english");
                break;
        
            default:
                loadLanguage("portuguease");
                break;
        }

    },[]);

    function loadLanguage(language){
        // "words" contains the texts in both languages
        let wordsLength = words.length;

        switch (language) {
            case "english":

                for (let i = 0; i < wordsLength; i++){

                    let word = document.querySelector(words[i].id);
                    word.innerHTML=words[i].english;
                }

                break;
        
            default:

                for (let i = 0; i < wordsLength; i++){
                    
                    let word = document.querySelector(words[i].id);
                    word.innerHTML=words[i].portuguease;
                }
                
                break;
        }
    }

    // ------- CLOSING LANGUAGE -------- //











    // ---------- TASK FUNCTIONS ---------- //
    const [items, setItems] = useState([]);

    // When opening the app, if there is any task saved on the localStorage, add it to the lists.
    useEffect(()=>{
        let savedItems = JSON.parse(localStorage.getItem(SAVED_ITEMS));

        if(savedItems){

            // The items from localStorage are changed only if its the first login of the day
            const updatedItems = resetTaskValues(savedItems);

            setItems(updatedItems);


            if(updatedItems.length === 0){

                changeEmptyListMsgDisplay("block");
            }
        }

    },[]);

    // Delete regular done tasks, and set all habits as undone if it is the first login in the day.
    function resetTaskValues(savedItems){

        if( isItTheFirstLoginToday() ){

            let filteredItems = savedItems.filter(item => item.done === false || item.habit);

            filteredItems.map(item => item.done = false);

            return filteredItems;

        } else {

            return savedItems
        }
        

    }


    // Every time the array with the items update...
    useEffect(()=>{
        // Save it to the localStorage
        localStorage.setItem(SAVED_ITEMS, JSON.stringify(items));
        console.log("LIST CHANGED")

        updateTaskPanelValues();
    }, [items]);


    // Adding new task
    function onAddItem(text, habit, priority) {
        let date = getDate()

        let it = new Item(text, habit, priority, date.day, date.month, date.year);

        setItems([it, ...items]);
        
        console.log(`${date.day}/${date.month}/${date.year}`)

        changeEmptyListMsgDisplay("none");

    }
    // Deleting a task
    function onItemDeleted(item) {
        
        let filteredItems = items.filter(it => it.id !== item.id)

        setItems(filteredItems);

        if(filteredItems.length === 0){
            changeEmptyListMsgDisplay("block");
        }
    }

    // Update the done value of a task, and save it to the local storage
    function updateTaskDone(item, value){
        item.done=value;
        localStorage.setItem(SAVED_ITEMS, JSON.stringify(items));

        updateTaskPanelValues();
    }

    // Update the numbers in the task panel
    function updateTaskPanelValues(){
        let isPanelVisible = document.getElementsByClassName("listPanel")[0];

        if(isPanelVisible){
            // task Number
            let filteringNormalTasks = items.filter(it=> it.habit === false);
            let taskNumber = filteringNormalTasks.length;
            document.getElementsByClassName("panelItemNumber")[0].innerHTML=taskNumber;

            // done number
            let doneItems = items.filter(it=>it.done);
            let completedTasksNumber = doneItems.length;
            document.getElementsByClassName("panelItemNumber")[1].innerHTML=completedTasksNumber;

            // habits number
            let habits = items.filter(it=>it.habit);
            let habitTasksNumber = habits.length;
            document.getElementsByClassName("panelItemNumber")[2].innerHTML=habitTasksNumber;
        }


    }

    // Show the message when the list is empty, and hide it if there is at least one task created
    function changeEmptyListMsgDisplay(selected){
        document.getElementsByClassName("emptyListMsg")[0].style.display=selected;
    }
     // ------- CLOSING TASK FUNCTIONS -------- //















    // ---------- FUNCTIONS CONTROLING THE ELEMENTS APPEARENCE ---------- //
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
    // ---------- CLOSING FUNCTIONS CONTROLING THE ELEMENTS APPEARENCE ---------- //












    // ---------- STYLE FUNCTIONS ---------- //
    useEffect(()=>{
        // Check if darkMode was active in the last time the app was open 
        const darkMode = localStorage.getItem("darkMode");

        if(darkMode === "true"){
            darkModeActive();
            document.getElementById("darkModeCheckbox").checked=true;

            localStorage.setItem("autoTheme", false);

        }else { //If darkMode is not active, check if the autoTheme is
            const autoTheme = localStorage.getItem("autoTheme");

            if(autoTheme === "true"){
                checkAutoTheme();
                document.getElementById("autoThemeCheckbox").checked = true
            }
        }

    }, []);

    function cssRootInfo(requested){

        // Arrays keeps the variable names, and the selected colors to the colorTheme transition.
        switch(requested){
            case "rootItems":
                return (["--primaryLinearGradient", "--primaryColor", "--background1",
                "--background2", "--color1", "--color2", "--borderCard", "--importantTaskBackground",
                "--importantTaskCompletedBackground", "--sidebarSelectedBtn"]);
            
            case "darkThemeColors":
                return (["linear-gradient(to top, #1e1e1e, #1e1e1e)", "#673ab7", "#1e1e1e","#2e2e2e","#ffffff",
                "#cccccc","#333333","#f14141be", "#30a751de", "#673ab7"]);
            
            case "lightThemeColors":
                return (["linear-gradient(to bottom, #ff5252, #bd4040)", "#ff5252", "#ffffff", "#ffffff", "black", "black", "##f7f5f5", "#ffd4e5", "#d5ffe5", "#00000015"]);

            default:
                console.log("cssRootInfo is not returning anything");
        }

    }

    //autoTheme makes the darkMode be enabled during a certain period of time
    function checkAutoTheme(){
        const date = new Date();
        const hour = date.getHours();

        
        if(hour <= 6 || hour >= 22){
            darkModeActive();
        }
    }

    function darkModeActive(){

        const rootItems = cssRootInfo("rootItems");

        const darkThemeColors = cssRootInfo("darkThemeColors");

        for(let i=0; i <= rootItems.length; i++){
            document.documentElement.style.setProperty(rootItems[i], darkThemeColors[i]);
        }

        document.getElementsByClassName("listHeaderH1")[0].style.color="#adadad";
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

            <div className="alert alert-primary" role="alert">
            <i className="bi bi-info-circle-fill"></i> Tip: Reloading the page will make the translations work better 
            </div>
            {/* ------------------------ */}

            <Sidebar toggleSidebar={toggleSidebar
            } hideInputField={hideInputField}></Sidebar>

            <ListsContainer updateTaskDone={updateTaskDone} onItemDeleted={onItemDeleted} items={items} setItems={setItems}></ListsContainer>

            <TodoForm onAddItem={onAddItem} hideInputField={hideInputField}></TodoForm>
            <About></About>
            <Settings cssRootInfo={cssRootInfo} checkAutoTheme={checkAutoTheme} loadLanguage={loadLanguage}></Settings>

        </div>
    )
}




export default App;