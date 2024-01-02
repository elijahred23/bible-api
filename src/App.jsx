import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import BiblesData from './components/BiblesData.jsx';
import Bibles from './components/bibles.jsx';
import { BibleProvider } from './components/BibleProvider.jsx';
function App() {

  return (
    <>
      <div>
        <BibleProvider>
          <BrowserRouter>
            <h1>Bible API</h1>
            <div>
              <NavLink to="/bibles">Bibles</NavLink>
            </div>
            <Routes>
              <Route path="/biblesData" element={<BiblesData />} />
              <Route path="/bibles" element={<Bibles />} />
            </Routes>
          </BrowserRouter>
        </BibleProvider>
      </div>
    </>
  )
}

export default App
