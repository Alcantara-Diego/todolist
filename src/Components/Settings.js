import React from "react";

function Settings(props){

    function closeSettings(){
        let settings = document.getElementsByClassName("settings")[0];
        settings.classList.remove("showSecondaryDiv");

        document.getElementById("todayOption").checked=true;
    }

    function changeDarkMode(status){

        const rootItems = props.cssRootInfo("rootItems");
        const darkThemeColors = props.cssRootInfo("darkThemeColors");
        const lightThemeColors = props.cssRootInfo("lightThemeColors");

        switch(status){
            case "enable":

                for(let i=0; i <= rootItems.length; i++){
                    document.documentElement.style.setProperty(rootItems[i], darkThemeColors[i]);
                }
    
                document.getElementsByClassName("listHeaderH1")[0].style.color="grey";
                break;

            case "disable":

                for(let i=0; i <= rootItems.length; i++){
                    document.documentElement.style.setProperty(rootItems[i], lightThemeColors[i]);
                }

                document.getElementsByClassName("listHeaderH1")[0].style.color="white";
                break;

            default:
                console.log("changeDarkMode not called properly")
        }
    }

    function checkDarkMode(){
        let isDarkModeEnabled = document.getElementById("darkModeCheckbox").checked;

        if(isDarkModeEnabled){
            changeDarkMode("enable");

            localStorage.setItem("darkMode", true);
        } else {
            changeDarkMode("disable");

            localStorage.setItem("darkMode", false);
        }
    }

    function autoTheme(){
        let isAutoThemeEnabled = document.getElementById("autoThemeCheckbox").checked;

        if(isAutoThemeEnabled){

                props.checkAutoTheme();
                localStorage.setItem("autoTheme", true);

        }else {
            checkDarkMode();
            localStorage.setItem("autoTheme", false);
        }
    }



    function changeLanguage(language){

        


        switch (language) {
            case "english":

                props.loadLanguage("english");

                localStorage.setItem("TODOLIST_language", "english");
                break;
        
            default:

                props.loadLanguage("portuguease");
                
                localStorage.setItem("TODOLIST_language", "portuguease");
                break;
        }
    }

    return(
        <div className="settings secondaryDiv">

            <button className="mobileBtn floatBtn" id="closeSettingsBtn" onClick={closeSettings}><i className="bi bi-x"></i></button>

            <h1 id="settingsTitle" className="sectionTitle">Settings</h1>


            {/*  Settings options*/}

            {/* Dark Mode */}
            <section className="position-relative d-flex flex-row mt-4">
                    <h3 id="darkModeDescription" className="inputDescription mb-0">DarkMode <i className="bi bi-moon-stars-fill"></i></h3>
                    <label className="position-relative mx-2">
                        <input type="checkbox" id="darkModeCheckbox" className="customCheckbox" onClick={checkDarkMode}></input>
                    </label>
            </section>


            {/* Automatic theme */}
            <div className="mt-4">
                <p id="autothemeQuickDescription" className="quick-description fw-bold mb-0">Automatic theme enable darkmode only between 10pm and 6am (the darkmode option has to be turned off to work)</p>
                <section className="position-relative d-flex flex-row">
                        <h3 id="automaticThemeTitle" className="inputDescription mb-0">Automatic theme <i className="bi bi-brush-fill"></i></h3>
                        <label className="position-relative mx-2">
                            <input type="checkbox" id="autoThemeCheckbox" className="customCheckbox" onClick={autoTheme}></input>
                        </label>
                </section>
            </div>


            {/* Language */}
            <div className="dropdown mt-4">
                <button className="languageOption btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Select language <i className="bi bi-translate"></i>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">

                    <li><button className="dropdown-item" onClick={() => changeLanguage("portuguease")}>Português</button></li>

                    <li><button className="dropdown-item" onClick={() => changeLanguage("english")}>English</button></li>

                </ul>
                </div>

            



        </div>
    )
};

export default Settings;