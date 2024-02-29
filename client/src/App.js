import React from 'react';

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';

import { BrowserRouter as Router, Route } from "react-router-dom";

//no need to creaate the routes here cause already done in index.js 
const App = () => {
  return (
    <h1>Something</h1>
    // <Router>
    //   <Route path="/" exact component={Join} />
    //   <Route path="/chat" component={Chat} />
    // </Router>
  );
}

export default App;

const getCurr = async (from, to) => {
  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
  
  const rate = response.data.rates;
  const one = 1/rate[from];
  const nechangeRate = one * rate[to];

  return exchangeRate;

}