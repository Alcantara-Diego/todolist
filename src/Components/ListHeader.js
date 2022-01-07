import React from "react";

function ListHeader(){

    return(
        <header className="listHeader d-flex justify-content-center w-100 p-4">
            <h1 className="listHeaderH1">Your tasks</h1>

            <div className="listPanel d-flex flex-row align-items-center justify-content-around">
                <section className="panelItem">
                    <div className="panelItemNumber">0</div> tasks
                </section>

                <section className="panelItem">
                    <div className="panelItemNumber">0</div> done
                </section>

                <section className="panelItem">
                    <div className="panelItemNumber">0</div> important
                </section>
            </div>
        </header>
    )
}

export default ListHeader;