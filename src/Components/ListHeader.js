import React from "react";

function ListHeader(){

    return(
        <header className="listHeader d-flex justify-content-center w-100 p-4">
            <h1 className="listHeaderH1">Your tasks</h1>

            <div className="listPanel d-flex flex-row align-items-center justify-content-around">
                <section className="panelItem">
                    <div className="panelItemNumber">0</div> <div id="panelItemTasks">tasks</div>
                </section>

                <section className="panelItem">
                    <div className="panelItemNumber">0</div> <div id="panelItemDone">done</div>
                </section>

                <section className="panelItem">
                    <div className="panelItemNumber">0</div> <div id="panelItemHabits">habits</div>
                </section>
            </div>
        </header>
    )
}

export default ListHeader;