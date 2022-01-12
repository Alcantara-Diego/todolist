import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouterControl from './RouterControl';
import reportWebVitals from './reportWebVitals';

import { HashRouter as Router} from "react-router-dom"

ReactDOM.render(
      <React.StrictMode>
        <Router>
          <RouterControl />
        </Router>
      </React.StrictMode>
    ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
