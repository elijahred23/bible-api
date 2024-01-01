import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import BiblesData from './components/BiblesData.jsx'; 
import Bibles from './components/bibles.jsx';
function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <h1>Bible API</h1>
          <div>
            <NavLink to="/bibles">Bibles</NavLink>
          </div>
          <Routes>
            <Route path="/biblesData" element={<BiblesData />}/>   
            <Route path="/bibles" element={<Bibles />}/>   
          </Routes> 
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
