import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom"; 


import Home from './pages/Home.js'
import NewsPages from './pages/NewsPages.js'
import Men from './pages/Men.js'
import Women from './pages/Women.js'
import Contact from './pages/Contact.js'
import ProductDetail from './pages/ProductDetail.js'



function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/ProductDetail" exact component={ProductDetail}></Route>
        <Route path="/" exact component={Home}></Route>
        <Route path="/news" exact component={NewsPages}></Route>
        <Route path="/men" exact component={Men}></Route>
        <Route path="/women" exact component={Women}></Route>
        <Route path="/contact" exact component={Contact}></Route>
      </div>
    </Router>
  );
}

export default App;
