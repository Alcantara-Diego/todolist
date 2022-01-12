import React from 'react'

import { Route, Routes } from "react-router-dom"

import App from './App'

function RouterControl(){

    return (
        
        <Routes>
           <Route path="/" element={<App />}></Route>
        </Routes>
    )
}

export default RouterControl;