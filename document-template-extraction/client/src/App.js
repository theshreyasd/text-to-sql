import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Example components for pages
import Home from './components/Home';
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
function App() {
  return (
    <Router>
      
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signin" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
        </Routes>
    </Router>
  );
}
 
export default App;
