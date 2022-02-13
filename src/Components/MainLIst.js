import React from "react";
import ListItem from "./ListItem";
import logo from '../assets/svg1.svg';


function MainList(props){
    

    function sortList(order){
        let newOrder;
        let remainingItems;
        switch (order) {
            case "simpleTasksFirst":

                newOrder = props.items.filter(it=> it.habit === false);
                remainingItems = props.items.filter(it=> it.habit === true);

                for(let i=0; i < remainingItems.length; i++){
                    newOrder = [...newOrder, remainingItems[i]];
                }
                break;
            
            case "habitsFirst":

                newOrder = props.items.filter(it=> it.habit === true);
                remainingItems = props.items.filter(it=> it.habit === false);

                for(let i=0; i < remainingItems.length; i++){
                    newOrder = [...newOrder, remainingItems[i]];
                }
                break;

            case "alphabetically":

                newOrder = props.items.sort(function(a, b) {

                    if(a.text.toLowerCase() < b.text.toLowerCase()) return -1;
                    if(a.text.toLowerCase() > b.text.toLowerCase()) return 1;
                    return 0;
                });
                break;

            case "priority":

                // Filter the high priority items first
                newOrder = props.items.filter(it=> it.priority === "high");

                // Then the moderate items
                let moderateItems = props.items.filter(it=> it.priority === "moderate");

                for(let i=0; i < moderateItems.length; i++){
                    newOrder = [...newOrder, moderateItems[i]];
                }

                // And finally the low ones
                remainingItems = props.items.filter(it=> it.priority === "low");

                for(let i=0; i < remainingItems.length; i++){
                    newOrder = [...newOrder, remainingItems[i]];
                }
                break;

            default:
                newOrder = props.items;
        }

        props.setItems(newOrder);
        props.refreshLists();
    }




    return(
        <main className="mainList flex-column">
            <div className="d-flex flex-row align-items-end justify-content-between">
                <h1 className="todoTitle mx-3 mt-2 mb-0 ">Todo</h1>
                <div className="dropdown mx-3">
                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                        Filter <i className="bi bi-funnel-fill"></i>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                        <li>
                            <h6 className="dropdown-header filterHeader">Sort By</h6>
                        </li>
                        <li>
                            <hr className="dropdown-divider"></hr>
                        </li>
                        <li>
                            <button onClick={()=> sortList("simpleTasksFirst")} className="dropdown-item simpleTasksFilter">Simple tasks first</button>
                        </li>
                        <li>
                            <button onClick={()=> sortList("habitsFirst")}  className="dropdown-item habitsFilter">Habits first</button>
                        </li>
                        <li>
                            <button onClick={()=> sortList("alphabetically")}  className="dropdown-item alphabeticallyFilter">Alphabetically</button>
                        </li>
                        <li>
                            <button onClick={()=> sortList("priority")}  className="dropdown-item priorityFilter">Priority</button>
                        </li>
                    </ul>
                </div>
            </div>
    
            
    
            <aside className="emptyListMsg">
                <img src={logo} alt=""></img>
                <p className="emptyListMsgPTag">You have no tasks yet :( <br></br> Create a new one to remember your goals! </p>
            </aside>
    
            <ul className="list flex-column align-items-start w-100  pt-1 px-3 mt-0">
                {props.items.map( item=> <ListItem key={item.id} item={item} updateTaskDone={props.updateTaskDone}  onItemDeleted={props.onItemDeleted} refreshLists={props.refreshLists}></ListItem>)}
            
            </ul>
        </main>
        )




    
}

export default MainList;