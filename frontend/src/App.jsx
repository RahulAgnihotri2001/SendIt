import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import {Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SettingPage from './pages/SettingPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import {Loader} from "lucide-react" 
function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(()=>{
    checkAuth();
  },[checkAuth]);
  console.log({authUser});
  if(isCheckingAuth && !authUser){
    return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin mx-auto"/>
    </div>
    );
  }


  return (
    <div>
      <Navbar/>
      <Routes>
          <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/setting" element={<SettingPage/>}/>
          <Route path="/Profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/> 
      </Routes>
    </div>
  )
}

export default App