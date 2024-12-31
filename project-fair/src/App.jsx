
import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Dashboard from './pages/Dashboard'

import Auth from './components/Auth'
import { useContext } from 'react'
import { tokenAuthContext } from './contextApi/TokenAuth'


function App() {
      const{isAuthorised,setIsAuthorised}=useContext(tokenAuthContext)
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/projects' element={isAuthorised?<Projects/>:<Home/>}/>
      <Route path='/dashboard' element={isAuthorised?<Dashboard/>:<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register/>}/>
      <Route path='/*' element={<Navigate to={'/'}/>}/>
    </Routes>
     <Footer/>
    </>
  )
}

export default App
