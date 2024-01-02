import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import BiblesData from './components/Data/BiblesData.jsx';
import Bibles from './components/bibles.jsx';
import Bible from './components/Bible.jsx';
import { BibleProvider } from './components/BibleProvider.jsx';
import BooksData from './components/Data/BooksData.jsx';
import ChapterData from './components/Data/ChapterData.jsx';
import ChaptersData from './components/Data/ChaptersData.jsx';
function App() {

  return (
    <>
      <div>
        <BibleProvider>
          <BrowserRouter>
            <h1>Bible API</h1>
            <div>
              <div>
                <NavLink to="/bibles">Bibles</NavLink>
              </div>
              <div>
                <NavLink to="/bible">Bible</NavLink>
              </div>
            </div>
            <Routes>
              <Route path="/biblesData" element={<BiblesData />} />
              <Route path="/bibles" element={<Bibles />} />
              <Route path="/bible" element={<Bible />} />
              <Route path="/booksData" element={<BooksData />} />
              <Route path="/chapterData" element={<ChapterData />} />
              <Route path="/chaptersData" element={<ChaptersData />} />
            </Routes>
          </BrowserRouter>
        </BibleProvider>
      </div>
    </>
  )
}

export default App
