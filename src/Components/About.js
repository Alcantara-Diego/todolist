import React from "react";

function About(){

    function closeAbout(){
        let settings = document.getElementsByClassName("about")[0];
        settings.classList.remove("showSecondaryDiv");

        document.getElementById("todayOption").checked=true;
    }


    return(
        <div className="about secondaryDiv">

            <button className="mobileBtn floatBtn" id="closeAboutBtn" onClick={closeAbout}><i className="bi bi-x"></i></button>

            <h1 className="aboutTitle sectionTitle">About</h1>
            <section className="position-relative d-flex flex-column mt-4">
                    <h4 className="creatorInfo mb-0 mt-2">App created by Diego Alcântara:</h4>
                    <a href="https://github.com/Alcantara-Diego" target="_blank" rel="noreferrer" className="myGithubLink">Go to my github page <i className="bi bi-github"></i></a>
            </section>
        </div>
    )
}

export default About;