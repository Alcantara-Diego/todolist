import React from "react";

function Settings(props){

    function closeSettings(){
        let settings = document.getElementsByClassName("settings")[0];
        settings.classList.remove("showSecondaryDiv");

        document.getElementById("todayOption").checked=true;
    }

    function darkMode(){
        let isDarkModeEnabled = document.getElementById("darkModeCheckbox").checked;

        const rootItems = props.cssRootInfo("rootItems");
        const darkThemeColors = props.cssRootInfo("darkThemeColors");
        const lightThemeColors = props.cssRootInfo("lightThemeColors");

        if(isDarkModeEnabled){

            localStorage.setItem("darkMode", true);


            for(let i=0; i <= rootItems.length; i++){
                document.documentElement.style.setProperty(rootItems[i], darkThemeColors[i]);
            }

            document.getElementsByClassName("listHeaderH1")[0].style.color="white";


        } else {
            localStorage.setItem("darkMode", false);

            for(let i=0; i <= rootItems.length; i++){
                document.documentElement.style.setProperty(rootItems[i], lightThemeColors[i]);
            }

        }
    }

    return(
        <div className="settings secondaryDiv">

            <button className="mobileBtn floatBtn" id="closeSettingsBtn" onClick={closeSettings}><i className="bi bi-x"></i></button>

            <h1>Settings</h1>
            <section className="position-relative d-flex flex-row mt-4">
                    <h3 className="inputDescription mb-0">DarkMode <i className="bi bi-moon-stars-fill"></i></h3>
                    <label>
                        <input type="checkbox" id="darkModeCheckbox" className="customCheckbox" onClick={darkMode}></input>
                    </label>
            </section>
        </div>
    )
};

export default Settings;