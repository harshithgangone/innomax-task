import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import ContactForm from './pages/ApplicationForm/ApplicationForm'
import RegisterForm from './pages/RegisterForm/RegisterForm'
import Blog from './pages/Blog/Blog'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
   <>
   <ToastContainer/>
   <Routes>
    <Route path='/' element={<LandingPage/>} />
    <Route path='/application' element={<ContactForm/>}/>
    <Route path='/register' element={<RegisterForm/>}/>
    <Route path='/blog' element={<Blog/>}/>
   </Routes>
   </>
  )
}

export default App
