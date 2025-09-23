import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import EditorPage from './pages/EditorPage';
import './App.css';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
   <>
   <Toaster
  position="top-right"
  toastOptions={{
    success: {
      style: {
        background: '#1e1e2f',
        color: '#fff',
      },
      iconTheme: {
        primary: '#4aed88',
        secondary: '#fff',
      },
    },
  }}
/>

   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/editor/:roomId" element={<EditorPage/>} />
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
